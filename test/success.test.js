const { spawnSync } = require('child_process');

const script = `
  const { checkEnv } = require('../dist');
  checkEnv(['DB_HOST', 'JWT_SECRET']);
  console.log('OK');
`;

const result = spawnSync('node', ['-e', script], {
    env: {
        DB_HOST: 'localhost',
        JWT_SECRET: 'secret'
    },
    encoding: 'utf-8'
});
console.log(result)
if (result.status !== 0) {
    console.error('Expected exit code 0, got:', result.status);
    process.exit(1);
}

if (!result.stdout.includes('OK')) {
    console.error('Expected success output not found');
    process.exit(1);
}

console.log('success.test.js passed');
