import { createFileRoute } from "@tanstack/react-router";
import { Brain, Cog, Cpu, Layers, Zap } from "lucide-react";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";
import archStack from "@/assets/architecture-stack.jpg";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Robotics Architecture — The 5-Layer Intelligence Stack | RoboParadigm" },
      { name: "description", content: "RoboParadigm's 5-layer robotics architecture: AI decision, control, hardware interface, power, and physical structure — full-stack robotics engineering." },
      { property: "og:title", content: "The 5-Layer Robotics Intelligence Stack" },
      { property: "og:description", content: "From intelligence to movement — how a robot thinks, decides, connects, powers, and acts." },
      { property: "og:url", content: "/architecture" },
    ],
    links: [{ rel: "canonical", href: "/architecture" }],
  }),
  component: Architecture,
});

const layers = [
  {
    n: "01",
    icon: Brain,
    name: "AI / Decision Layer",
    short: "The intelligence layer that perceives, reasons, plans, and decides.",
    similar: "Brain / decision-making",
    branch: "Computer Science, AI",
    what: "Transforms sensor data, world state, and user goals into high-level decisions and action plans. Enables the robot to understand what is happening, decide what should be done, and send goals to the control layer.",
    functions: ["Perception", "Scene understanding", "Path planning", "Task planning", "Reasoning", "Decision-making", "Agentic AI / autonomy"],
    tech: ["Computer vision", "Machine learning / deep learning", "SLAM", "Behavior planning", "Task allocation", "Multi-agent systems"],
    inputs: "camera, LiDAR, IMU, task goals, world state",
    outputs: "goals, plans, and commands to the control layer",
    why: "Makes the robot adaptive, intelligent, and capable of operating in dynamic environments.",
  },
  {
    n: "02",
    icon: Cog,
    name: "Control Layer",
    short: "The coordination layer that converts intent into precise motion.",
    similar: "Brain-to-muscle coordination",
    branch: "CS + Electronics + Control Engineering",
    what: "Turns plans into stable, accurate, real-time motion through continuous feedback and control. Takes target positions and current state and produces motor or actuator control signals.",
    functions: ["Motion control", "PID control", "Trajectory generation", "State estimation", "Feedback logic", "ROS 2 control", "Synchronization"],
    tech: ["PID / MPC", "Kalman filtering", "Joint controllers", "Servo tuning", "Trajectory planners", "Robot control middleware"],
    inputs: "target position, sensor feedback, current state",
    outputs: "motor and actuator control signals",
    why: "Ensures the robot moves smoothly, safely, accurately, and repeatably.",
  },
  {
    n: "03",
    icon: Cpu,
    name: "Hardware Interface Layer",
    short: "The interface layer that connects software intelligence to physical hardware.",
    similar: "Nervous system",
    branch: "Electronics + Embedded Systems",
    what: "Bridges computation and machinery by interfacing with sensors, drivers, controllers, and feedback devices. Lets the digital brain communicate reliably with physical components.",
    functions: ["Microcontroller interfacing", "Motor driving", "Sensor acquisition", "Encoder reading", "Communication buses", "Servo control", "Real-time I/O"],
    tech: ["MCUs", "Embedded Linux boards", "Motor drivers", "CAN / UART / I2C / SPI", "Encoder interfaces", "DAQ modules"],
    inputs: "commands from control layer and signals from sensors",
    outputs: "hardware actions and feedback data",
    why: "Enables reliable communication between the robot's digital brain and physical components.",
  },
  {
    n: "04",
    icon: Zap,
    name: "Power Layer",
    short: "The energy layer that supplies, regulates, and protects the robot.",
    similar: "Blood flow / energy system",
    branch: "Electrical Engineering",
    what: "Provides electrical energy, regulates voltage and current, and protects the system for safe and reliable operation. Without stable power, even the most advanced robot cannot function safely.",
    functions: ["Battery management", "Power distribution", "Voltage regulation", "Wiring and connectors", "Protection circuits", "Charging", "Electrical safety"],
    tech: ["Battery packs", "BMS", "DC-DC converters", "Power rails", "Fuses / breakers", "EMI filtering", "Protection relays"],
    inputs: "external power or stored energy",
    outputs: "regulated power to controllers, sensors, and actuators",
    why: "Stable power is essential for safe, consistent, and reliable robotic operation.",
  },
  {
    n: "05",
    icon: Layers,
    name: "Physical Structure",
    short: "The mechanical layer that gives the robot form, motion, and interaction capability.",
    similar: "Bones and muscles",
    branch: "Mechanical Engineering",
    what: "Provides the robot's body, joints, mechanisms, and structure for motion, load-bearing, and interaction. Defines reach, precision, payload, durability, and physical capability.",
    functions: ["Frames and links", "Joints and transmissions", "Grippers / end effectors", "Chassis design", "Kinematics", "Dynamics", "Manufacturing and assembly"],
    tech: ["Gears and belts", "Servo mounts", "Bearings", "Actuators", "3D printed / machined parts", "Composite or metal structures"],
    inputs: "forces and actuator motion",
    outputs: "movement, manipulation, and physical interaction",
    why: "Determines the robot's reach, precision, payload, durability, and physical capabilities.",
  },
];

