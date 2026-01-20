const { spawnSync } = require('child_process');
const path = require('path');

const script = `
  const { checkEnv } = require('../dist');
  checkEnv(['DB_HOST', 'JWT_SECRET']);
`;

const result = spawnSync('node', ['-e', script], {
    env: {}, // no env variables
    encoding: 'utf-8'
});
console.log(result)
if (result.status !== 1) {
    console.error('Expected exit code 1, got:', result.status);
    process.exit(1);
}

if (!result.stderr.includes('ENV VALIDATION FAILED')) {
    console.error('Expected error message not found');
    process.exit(1);
}

console.log('failure.test.js passed');
