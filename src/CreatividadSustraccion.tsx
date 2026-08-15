import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {lerpColor} from './color';

export type CreatividadSustraccionProps = {
  figureColor: string;
  cloudColors: string[];
  selectedColor: string;
  backgroundCenter: string;
  backgroundEdge: string;
  exitDurationInFrames?: number;
};

type OrbitId = 'A' | 'B';

const ORBITS: Record<OrbitId, {rx: number; ry: number; rotateDeg: number}> = {
  A: {rx: 380, ry: 140, rotateDeg: -18},
  B: {rx: 330, ry: 105, rotateDeg: 24},
};

const CLOUD_CX = 450;
const CLOUD_CY = 380;
const CONTAINER_CX = 450;
const CONTAINER_CY = 610;
const RESOLVED_BUBBLE_INDEX = 5;

const BUBBLES = [
  {orbit: 'A' as OrbitId, angle: 20, size: 26, appear: 10, drift: 0.55},
  {orbit: 'B' as OrbitId, angle: 200, size: 18, appear: 15, drift: -0.4},
  {orbit: 'A' as OrbitId, angle: 140, size: 32, appear: 20, drift: 0.35},
  {orbit: 'B' as OrbitId, angle: 60, size: 15, appear: 25, drift: -0.6},
  {orbit: 'A' as OrbitId, angle: 260, size: 20, appear: 30, drift: 0.5},
  {orbit: 'B' as OrbitId, angle: 320, size: 28, appear: 35, drift: -0.3},
  {orbit: 'A' as OrbitId, angle: 90, size: 16, appear: 40, drift: 0.65},
  {orbit: 'B' as OrbitId, angle: 160, size: 22, appear: 45, drift: -0.45},
  {orbit: 'A' as OrbitId, angle: 300, size: 19, appear: 50, drift: 0.4},
];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

const orbitPoint = (orbit: OrbitId, angleDeg: number) => {
  const {rx, ry, rotateDeg} = ORBITS[orbit];
  const angle = (angleDeg * Math.PI) / 180;
  const rotation = (rotateDeg * Math.PI) / 180;
  const ellipseX = rx * Math.cos(angle);
  const ellipseY = ry * Math.sin(angle);
  return {
    x: CLOUD_CX + ellipseX * Math.cos(rotation) - ellipseY * Math.sin(rotation),
    y: CLOUD_CY + ellipseX * Math.sin(rotation) + ellipseY * Math.cos(rotation),
  };
};

