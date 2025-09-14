declare module 'canvas-confetti' {
  export interface Options {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    angle?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    scalar?: number;
    ticks?: number;
    shapes?: string[];
    zIndex?: number;
  }
  const confetti: (opts?: Options) => void;
  export default confetti;
}

