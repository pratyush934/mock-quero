"use client";

import { BackgroundLines } from "@/components/ui/background-lines";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FAQs from "./FAQs";
import Features from "./Features";
import { AnimatedTestimonialsDemo } from "./Testimonies";
import { Button } from "./ui/button";
import Working from "./Working";

export function BackgroundLinesDemo() {
  const [scrollEffect, setScrollEffect] = useState({ scale: 1, opacity: 1 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scaleValue = Math.max(1 - scrollY / 1000, 0); // Scale decreases as you scroll down
      const opacityValue = Math.max(1 - scrollY / 500, 0); // Opacity decreases faster
      setScrollEffect({ scale: scaleValue, opacity: opacityValue });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        MockQuero <br />
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Your AI-powered companion for mastering job interviews. <br />
        Prepare smarter, faster, and with confidence.
      </p>
      <div className="mt-10 mb-10">
        <Image
          className="rounded-b-xl"
          src={"/banner_main.jpg"}
          alt="banner"
          height={720}
          width={1280}
          style={{
            transform: `scale(${scrollEffect.scale})`,
            opacity: scrollEffect.opacity,
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          }}
        />
      </div>
      <div className="mt-6">
        <Link href={"/onboarding"}>
          <Button size={"lg"} className="px-8 py-4" variant={"primary"}>
            Get Started
          </Button>
        </Link>
      </div>
    </BackgroundLines>
  );
}

const HeroSection = () => {
  return (
    <section className="w-full mt-36 md:mt-45 pb-10">
      <BackgroundLinesDemo />
      <Features />
      <Working />
      <AnimatedTestimonialsDemo />
      <FAQs />
      <div className="flex justify-center items-center">
        <Link href={"/dashboard"}>
          <Button size={"lg"} className="px-8 py-4" variant={"secondary"}>
            Get Started, Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
