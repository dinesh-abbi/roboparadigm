# Local Testing Guide (Apache Reverse Proxy)

This guide will walk you through setting up an Apache Reverse Proxy on your own machine so you can test exactly what your Team Leader will do!

## Step 1: Start the Built Node Server

First, make sure your production Node server is running on port 3000. 
*(If you already ran the `pm2 start` command from the other guide, it is already running! You can check by visiting `http://localhost:3000` in your browser).*

## Step 2: Create a Local Apache Config

Instead of editing a non-existent file, we will create a brand new configuration file just for this test.

1. Create a new Apache configuration file called `local-test.conf`:
   ```bash
   sudo nano /etc/apache2/sites-available/local-test.conf
   ```

2. Paste the following configuration into the file. *(This tells Apache to listen on port 8081 and forward the traffic to your Node server on port 3000).*
   ```apache
   Listen 8081

   <VirtualHost *:8081>
       ServerName localhost

       # Forward traffic to your running Node.js app
       ProxyPass / http://127.0.0.1:3000/
       ProxyPassReverse / http://127.0.0.1:3000/

       ProxyPreserveHost On
   </VirtualHost>
   ```

3. Save and exit nano (`Ctrl+O`, `Enter`, `Ctrl+X`).

## Step 3: Enable the Site and Restart Apache

Now we need to tell Apache to use this new configuration file.

1. Enable the site:
   ```bash
   sudo a2ensite local-test.conf
   ```

2. Restart Apache to apply the changes:
   ```bash
   sudo systemctl restart apache2
   ```

## Step 4: Test it out!

You have successfully simulated the production environment!

1. Open your browser and go to `http://localhost:8081`. 
2. You will see your app! But you are actually talking to **Apache**, which is silently fetching the data from your **Node server** on port 3000. 

Since you also have `ngrok http 8081` running in another terminal, anyone on the internet with your ngrok link is now hitting your local Apache server, which proxies to your Node server—exactly how it will work in production!
