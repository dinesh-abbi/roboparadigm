# RoboParadigm Deployment Guide

This application is built using **TanStack Start**, which is a Server-Side Rendered (SSR) full-stack framework. Unlike older single-page applications, it **does not** compile into a single static `index.html` folder that can be directly dropped into Apache. 

It requires a **Node.js** background process to serve the website. Apache will then be used as a "Reverse Proxy" to forward public web traffic to that Node process.

Follow these step-by-step instructions to host the project.

---

## Step 1: Prepare the Node.js Server

1. Extract the `roboparadigm-tiny.zip` file onto your server.
2. Open your terminal and navigate into the extracted folder.
3. Install only the production dependencies:
   ```bash
   npm install --production
   ```

## Step 2: Keep the App Running in the Background (PM2)

If you simply run `npm run start`, the server will stop as soon as you close your terminal. To keep it running permanently, you should use **PM2** (a Node process manager).

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```
   *(Note: If you get permission errors, use `sudo npm install -g pm2`. However, if you are using **NVM** (Node Version Manager), `sudo npm` will likely fail with "command not found". In that case, just run `npm install -g pm2` without sudo or use `npx pm2`).*

2. Start the application using PM2:
   ```bash
   pm2 start npm --name "roboparadigm" -- run start
   ```

3. Ensure PM2 restarts automatically if the server reboots:
   ```bash
   pm2 startup
   pm2 save
   ```

*The application is now running safely in the background on **Port 3000** (`http://localhost:3000`).*

---

## Step 3: Configure Apache Reverse Proxy

Currently, the app is running locally on port `3000`. You need to tell Apache to intercept traffic coming to `dev.kmitonline.in:81` and forward it to this local port.

1. Ensure Apache's proxy modules are enabled on the server:
   ```bash
   sudo a2enmod proxy
   sudo a2enmod proxy_http
   ```

2. Open the Apache configuration file for the site. This is usually located at `/etc/apache2/sites-available/your-site.conf` or similar.

3. Locate the VirtualHost block for port 81 (or create it) and add the `ProxyPass` and `ProxyPassReverse` directives:

   ```apache
   <VirtualHost *:81>
       ServerName dev.kmitonline.in

       # Forward all traffic to the Node.js server running on port 3000
       ProxyPass / http://127.0.0.1:3000/
       ProxyPassReverse / http://127.0.0.1:3000/

       # Optional: Preserve original host headers
       ProxyPreserveHost On
   </VirtualHost>
   ```

4. Check if your Apache configuration is valid:
   ```bash
   sudo apache2ctl configtest
   ```
   *(It should say `Syntax OK`)*

5. Restart Apache to apply the changes:
   ```bash
   sudo systemctl restart apache2
   ```

---

## Success! 🎉
The site is now live! Whenever a user visits `http://dev.kmitonline.in:81/`, Apache will invisibly route the request to the Node server on port 3000 and serve the website perfectly.
