"use client";

interface StepRampDividerProps {
  /** Fill color - defaults to off-white/cream */
  color?: string;
  /** Total height of the divider */
  height?: number;
  /** Where the ramp starts (0-100, percentage from left) */
  rampStart?: number;
  /** Where the ramp ends (0-100, percentage from left) */
  rampEnd?: number;
  /** Additional classes */
  className?: string;
}

/**
 * StepRampDivider - A step-down ramp divider
 *
 * Shape: ___________
 *                   \
 *                    \
 *                     \___________
 */
export function StepRampDivider({
  color = "#F4F3E8",
  height = 120,
  rampStart = 45,
  rampEnd = 65,
  className = "",
}: StepRampDividerProps) {
  // Points: top-left, ramp-start, ramp-end, top-right, bottom-right, bottom-left
  const points = `
    0,0
    ${rampStart},0
    ${rampEnd},100
    100,100
    100,100
    0,100
  `;

  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ height: `${height}px`, marginTop: `-${height}px` }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <polygon points={points} fill={color} />
      </svg>
    </div>
  );
}
