const fs = require('fs');

function checkLockFiles() {
  const errors = [];
  if (fs.existsSync('pnpm-lock.yaml')) {
    errors.push(
      'Invalid occurence of "pnpm-lock.yaml" file. Please remove it and use only "yarn.lock"'
    );
  }
  if (fs.existsSync('package-lock.json')) {
    errors.push(
      'Invalid occurence of "package-lock.json" file. Please remove it and use only "yarn.lock"'
    );
  }
  try {
    const content = fs.readFileSync('yarn.lock', 'utf-8');
    if (content.match(/localhost:487/)) {
      errors.push(
        'The "yarn.lock" has reference to local yarn repository ("localhost:4873"). Please use "registry.yarnpkg.com" in "yarn.lock"'
      );
    }
  } catch {
    errors.push('The "yarn.lock" does not exist or cannot be read');
  }
  return errors;
}

const invalid = checkLockFiles();
if (invalid.length > 0) {
  invalid.forEach((e) => console.log(e));
  process.exit(1);
} else {
  process.exit(0);
}
