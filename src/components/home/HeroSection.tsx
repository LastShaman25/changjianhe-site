"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/layout/Section";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import MotionButtonWrap from "@/components/motion/MotionButtonWrap";
import LocaleLink from "@/components/ui/LocaleLink";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/animations/gsap";
import headshotImage from "@/pic/headshot_nbck.png";

type HeroSectionProps = {
  eyebrow: string;
  name: string;
  title: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

// TUNE: scroll distance for the pinned hero sequence - increase if chapters
// feel rushed, decrease if sequence requires too much scrolling.
const PIN_SCROLL_DISTANCE = 2000;

export default function HeroSection({
  eyebrow: _eyebrow,
  name,
  title,
  intro,
  ctaPrimary,
  ctaSecondary
}: HeroSectionProps) {
  const t = useTranslations("HomePage");
  const reduceMotion = useHydratedReducedMotion();
  const [showAllDesktopContent, setShowAllDesktopContent] = useState(false);

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);
  const headshotWrapperRef = useRef<HTMLDivElement>(null);
  const headshotRef = useRef<HTMLDivElement>(null);
  const nameBlockRef = useRef<HTMLDivElement>(null);
  const metricPanelsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const signalItemRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const widthQuery = window.matchMedia("(max-width: 1023px)");
    const updateRenderMode = () => {
      const useFallbackLayout = widthQuery.matches;
      setShowAllDesktopContent(useFallbackLayout || !!reduceMotion);
    };

    updateRenderMode();
    widthQuery.addEventListener("change", updateRenderMode);

    return () => {
      widthQuery.removeEventListener("change", updateRenderMode);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (
      window.matchMedia("(max-width: 1023px)").matches ||
      !heroSectionRef.current ||
      !headshotRef.current ||
      !metricPanelsRef.current ||
      !introRef.current ||
      !ctaRef.current
    ) {
      return;
    }

    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      gsap.set(metricPanelsRef.current, { opacity: 0, y: 30 });
      gsap.set(introRef.current, { opacity: 0, y: 16 });
      gsap.set(signalsRef.current, { opacity: 0 });
      gsap.set(signalItemRefs.current.filter(Boolean), { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, scale: 0.97 });
      gsap.set(headshotRef.current, { scale: 1, y: 0, opacity: 1 });

      const tl = gsap.timeline({ paused: true });

      tl.to(
        metricPanelsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out"
        },
        0
      );

      tl.to(
        headshotRef.current,
        {
          scale: 1.04,
          duration: 0.25,
          ease: "none"
        },
        0
      );

      tl.to(
        introRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        },
        0.3
      );

      tl.to(
        headshotRef.current,
        {
          y: -18,
          duration: 0.2,
          ease: "none"
        },
        0.3
      );

      tl.to(
        signalsRef.current,
        {
          opacity: 1,
          duration: 0.15,
          ease: "power2.out"
        },
        0.55
      );

      tl.to(
        signalItemRefs.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          duration: 0.15,
          stagger: 0.08,
          ease: "power2.out"
        },
        0.55
      );

      tl.to(
        headshotRef.current,
        {
          opacity: 0.88,
          duration: 0.15,
          ease: "none"
        },
        0.55
      );

      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.15,
          ease: "power2.out"
        },
        0.82
      );

      tl.to(
        headshotRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: "none"
        },
        0.82
      );

      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top top",
        end: `+=${PIN_SCROLL_DISTANCE}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        animation: tl,
        invalidateOnRefresh: true
      });
    }, heroSectionRef);

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (
      window.matchMedia("(max-width: 1023px)").matches ||
      !heroSectionRef.current ||
      !headshotRef.current
    ) {
      return;
    }

    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const overlayTargets = [
        nameBlockRef.current,
        metricPanelsRef.current,
        introRef.current,
        signalsRef.current,
        ctaRef.current
      ].filter(Boolean);

      gsap.to(headshotRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      });

      if (overlayTargets.length) {
        gsap.to(overlayTargets, {
          opacity: 0,
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }
    }, heroSectionRef);

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  const metricItems = [
    {
      label: t("heroMetrics.modeLabel"),
      value: t("heroMetrics.modeValue")
    },
    {
      label: t("heroMetrics.statusLabel"),
      value: t("heroMetrics.statusValue")
    },
    {
      label: t("heroMetrics.surfaceLabel"),
      value: t("heroMetrics.surfaceValue")
    }
  ];

  const signalItems = [
    t("accomplishmentsItems.one"),
    t("accomplishmentsItems.two"),
    t("accomplishmentsItems.three")
  ];

  return (
    <div ref={heroSectionRef} className="-mt-[102px] h-[calc(100vh+102px)]">
      <Section className="relative h-full overflow-hidden hairline-grid pt-0 pb-0">
        <div className="relative h-full w-full">
        <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
          <motion.div
            className="absolute inset-0 origin-center"
            animate={reduceMotion ? undefined : { scale: [0.97, 1.03, 0.97] }}
            style={{ willChange: "transform" }}
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
            <div ref={heroGridRef} className="absolute inset-0" style={{ willChange: "transform" }}>
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
            </div>
          </motion.div>
        </div>

        <div ref={headshotWrapperRef} className="absolute inset-0 z-0">
          <div ref={headshotRef} className="absolute inset-0 will-change-transform">
            <Image
              src={headshotImage}
              alt={`${name} portrait`}
              priority
              placeholder="empty"
              fill
              className="object-contain object-center"
              sizes="100vw"
            />
          </div>
        </div>

        <div ref={nameBlockRef} className="absolute bottom-[20%] left-8 z-10 max-w-5xl lg:left-16">
          <h1 className="display-title max-w-5xl pb-[0.14em] silver-text">{name}</h1>
          <h2 className="headline-lg mt-8 max-w-3xl text-[var(--color-text-soft)]">{title}</h2>
        </div>

        <div
          ref={metricPanelsRef}
          className={`absolute bottom-[8%] left-8 z-10 grid gap-4 sm:grid-cols-3 lg:left-16 ${
            showAllDesktopContent ? "" : "lg:opacity-0"
          }`}
        >
          {metricItems.map((item) => (
            <div key={item.label} className="hero-metric-panel">
              <span className="hero-metric-label">{item.label}</span>
              <span className="hero-metric-value">{item.value}</span>
            </div>
          ))}
        </div>

        <p
          ref={introRef}
          className={`body-lg absolute top-[26%] left-4 z-10 max-w-sm lg:left-8 ${
            showAllDesktopContent ? "" : "lg:opacity-0"
          }`}
        >
          {intro}
        </p>

        <div
          ref={signalsRef}
          className={`absolute top-[26%] right-4 z-10 flex max-w-[18rem] flex-col gap-4 lg:right-8 ${
            showAllDesktopContent ? "" : "lg:opacity-0"
          }`}
        >
          {signalItems.map((item, index) => (
            <p
              key={item}
              ref={(node) => {
                signalItemRefs.current[index] = node;
              }}
              className="body-md"
            >
              {item}
            </p>
          ))}
        </div>

        <div
          ref={ctaRef}
          className={`absolute right-8 bottom-[8%] z-10 flex gap-4 lg:right-16 ${
            showAllDesktopContent ? "" : "lg:opacity-0"
          }`}
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
        </div>
        </div>
      </Section>
    </div>
  );
}
