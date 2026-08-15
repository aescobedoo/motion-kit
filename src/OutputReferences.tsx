import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type ReferenceProps = {
  background?: string;
  color: string;
};

const MovingMark: React.FC<{color: string}> = ({color}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 200}, durationInFrames: 14});
  const exit = interpolate(frame, [durationInFrames - 14, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = interpolate(enter, [0, 1], [-180, 0]);
  return (
    <div style={{transform: `translateX(${x}px) scale(${0.94 + enter * 0.06})`, opacity: enter * exit}}>
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: '50%',
          border: `5px solid ${color}`,
          boxShadow: `0 0 24px ${color}`,
        }}
      />
    </div>
  );
};

export const OverlayReference: React.FC<ReferenceProps> = ({color}) => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
    <MovingMark color={color} />
  </AbsoluteFill>
);

export const SocialReference: React.FC<ReferenceProps> = ({background = '#000000', color}) => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', background}}>
    <MovingMark color={color} />
  </AbsoluteFill>
);
