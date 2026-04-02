"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import { motion } from "framer-motion";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import MotionButtonWrap from "@/components/motion/MotionButtonWrap";
import headshotImage from "@/pic/headshot.jpg";
import logoImage from "@/pic/logo_black.png";

type HeroSectionProps = {
  eyebrow: string;
  name: string;
  title: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function HeroSection({
  eyebrow,
  name,
  title,
  intro,
  ctaPrimary,
  ctaSecondary
}: HeroSectionProps) {
  const reduceMotion = useHydratedReducedMotion();
  const heroBlockRef = useRef<HTMLDivElement>(null);
  const nameWords = name.split(" ");
  const easeCurve = [0.22, 1, 0.36, 1] as const;
  const lastNameWordDelay = Math.max(nameWords.length - 1, 0) * 0.08;
  const [enableTilt, setEnableTilt] = useState(false);
  const telemetryTags = ["AI RESEARCH", "APPLIED MATH", "DEPLOYABLE SYSTEMS"];

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const pointerQuery = window.matchMedia("(pointer: fine)");
    const updateTiltAvailability = () => {
      setEnableTilt(pointerQuery.matches);
    };

    updateTiltAvailability();
    pointerQuery.addEventListener("change", updateTiltAvailability);

    return () => {
      pointerQuery.removeEventListener("change", updateTiltAvailability);
    };
  }, [reduceMotion]);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !heroBlockRef.current) {
      return;
    }

    const rect = heroBlockRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 4;
    const rotateX = (0.5 - y) * 4;

    heroBlockRef.current.style.setProperty("--hero-rotate-x", `${rotateX.toFixed(2)}deg`);
    heroBlockRef.current.style.setProperty("--hero-rotate-y", `${rotateY.toFixed(2)}deg`);
  };

  const resetTilt = () => {
    if (!heroBlockRef.current) {
      return;
    }

    heroBlockRef.current.style.setProperty("--hero-rotate-x", "0deg");
    heroBlockRef.current.style.setProperty("--hero-rotate-y", "0deg");
  };

  const sectionVariants = reduceMotion
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0
          }
        }
      }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08
          }
        }
      };

  const nameWordVariants = reduceMotion
    ? {
        hidden: {},
        visible: { opacity: 1 }
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: easeCurve
          }
        }
      };

  return (
    <Section className="relative flex min-h-screen items-center overflow-hidden hairline-grid">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-center"
          animate={reduceMotion ? undefined : { scale: [0.97, 1.03, 0.97] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }
          }
        >
          <svg
            className="h-full w-full opacity-60"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="var(--color-accent)" strokeOpacity="0.06">
              <path d="M0 180H1440" />
              <path d="M0 360H1440" />
              <path d="M0 540H1440" />
              <path d="M0 720H1440" />
              <path d="M240 0V900" />
              <path d="M480 0V900" />
              <path d="M720 0V900" />
              <path d="M960 0V900" />
              <path d="M1200 0V900" />
              <circle cx="1080" cy="280" r="120" />
              <circle cx="1080" cy="280" r="210" />
              <circle cx="1080" cy="280" r="300" />
            </g>
          </svg>
        </motion.div>
      </div>

      <Container wide>
        <motion.div
          ref={heroBlockRef}
          className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          style={
            enableTilt
              ? {
                  transform:
                    "perspective(800px) rotateX(var(--hero-rotate-x, 0deg)) rotateY(var(--hero-rotate-y, 0deg))",
                  transformStyle: "preserve-3d",
                  transition: "transform 160ms ease-out"
                }
              : undefined
          }
          onMouseMove={handlePointerMove}
          onMouseLeave={resetTilt}
        >
          <div className="max-w-5xl">
            <motion.p
              className="section-label"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                ease: easeCurve
              }}
            >
              {eyebrow}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : 0.12,
                ease: easeCurve
              }}
            >
              {telemetryTags.map((tag) => (
                <span key={tag} className="glass-badge">
                  {tag}
                </span>
              ))}
            </motion.div>

            <h1 className="display-title mt-8 max-w-5xl">
              <span className="silver-text">
                {nameWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    className="inline-block"
                    variants={nameWordVariants}
                  >
                    {word}
                    {index < nameWords.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.h2
              className="headline-lg mt-8 max-w-3xl text-[var(--color-text-soft)]"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : 0.2 + lastNameWordDelay,
                ease: easeCurve
              }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="body-lg mt-8 max-w-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : 0.28 + lastNameWordDelay,
                ease: easeCurve
              }}
            >
              {intro}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion ? 0 : 0.3 + lastNameWordDelay,
                ease: easeCurve
              }}
            >
              <MotionButtonWrap>
                <LocaleLink href="/projects" className="btn-primary">
                  {ctaPrimary}
                </LocaleLink>
              </MotionButtonWrap>

              <MotionButtonWrap>
                <LocaleLink href="/contact" className="btn-secondary">
                  {ctaSecondary}
                </LocaleLink>
              </MotionButtonWrap>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-4 sm:grid-cols-3"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : 0.38 + lastNameWordDelay,
                ease: easeCurve
              }}
            >
              <div className="hero-metric-panel">
                <span className="hero-metric-label">MODE</span>
                <span className="hero-metric-value">RESEARCH</span>
              </div>
              <div className="hero-metric-panel">
                <span className="hero-metric-label">STATUS</span>
                <span className="hero-metric-value">BUILDING</span>
              </div>
              <div className="hero-metric-panel">
                <span className="hero-metric-label">SURFACE</span>
                <span className="hero-metric-value">DEPLOYABLE AI</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-portrait-shell"
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.24 + lastNameWordDelay,
              ease: easeCurve
            }}
          >
            <div className="hero-portrait-frame">
              <div className="hero-portrait-grid" />
              <div className="hero-portrait-image-wrap">
                <Image
                  src={headshotImage}
                  alt={`${name} headshot`}
                  priority
                  placeholder="blur"
                  className="hero-portrait-image"
                  sizes="(min-width: 1024px) 34vw, 90vw"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="hero-side-panel">
                <div className="flex items-center justify-between gap-3">
                  <span className="hero-metric-label">PROFILE</span>
                  <span className="pulse-indicator" aria-hidden="true" />
                </div>
                <p className="hero-side-copy mt-3">
                  Technical depth, mathematical rigor, and real-world deployment.
                </p>
              </div>

              <div className="hero-side-panel">
                <div className="flex items-center justify-between gap-3">
                  <span className="hero-metric-label">SIGNAL</span>
                  <Image
                    src={logoImage}
                    alt="CJ logo"
                    className="h-16 w-auto object-contain opacity-90"
                    sizes="64px"
                  />
                </div>
                <div className="speed-bar mt-3" aria-hidden="true">
                  <span className="speed-bar__fill" />
                </div>
                <p className="hero-side-copy mt-3">Research, infrastructure, and product execution.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
