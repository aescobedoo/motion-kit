# Output recipes

Run every command from the Motion Kit directory.

## Full-screen default

```bash
npm run render:fullscreen -- src/index.ts <CompositionId> out/<name>.mov
node scripts/verify-output.mjs out/<name>.mov fullscreen
```

Require 1080×1920, 30 fps, a solid background, video without alpha, and no audio stream.

## Transparent overlay

```bash
npm run render:overlay -- src/index.ts <CompositionId> out/<name>.mov
node scripts/verify-output.mjs out/<name>.mov overlay
```

Require 1080×1920, 30 fps, a `yuva` pixel format, and no audio stream.

## Social animation

```bash
npm run render:social -- src/index.ts <CompositionId> out/<name>.mp4
node scripts/verify-output.mjs out/<name>.mp4 social
```

Require 1080×1350, 30 fps, H.264, and no audio stream.

## Social still

```bash
npm run still:social -- src/index.ts <CompositionId> out/<name>.png --frame=<frame>
```

Require 1080×1350.
