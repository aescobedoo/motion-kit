---
name: motion
description: Create, revise, preview, render, and verify short motion graphics from plain-language directions, scripts, sketches, or visual references. Use for full-screen vertical animations, transparent Reel overlays, and 4:5 social assets; default to full-screen Apple-inspired tech, neon, minimal motion unless the user requests another personalized style.
---

# Motion

Turn the user's idea into a finished visual file. Handle setup, code, preview, rendering, and
verification yourself. Keep user-facing explanations short and focused on the result.

## Start

1. Read `references/kit-location.md` to locate Motion Kit.
2. Read `MOTION-STYLE.md` and `motion.config.json` in that directory before designing.
3. If dependencies are missing, install them without asking the user to run commands.
4. Treat full-screen vertical motion as the default. Use overlay or social only when requested or
   clearly required by the destination.

## Build

1. Identify the one relationship, transformation, comparison, process, or object the animation
   must make visible.
2. Reuse `src/CreatividadSustraccion.tsx` as the quality and movement reference. Reuse an existing
   generated component only when it fits; otherwise create one component under `src/generated/`.
3. Register each new component once in `src/Root.tsx` with a clear composition ID.
4. Keep each animation short, usually 2–7 seconds, with a complete entrance and exit.
5. Never imply that illustrative diagrams are measured data unless the user supplied the numbers.

## Output modes

Read `references/outputs.md` for the exact render and verification recipes.

- **Full-screen default:** 1080×1920, 30 fps, solid background, `.mov` for an editor timeline.
- **Overlay:** 1080×1920, 30 fps, transparent ProRes 4444 `.mov`.
- **Social:** 1080×1350, 30 fps, H.264 `.mp4` or `.png` still.

## Adjustments

Modify the existing component when the user asks for an adjustment. Do not create numbered
variants unless requested. Preserve everything the user did not ask to change, render again, and
verify the replacement.

## Deliver

Return the absolute file path, output mode, duration, and one short description of what changed.
Do not teach Remotion, React, codecs, or terminal commands unless the user asks.
