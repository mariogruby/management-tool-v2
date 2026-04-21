/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { RevealProps } from "./Reveal.types";
import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useEffect, useRef } from "react";

export const fadeIn = (position: string, delay?: number): Variants => {
  return {
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.4,
        delay: delay ? delay : 0.5,
        ease: [0.25, 0.25, 0.25, 0.75],
      } as const,
    },
    hidden: {
      y: position === "bottom" ? -80 : 0,
      x: position === "right" ? 80 : 0,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        delay: 0.5,
        ease: [0.25, 0.25, 0.25, 0.25],
      } as const,
    },
  };
};

export function Reveal(props: RevealProps) {
  const { children, position, className, delay } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        variants={fadeIn(position, delay)}
        initial="hidden"
        animate={mainControls}
        exit="hidden"
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
