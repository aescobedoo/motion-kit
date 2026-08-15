import {spawnSync} from 'node:child_process';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const node = process.execPath;

const run = (command, args) => {
  const result = spawnSync(command, args, {stdio: 'inherit'});
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run(npm, ['run', 'typecheck']);
run(npm, ['run', 'render:demo']);
run(node, ['scripts/verify-output.mjs', 'out/setup/creatividad-sustraccion.mov', 'fullscreen']);
run(npm, [
  'run',
  'render:overlay',
  '--',
  'src/index.ts',
  'OverlayReference',
  'out/setup/overlay-reference.mov',
]);
run(node, ['scripts/verify-output.mjs', 'out/setup/overlay-reference.mov', 'overlay']);
run(npm, [
  'run',
  'render:social',
  '--',
  'src/index.ts',
  'SocialReference',
  'out/setup/social-reference.mp4',
]);
run(node, ['scripts/verify-output.mjs', 'out/setup/social-reference.mp4', 'social']);
process.stdout.write('MOTION_KIT_OK\n');