function Architecture() {
  return (
    <>
      <PageHero
        eyebrow="Robotics Architecture"
        title={<>The 5-Layer <span className="text-primary">Intelligence Stack</span>.</>}
        subtitle="From intelligence to movement — how a robot thinks, decides, connects, powers, and acts in the real world."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              RoboParadigm builds robots as complete intelligent systems, not
              isolated machines. Every robot we develop is designed across five
              connected layers: <span className="text-foreground">AI decision-making, control, hardware interface, power, and physical structure</span>.
              Together, these layers allow a robot to perceive, reason, plan,
              move, interact, and operate safely in real-world environments.
            </p>
          </div>
          <div className="rounded-md overflow-hidden border border-border-strong">
            <img
              src={archStack}
              alt="Robotics architecture diagram showing RoboParadigm's five-layer robotics intelligence stack: AI decision, control, hardware interface, power, and physical structure."
              width={1400}
              height={1000}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {layers.map((L, i) => (
        <section key={L.n} className={`border-b border-border ${i % 2 === 1 ? "bg-surface/30" : ""}`}>
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-primary">LAYER {L.n}</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <L.icon className="mt-6 h-10 w-10 text-primary" />
                  <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight">
                    {L.name}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{L.short}</p>
                  <dl className="mt-8 space-y-3 font-mono text-xs">
                    <div className="flex gap-3">
                      <dt className="text-muted-foreground w-24">Similar to</dt>
                      <dd>{L.similar}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="text-muted-foreground w-24">Discipline</dt>
                      <dd>{L.branch}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">What it does</h3>
                  <p className="mt-3 text-base leading-relaxed">{L.what}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-md border border-border bg-background p-5">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-primary">Core Functions</h3>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {L.functions.map((f) => <li key={f} className="flex gap-2"><span className="text-primary/60">·</span>{f}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-md border border-border bg-background p-5">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-primary">Typical Tech</h3>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {L.tech.map((t) => <li key={t} className="flex gap-2"><span className="text-primary/60">·</span>{t}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
                  <div className="rounded-sm border border-border p-4">
                    <div className="text-muted-foreground">INPUTS</div>
                    <div className="mt-1 text-foreground">{L.inputs}</div>
                  </div>
                  <div className="rounded-sm border border-border p-4">
                    <div className="text-muted-foreground">OUTPUTS</div>
                    <div className="mt-1 text-foreground">{L.outputs}</div>
                  </div>
                </div>
                <div className="rounded-md border border-primary/30 bg-primary/5 p-5">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-primary">Why it matters</h3>
                  <p className="mt-2 text-base">{L.why}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <SectionLabel>Closing</SectionLabel>
          <p className="mt-6 mx-auto max-w-3xl font-display text-2xl md:text-3xl font-bold leading-snug">
            Together, these five layers make the robot think, feel, and act in the real world.
          </p>
          <p className="mt-4 mx-auto max-w-3xl text-muted-foreground leading-relaxed">
            The AI layer decides what to do, the control layer determines how to
            move, the hardware interface connects software to hardware, the
            power layer supplies stable energy, and the physical structure moves
            and interacts with the world.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
