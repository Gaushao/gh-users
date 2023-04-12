import { useMemo } from "react";

/**
 * @param props
 */
export default function Spinner({
  size = 32,
  stroke = "black",
  fill = "transparent",
}: {
  size?: number | undefined;
  stroke?: string | undefined;
  fill?: string | undefined;
}) {
  const circ = useMemo(() => Math.floor(2 * Math.PI * size), [size]);
  return (
    <>
      <style>
        {`
          svg.spinner {
            width: ${size}px;
            height: ${size}px;
            animation: 2s linear infinite svg-spinner-animation;
          }
          @keyframes svg-spinner-animation {
            0% {
              transform: rotateZ(0deg);
            }
            100% {
              transform: rotateZ(360deg)
            }
          }
          circle.spinner {
            animation: 1s ease-in-out infinite both circle-spinner-animation;
            fill: ${fill};
            stroke: ${stroke};
            stroke-width: 2;
            stroke-linecap: round;
            stroke-dasharray: ${circ + 2};
            stroke-dashoffset: ${circ};
            transform-origin: 50% 50%;
          }
          @keyframes circle-spinner-animation {
            0% {
              stroke-dashoffset: ${circ};
              transform: rotate(0);
            }
            50% {
              stroke-dashoffset: ${Math.floor(circ / 2)};
              transform: rotate(45deg);
            }
            
            100% {
              stroke-dashoffset: ${circ};
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <svg viewBox={`0 0 ${size} ${size}`} className="spinner">
        <title>spinner</title>
        <circle
          className="spinner"
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
        ></circle>
      </svg>
    </>
  );
}
