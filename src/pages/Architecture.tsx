import { Brain, Cog, Cpu, Layers, Zap } from "lucide-react";
import { PageHero, SectionLabel } from "@/components/site/primitives";

/*
 * Architecture page intentionally uses ZERO raw images for the layer sections.
 * Each layer is represented as a styled technical card:
 *   - Color-coded icon + number
 *   - Functions / tech lists
 *   - Inputs → Outputs flow
 *   - "Why it matters" callout
 *
 * The overview section uses prof4 (the system/hardware image) as context.
 * The agentic perception images appear only in the AI layer where they're meaningful.
 */
import prof4 from "@/assets/professional/4.webp";
import perception1 from "@/assets/agentic/perception1.png";



/* Layer colour tokens — blue primary for layers 1+2, copper for 3+4, emerald for 5 */
type Hue = "blue" | "copper" | "emerald";

const layers: Array<{
  n: string; icon: any; name: string; short: string;
  similar: string; branch: string; hue: Hue; what: string;
  functions: string[]; tech: string[]; inputs: string; outputs: string; why: string;
  exampleImage?: string; exampleLabel?: string;
}> = [
  {
    n: "01",
    icon: Brain,
    name: "AI / Decision Layer",
    short: "The intelligence layer that perceives, reasons, plans, and decides.",
    similar: "Brain / decision-making",
    branch: "Computer Science · AI",
    hue: "blue" as Hue,
    what: "Transforms sensor data, world state, and user goals into high-level decisions and action plans. Enables the robot to understand what is happening, decide what should be done, and send goals to the control layer.",
    functions: ["Perception", "Scene understanding", "Path planning", "Task planning", "Reasoning", "Decision-making", "Agentic AI / autonomy"],
    tech: ["Computer vision", "Machine learning / deep learning", "SLAM", "Behavior planning", "Task allocation", "Multi-agent systems"],
    inputs: "Camera · LiDAR · IMU · task goals · world state",
    outputs: "Goals · plans · commands → Control Layer",
    why: "Makes the robot adaptive, intelligent, and capable of operating in dynamic environments.",
    /** Show the agentic perception output here as a real example */
    exampleImage: perception1,
    exampleLabel: "Agentic perception output — object detection and localization",
  },
  {
    n: "02",
    icon: Cog,
    name: "Control Layer",
    short: "The coordination layer that converts intent into precise motion.",
    similar: "Brain-to-muscle coordination",
    branch: "CS · Electronics · Control Engineering",
    hue: "blue",
    what: "Turns plans into stable, accurate, real-time motion through continuous feedback and control. Takes target positions and current state and produces motor or actuator control signals.",
    functions: ["Motion control", "PID control", "Trajectory generation", "State estimation", "Feedback logic", "ROS 2 control", "Synchronization"],
    tech: ["PID / MPC", "Kalman filtering", "Joint controllers", "Servo tuning", "Trajectory planners", "Robot control middleware"],
    inputs: "Target position · sensor feedback · current state",
    outputs: "Motor and actuator control signals → Hardware Interface",
    why: "Ensures the robot moves smoothly, safely, accurately, and repeatably.",
  },
  {
    n: "03",
    icon: Cpu,
    name: "Hardware Interface Layer",
    short: "The interface layer that connects software intelligence to physical hardware.",
    similar: "Nervous system",
    branch: "Electronics · Embedded Systems",
    hue: "copper",
    what: "Bridges computation and machinery by interfacing with sensors, drivers, controllers, and feedback devices. Lets the digital brain communicate reliably with physical components.",
    functions: ["Microcontroller interfacing", "Motor driving", "Sensor acquisition", "Encoder reading", "Communication buses", "Servo control", "Real-time I/O"],
    tech: ["MCUs", "Embedded Linux boards", "Motor drivers", "CAN / UART / I2C / SPI", "Encoder interfaces", "DAQ modules"],
    inputs: "Commands from Control Layer · signals from sensors",
    outputs: "Hardware actions · feedback data → Control Layer",
    why: "Enables reliable communication between the robot's digital brain and physical components.",
  },
  {
    n: "04",
    icon: Zap,
    name: "Power Layer",
    short: "The energy layer that supplies, regulates, and protects the robot.",
    similar: "Blood flow / energy system",
    branch: "Electrical Engineering",
    hue: "copper",
    what: "Provides electrical energy, regulates voltage and current, and protects the system for safe and reliable operation. Without stable power, even the most advanced robot cannot function safely.",
    functions: ["Battery management", "Power distribution", "Voltage regulation", "Wiring and connectors", "Protection circuits", "Charging", "Electrical safety"],
    tech: ["Battery packs", "BMS", "DC-DC converters", "Power rails", "Fuses / breakers", "EMI filtering", "Protection relays"],
    inputs: "External power or stored energy",
    outputs: "Regulated power → Controllers · Sensors · Actuators",
    why: "Stable power is essential for safe, consistent, and reliable robotic operation.",
  },
  {
    n: "05",
    icon: Layers,
    name: "Physical Structure",
    short: "The mechanical layer that gives the robot form, motion, and interaction capability.",
    similar: "Bones and muscles",
    branch: "Mechanical Engineering",
    hue: "emerald" as Hue,
    what: "Provides the robot's body, joints, mechanisms, and structure for motion, load-bearing, and interaction. Defines reach, precision, payload, durability, and physical capability.",
    functions: ["Frames and links", "Joints and transmissions", "Grippers / end effectors", "Chassis design", "Kinematics", "Dynamics", "Manufacturing and assembly"],
    tech: ["Gears and belts", "Servo mounts", "Bearings", "Actuators", "3D printed / machined parts", "Composite or metal structures"],
    inputs: "Forces and actuator motion",
    outputs: "Movement · manipulation · physical interaction with the world",
    why: "Determines the robot's reach, precision, payload, durability, and physical capabilities.",
  },
];

