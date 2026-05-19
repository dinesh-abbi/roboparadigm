import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  SectionLabel,
  StatusBadge,
  TechTag,
} from "@/components/site/primitives";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import prof1 from "@/assets/professional/1.webp";
import prof2 from "@/assets/professional/2.webp";
import prof3 from "@/assets/professional/3.webp";
import prof4 from "@/assets/professional/4.webp";
import prof5 from "@/assets/professional/5.webp";
import prof6 from "@/assets/professional/6.webp";
import prof8 from "@/assets/professional/8.webp";
import prof9 from "@/assets/professional/9.webp";
import prof10 from "@/assets/professional/10.webp";

const highlights = [
  {
    title: "7-DOF Robotic Arm",
    status: "Demo Ready",
    tags: ["ROS 2", "MoveIt", "3D Printed"],
    img: prof1,
  },
  {
    title: "ServoPilot",
    status: "Validated",
    tags: ["PID Tuning", "Diagnostics"],
    img: prof8,
  },
  {
    title: "Mobile Manipulator",
    status: "Teleoperation Working",
    tags: ["Raspberry Pi", "Nav2 Roadmap"],
    img: prof9,
  },
  {
    title: "Agentic Pipeline",
    status: "AI Pipeline Ready",
    tags: ["CV", "Agentic AI", "MoveIt"],
    img: prof2,
  },
  {
    title: "OMX Wrist-Roll Metrics",
    status: "Simulation Validated",
    tags: ["Benchmarking", "Research"],
    img: prof10,
  },
  {
    title: "Robot Learning",
    status: "Research Track",
    tags: ["SmolVLA", "Pi0.5", "VLA"],
    img: prof6,
  },
];

export function ProjectHighlights() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Project Highlights</SectionLabel>

            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight md:text-4xl">
              Working platforms. Not slideware.
            </h2>
          </div>

          <Link
            to="/projects"
            className="flex flex-shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
          >
            All projects
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          grabCursor={true}
          loop={true}
          speed={800}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
            },
            640: {
              slidesPerView: 1.4,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="project-swiper !pb-14"
        >
          {highlights.map((h) => (
            <SwiperSlide key={h.title}>
              <Link
                to="/projects"
                className="group relative block overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={h.img}
                    alt={h.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-85"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-5">

                  <h3 className="mt-3 font-display text-xl font-semibold transition-colors group-hover:text-primary">
                    {h.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {h.tags.map((t) => (
                      <TechTag key={t}>{t}</TechTag>
                    ))}
                  </div>
                </div>

                <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full border border-primary/40 bg-primary/20 p-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}