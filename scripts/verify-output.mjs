import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const [fileArg, mode] = process.argv.slice(2);
if (!fileArg || !['fullscreen', 'overlay', 'social'].includes(mode)) {
  throw new Error('Usage: node scripts/verify-output.mjs <file> <fullscreen|overlay|social>');
}

const file = resolve(fileArg);
if (!existsSync(file)) throw new Error(`Missing output: ${file}`);

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const probe = spawnSync(npx, ['remotion', 'ffmpeg', '-hide_banner', '-i', file], {
  encoding: 'utf8',
});
const output = `${probe.stdout ?? ''}\n${probe.stderr ?? ''}`;
const videoLine = output.split('\n').find((line) => line.includes('Stream') && line.includes('Video:')) ?? '';
const hasAudio = output.split('\n').some((line) => line.includes('Stream') && line.includes('Audio:'));

const expectedSize = mode === 'social' ? '1080x1350' : '1080x1920';
const failures = [];
if (!videoLine.includes(expectedSize)) failures.push(`expected ${expectedSize}`);
if (!videoLine.includes('30 fps')) failures.push('expected 30 fps');
if (hasAudio) failures.push('expected no audio stream');
if (mode === 'fullscreen' && (!videoLine.includes('prores') || videoLine.includes('yuva'))) {
  failures.push('expected opaque ProRes video');
}
if (mode === 'overlay' && (!videoLine.includes('prores') || !videoLine.includes('yuva'))) {
  failures.push('expected ProRes video with alpha');
}
if (mode === 'social' && (!videoLine.includes('h264') || !/yuvj?420/.test(videoLine))) {
  failures.push('expected H.264 yuv420 video');
}

if (failures.length > 0) {
  throw new Error(`${failures.join('; ')}\n${videoLine}`);
}

process.stdout.write(`OUTPUT_OK ${mode} ${file}\n${videoLine.trim()}\n`);