/* Map hue names to Tailwind-compatible inline style values */
const hueTokens = {
  blue: {
    text:   "text-primary",
    border: "border-primary/30",
    bg:     "bg-primary/8",
    dot:    "bg-primary",
    arrow:  "text-primary/50",
  },
  copper: {
    text:   "text-accent",
    border: "border-accent/30",
    bg:     "bg-accent/8",
    dot:    "bg-accent",
    arrow:  "text-accent/50",
  },
  emerald: {
    text:   "text-status-demo",
    border: "border-status-demo/30",
    bg:     "bg-status-demo/8",
    dot:    "bg-status-demo",
    arrow:  "text-status-demo/50",
  },
} as const;

export default function Architecture() {
  return (
    <>
      <PageHero
        eyebrow="Robotics Architecture"
        title={<>The 5-Layer <span className="text-gradient">Intelligence Stack</span>.</>}
        subtitle="From intelligence to movement — how a robot thinks, decides, connects, powers, and acts in the real world."
      />

      {/* ── Overview ── */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              RoboParadigm builds robots as complete intelligent systems — not isolated machines.
              Every robot we develop is designed across five connected layers:{" "}
              <span className="text-foreground font-medium">
                AI decision-making, control, hardware interface, power, and physical structure.
              </span>{" "}
              Together, these layers allow a robot to perceive, reason, plan, move, interact,
              and operate safely in real-world environments.
            </p>

            {/* Visual stack — numbered blocks, color-coded */}
            <div className="space-y-2">
              {layers.map((L) => {
                const t = hueTokens[L.hue];
                return (
                  <div key={L.n} className={`rounded-xl border ${t.border} ${t.bg} px-5 py-4 flex items-center gap-4`}>
                    <span className={`font-mono text-[10px] ${t.text} w-6 flex-shrink-0`}>{L.n}</span>
                    <L.icon className={`h-4 w-4 flex-shrink-0 ${t.text}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-sm">{L.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{L.similar}</div>
                    </div>
                    <div className={`font-mono text-[10px] ${t.text} hidden md:block flex-shrink-0`}>{L.branch}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* prof4 — hardware/system context image */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-border-strong">
              <img
                src={prof4}
                alt="RoboParadigm robotic hardware — full-stack system integration"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground text-center uppercase tracking-wider">
              Full-stack robotic system · Hardware-to-intelligence integration
            </p>
          </div>
        </div>
      </section>

      {/* ── Individual layer sections — styled technical cards, no random images ── */}
      {layers.map((L, i) => {
        const t = hueTokens[L.hue];
        return (
          <section
            key={L.n}
            className={`border-b border-border ${i % 2 === 1 ? "bg-surface/20" : ""}`}
          >
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="grid lg:grid-cols-12 gap-12">
                {/* ── Left: identity ── */}
                <div className="lg:col-span-4">
                  <div className="sticky top-24">
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`font-mono text-sm ${t.text}`}>LAYER {L.n}</span>
                      <span className="h-px flex-1 bg-border" />
                    </div>

                    {/* Icon in a styled badge */}
                    <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl border ${t.border} ${t.bg} mb-5`}>
                      <L.icon className={`h-6 w-6 ${t.text}`} />
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">{L.name}</h2>
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{L.short}</p>

                    <dl className="mt-8 space-y-3 font-mono text-xs">
                      <div>
                        <dt className="text-muted-foreground mb-0.5">Similar to</dt>
                        <dd className={t.text}>{L.similar}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground mb-0.5">Engineering discipline</dt>
                        <dd>{L.branch}</dd>
                      </div>
                    </dl>

                    {/* Flow indicator */}
                    <div className={`mt-8 rounded-xl border ${t.border} ${t.bg} p-4 font-mono text-xs`}>
                      <div className="text-muted-foreground mb-2 uppercase tracking-wider text-[10px]">Data flow</div>
                      <div className="text-foreground">{L.inputs}</div>
                      <div className={`my-1.5 ${t.text}`}>↓</div>
                      <div className="text-foreground">{L.outputs}</div>
                    </div>
                  </div>
                </div>

                {/* ── Right: detail cards ── */}
                <div className="lg:col-span-8 space-y-6">
                  {/* What it does */}
                  <div className="rounded-xl border border-border bg-background/50 p-6">
                    <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                      What it does
                    </h3>
                    <p className="text-base leading-relaxed">{L.what}</p>
                  </div>

                  {/* Functions + Tech — two-column */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className={`rounded-xl border ${t.border} ${t.bg} p-5`}>
                      <h3 className={`font-mono text-[10px] uppercase tracking-widest ${t.text} mb-4`}>
                        Core Functions
                      </h3>
                      <ul className="space-y-2">
                        {L.functions.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${t.dot}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`rounded-xl border ${t.border} ${t.bg} p-5`}>
                      <h3 className={`font-mono text-[10px] uppercase tracking-widest ${t.text} mb-4`}>
                        Typical Technology
                      </h3>
                      <ul className="space-y-2">
                        {L.tech.map((tech) => (
                          <li key={tech} className="flex items-start gap-2 text-sm">
                            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${t.dot}`} />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Why it matters */}
                  <div className={`rounded-xl border ${t.border} p-5 relative overflow-hidden`}>
                    <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${t.dot}`} />
                    <div className="pl-4">
                      <h3 className={`font-mono text-[10px] uppercase tracking-widest ${t.text} mb-2`}>
                        Why it matters
                      </h3>
                      <p className="text-base">{L.why}</p>
                    </div>
                  </div>

                  {/* Example image — ONLY for AI layer (shows actual perception output) */}
                  {"exampleImage" in L && L.exampleImage && (
                    <div className="rounded-xl border border-border bg-background/30 p-5">
                      <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                        In Practice — Agentic Perception Output
                      </h3>
                      <div className="rounded-lg overflow-hidden border border-border">
                        <img
                          src={L.exampleImage}
                          alt={L.exampleLabel}
                          loading="lazy"
                          className="w-full h-auto max-h-72 object-contain bg-background"
                        />
                      </div>
                      <p className="mt-2 font-mono text-[10px] text-muted-foreground">{L.exampleLabel}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Closing ── */}
      <section className="border-b border-border bg-surface/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
          <SectionLabel>The Complete System</SectionLabel>
          <p className="mt-6 mx-auto max-w-3xl font-display text-2xl md:text-3xl font-bold leading-snug">
            Together, these five layers make the robot{" "}
            <span className="text-gradient">think, feel, and act</span>{" "}
            in the real world.
          </p>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            The AI layer decides what to do. The control layer determines how to move.
            The hardware interface connects software to hardware. The power layer supplies
            stable energy. The physical structure moves and interacts with the world.
          </p>
        </div>
      </section>
    </>
  );
}