export const CreatividadSustraccion: React.FC<CreatividadSustraccionProps> = ({
  figureColor,
  cloudColors,
  selectedColor,
  backgroundCenter,
  backgroundEdge,
  exitDurationInFrames = 16,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 200}, durationInFrames: 10});
  const enterScale = interpolate(enter, [0, 1], [0.95, 1]);
  const enterOpacity = interpolate(enter, [0, 1], [0, 1]);
  const exitStart = Math.max(durationInFrames - exitDurationInFrames, 164);
  const exitProgress = interpolate(frame, [exitStart, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = enterScale * interpolate(exitProgress, [0, 1], [1, 0.95]);
  const opacity = enterOpacity * interpolate(exitProgress, [0, 1], [1, 0]);

  const cloudFade = interpolate(frame, [4, 18, 153, 156], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const containerOpacity = interpolate(frame, [56, 72, 154, 156], [0, 0.72, 0.72, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const containerScale = interpolate(frame, [143, 156], [1, 0.94], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const goldAppear = spring({
    frame: Math.max(0, frame - 155),
    fps,
    config: {damping: 30, stiffness: 180, mass: 0.6},
    durationInFrames: 14,
  });
  const goldScale = interpolate(goldAppear, [0, 1], [0.28, 1]);
  const goldOpacity = interpolate(frame, [155, 156], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const goldSettled = Math.max(0, frame - 170);
  const goldFloatY = Math.sin(goldSettled * 0.16) * 5;
  const goldBreath = 1 + Math.sin(goldSettled * 0.2) * 0.035;
  const focusOpacity = interpolate(frame, [164, 170], [0, 0.38], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const confirmationOpacity = interpolate(frame, [155, 158, 174], [0, 0.78, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const confirmationRadius = interpolate(frame, [155, 174], [38, 112], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 70% 55% at 50% 32%, ${backgroundCenter} 0%, ${backgroundEdge} 75%)`,
      }}
    >
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 70}}>
        <svg
          width={900}
          height={1230}
          viewBox="0 0 900 1230"
          style={{transform: `scale(${scale})`, opacity, transformOrigin: 'top center'}}
        >
          <circle cx={450} cy={690} r={345} fill="#FFFFFF" opacity={0.045 * enterOpacity} />
          <circle cx={450} cy={690} r={210} fill="#FFFFFF" opacity={0.06 * enterOpacity} />

          <g style={{filter: `drop-shadow(0 0 10px ${figureColor})`}}>
            <circle cx={450} cy={790} r={54} fill={figureColor} />
            <rect x={345} y={844} width={210} height={320} rx={70} fill={figureColor} />
          </g>

          <ellipse
            cx={CLOUD_CX}
            cy={CLOUD_CY}
            rx={ORBITS.A.rx}
            ry={ORBITS.A.ry}
            fill="none"
            stroke="#F2F2F2"
            strokeWidth={2}
            opacity={cloudFade * 0.18}
            transform={`rotate(${ORBITS.A.rotateDeg} ${CLOUD_CX} ${CLOUD_CY})`}
          />
          <ellipse
            cx={CLOUD_CX}
            cy={CLOUD_CY}
            rx={ORBITS.B.rx}
            ry={ORBITS.B.ry}
            fill="none"
            stroke="#F2F2F2"
            strokeWidth={2}
            opacity={cloudFade * 0.18}
            transform={`rotate(${ORBITS.B.rotateDeg} ${CLOUD_CX} ${CLOUD_CY})`}
          />

          <g
            opacity={containerOpacity}
            transform={`translate(${CONTAINER_CX} ${CONTAINER_CY}) scale(${containerScale}) translate(${-CONTAINER_CX} ${-CONTAINER_CY})`}
          >
            <rect
              x={270}
              y={508}
              width={360}
              height={204}
              rx={48}
              fill="rgba(255,255,255,0.035)"
              stroke="#F2F2F2"
              strokeWidth={2}
            />
            <line x1={294} y1={550} x2={606} y2={550} stroke="#F2F2F2" strokeWidth={1.5} opacity={0.25} />
            <line x1={346} y1={568} x2={346} y2={672} stroke="#F2F2F2" strokeWidth={1.5} opacity={0.16} />
            <line x1={450} y1={568} x2={450} y2={672} stroke="#F2F2F2" strokeWidth={1.5} opacity={0.16} />
            <line x1={554} y1={568} x2={554} y2={672} stroke="#F2F2F2" strokeWidth={1.5} opacity={0.16} />
          </g>

          {BUBBLES.map((bubble, index) => {
            const selectionStart = 74 + index * 7;
            const selectionEnd = selectionStart + 10;
            const orbitFrame = Math.min(frame, selectionStart);
            const drifted = Math.max(0, orbitFrame - bubble.appear) * bubble.drift;
            const orbit = orbitPoint(bubble.orbit, bubble.angle + drifted);
            const row = Math.floor(index / 3) - 1;
            const column = (index % 3) - 1;
            const slot = {x: CONTAINER_CX + column * 82, y: CONTAINER_CY + row * 48 + 6};
            const travel = smoothstep((frame - selectionStart) / (selectionEnd - selectionStart));
            const resolve = smoothstep((frame - 143) / 13);
            const isResolved = index === RESOLVED_BUBBLE_INDEX;
            const arrived = {x: lerp(orbit.x, slot.x, travel), y: lerp(orbit.y, slot.y, travel)};
            const discardTarget = {
              x: slot.x + column * 74 + (index % 2 === 0 ? -34 : 34),
              y: slot.y + 200 + index * 8,
            };
            const x = isResolved
              ? lerp(arrived.x, CONTAINER_CX, resolve)
              : lerp(arrived.x, discardTarget.x, resolve);
            const y = isResolved
              ? lerp(arrived.y, CONTAINER_CY, resolve)
              : lerp(arrived.y, discardTarget.y, resolve);
            const appear = spring({
              frame: frame - bubble.appear,
              fps,
              config: {damping: 200},
              durationInFrames: 8,
            });
            const baseOpacity = interpolate(appear, [0, 1], [0, 1]);
            const discardOpacity = interpolate(resolve, [0, 1], [1, 0]);
            const bubbleOpacity = baseOpacity * cloudFade * (isResolved ? 1 : discardOpacity);
            const resolveScale = isResolved
              ? interpolate(resolve, [0, 1], [1, 1.65])
              : interpolate(resolve, [0, 1], [1, 0.24]);
            const bubbleScale = interpolate(appear, [0, 1], [0.55, 1]) * resolveScale;
            const selectRingOpacity = interpolate(
              frame,
              [selectionStart - 2, selectionStart + 1, selectionEnd, selectionEnd + 3],
              [0, 0.74, 0.74, 0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );
            const color = cloudColors[index % cloudColors.length];
            const resolvedRingOpacity = isResolved
              ? interpolate(frame, [143, 146, 155], [0, 0.84, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              : 0;
            const bubbleColor = isResolved ? lerpColor(color, selectedColor, resolve) : color;

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r={bubble.size * bubbleScale + 9}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  opacity={selectRingOpacity * cloudFade}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={bubble.size * bubbleScale + 13}
                  fill="none"
                  stroke={selectedColor}
                  strokeWidth={2.5}
                  opacity={resolvedRingOpacity * cloudFade}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={bubble.size * bubbleScale}
                  fill={bubbleColor}
                  opacity={bubbleOpacity}
                  style={{filter: `drop-shadow(0 0 8px ${bubbleColor})`}}
                />
              </g>
            );
          })}

          <circle
            cx={CONTAINER_CX}
            cy={CONTAINER_CY + goldFloatY}
            r={confirmationRadius}
            fill="none"
            stroke={selectedColor}
            strokeWidth={3}
            opacity={confirmationOpacity}
          />
          <circle
            cx={CONTAINER_CX}
            cy={CONTAINER_CY + goldFloatY}
            r={76}
            fill="none"
            stroke={selectedColor}
            strokeWidth={2}
            strokeDasharray="4 10"
            opacity={focusOpacity}
            transform={`rotate(${goldSettled * 3} ${CONTAINER_CX} ${CONTAINER_CY + goldFloatY})`}
          />
          <circle
            cx={CONTAINER_CX}
            cy={CONTAINER_CY + goldFloatY}
            r={48 * goldScale * goldBreath}
            fill={selectedColor}
            opacity={goldOpacity}
            style={{filter: `drop-shadow(0 0 24px ${selectedColor})`}}
          />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
