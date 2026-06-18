"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "framer-motion";

import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

interface MotionRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function MotionReveal({
  children,
  delay = 0,
  ...props
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      transition={{ delay }}
      variants={fadeUp}
      viewport={viewport}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface MotionHeroProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function MotionHero({ children, delay = 0, ...props }: MotionHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? undefined : "visible"}
      initial={reduceMotion ? false : "hidden"}
      transition={{ delay }}
      variants={fadeUp}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface MotionStaggerProps extends HTMLMotionProps<"div"> {}

export function MotionStagger({ children, ...props }: MotionStaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      variants={reduceMotion ? undefined : staggerContainer}
      viewport={viewport}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface MotionStaggerItemProps extends HTMLMotionProps<"div"> {}

export function MotionStaggerItem({
  children,
  ...props
}: MotionStaggerItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div variants={reduceMotion ? undefined : fadeUp} {...props}>
      {children}
    </motion.div>
  );
}
