import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  collapsed: {
    height: 56,
    width: 330,
    borderRadius: 50,
  },
  expanded: {
    height: 180,
    width: 400,
    borderRadius: 50,
  },
  showStats: {
    height: 280,
    width: 400,
    borderRadius: 50,
  },
};

export const logoVariants: Variants = {
  collapsed: {
    scale: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
  },
  expanded: (direction: number) => ({
    scale: 1.7,
    x: direction * 20,
    y: 25,
    filter: "blur(0px)",
  }),
  showStats: (direction: number) => ({
    scale: 1.7,
    x: direction * 20,
    y: 25,
    filter: "blur(0px)",
  }),
};

export const nameVariants: Variants = {
  collapsed: {
    opacity: 0,
    x: 0,
    y: 0,
  },
  expanded: (direction: number) => ({
    opacity: 1,
    x: direction * 30,
    y: 25,
  }),
  showStats: () => ({
    opacity: 0,
    scale: 0,
    transition: { delay: 0 },
  }),
};

export const scoreVariants: Variants = {
  collapsed: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  expanded: (direction: number) => ({
    opacity: 1,
    x: direction * 50,
    gap: 4,
    y: 25,
  }),
  showStats: (direction: number) => ({
    opacity: 1,
    x: direction * 50,
    gap: 4,
    y: 25,
  }),
};
