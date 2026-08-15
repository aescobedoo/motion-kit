import React from 'react';
import {Composition} from 'remotion';
import config from '../motion.config.json';
import {CreatividadSustraccion} from './CreatividadSustraccion';
import {OverlayReference, SocialReference} from './OutputReferences';

const colors = config.colors;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="CreatividadSustraccion"
      component={CreatividadSustraccion}
      durationInFrames={203}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        figureColor: '#141416',
        cloudColors: [
          colors.neutral,
          colors.blue,
          colors.orange,
          colors.red,
          colors.purple,
          colors.cyan,
          '#8A8A96',
          colors.blue,
          colors.orange,
        ],
        selectedColor: colors.yellow,
        backgroundCenter: colors.backgroundCenter,
        backgroundEdge: colors.backgroundEdge,
      }}
    />
    <Composition
      id="OverlayReference"
      component={OverlayReference}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{color: colors.cyan}}
    />
    <Composition
      id="SocialReference"
      component={SocialReference}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1350}
      defaultProps={{background: colors.backgroundEdge, color: colors.yellow}}
    />
  </>
);
