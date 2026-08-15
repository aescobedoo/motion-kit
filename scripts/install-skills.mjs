import {cpSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync} from 'node:fs';
import {homedir} from 'node:os';
import {basename, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const kitRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = join(kitRoot, 'skill-source', 'motion');
const testRoot = process.env.MOTION_KIT_SKILL_HOME;
const roots = testRoot
  ? [join(resolve(testRoot), '.agents', 'skills'), join(resolve(testRoot), '.claude', 'skills')]
  : [join(homedir(), '.agents', 'skills'), join(homedir(), '.claude', 'skills')];

const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');

const isOurSkill = (target) => {
  const skillPath = join(target, 'SKILL.md');
  if (!existsSync(skillPath)) return false;
  const content = readFileSync(skillPath, 'utf8');
  return content.includes('name: motion') && content.includes('Turn the user\'s idea into a finished visual file.');
};

for (const root of roots) {
  mkdirSync(root, {recursive: true});
  const target = join(root, 'motion');

  if (existsSync(target)) {
    if (isOurSkill(target)) {
      rmSync(target, {recursive: true});
    } else {
      const backup = join(root, `motion.backup-${timestamp}`);
      renameSync(target, backup);
      process.stdout.write(`Existing ${basename(target)} skill preserved at ${backup}\n`);
    }
  }

  cpSync(source, target, {recursive: true});
  const locationPath = join(target, 'references', 'kit-location.md');
  const location = readFileSync(locationPath, 'utf8').replace('{{MOTION_KIT_ROOT}}', kitRoot);
  writeFileSync(locationPath, location);
  process.stdout.write(`Installed Motion for ${root.includes('.claude') ? 'Claude Code' : 'Codex'}: ${target}\n`);
}
