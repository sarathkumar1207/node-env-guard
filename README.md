# node-env-guard

[![npm version](https://badge.fury.io/js/node-env-guard.svg)](https://badge.fury.io/js/node-env-guard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Fail-fast environment variable validation for Node.js applications. **node-env-guard** ensures all required environment variables are present and non-empty at application startup, preventing runtime errors due to missing configurations.

## Features

- Simple and lightweight validation
- Fail-fast approach - exits immediately if validation fails
- Clear error messages listing all missing variables
- Zero dependencies
- TypeScript support
- Works with CommonJS and ES modules

## Installation

```bash
npm install node-env-guard
```

## Quick Start

```javascript
const { checkEnv } = require('node-env-guard');

// Check for required environment variables at app startup
checkEnv(['DATABASE_URL', 'API_KEY', 'NODE_ENV']);

// If any variable is missing or empty, the app exits with helpful error message
// Otherwise, continue with your application logic
```

### Using with ES Modules

```javascript
import { checkEnv } from 'node-env-guard';

checkEnv(['DATABASE_URL', 'API_KEY', 'NODE_ENV']);
```

## API

### `checkEnv(requiredVars: string[]): void`

Validates that all specified environment variables are present and non-empty.

**Parameters:**
- `requiredVars` (string[]): Array of environment variable names to validate

**Behavior:**
- If all variables are present and non-empty, the function returns normally
- If any variable is missing or empty, a detailed error message is logged and the process exits with code 1

**Example:**

```javascript
const { checkEnv } = require('node-env-guard');

// Your required environment variables
const requiredEnv = [
  'DATABASE_URL',
  'JWT_SECRET',
  'REDIS_HOST',
  'LOG_LEVEL'
];

checkEnv(requiredEnv);

// If execution reaches here, all environment variables are valid
console.log('Environment validation passed! Starting application...');
```

## Error Output

When validation fails, you'll see a clear error message:

```
========================================
ENV VALIDATION FAILED
========================================

Missing required environment variables:

- DATABASE_URL
- API_KEY

Tip: Check your .env file or deployment configuration

========================================
```

## Usage Examples

### Express.js Application

```javascript
import express from 'express';
import { checkEnv } from 'node-env-guard';

// Validate environment variables first
checkEnv(['PORT', 'DATABASE_URL', 'JWT_SECRET']);

const app = express();
const port = process.env.PORT;

// Rest of your application...
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### NestJS Application

```typescript
import { checkEnv } from 'node-env-guard';

checkEnv(['DATABASE_URL', 'JWT_SECRET', 'REDIS_URL']);

// Then bootstrap your NestJS app
```

### Configuration File Approach

Create a `config/env.js` file:

```javascript
import { checkEnv } from 'node-env-guard';

const requiredVars = [
  'NODE_ENV',
  'DATABASE_URL',
  'CACHE_URL',
  'SESSION_SECRET',
  'SMTP_HOST',
  'SMTP_PORT'
];

checkEnv(requiredVars);

export const config = {
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  cacheUrl: process.env.CACHE_URL,
  sessionSecret: process.env.SESSION_SECRET,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT
};
```

Then import in your main file:

```javascript
import { config } from './config/env.js';
```

## .env File Setup

Create a `.env` file in your project root:

```
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Why node-env-guard?

Running a Node.js application without required environment variables can lead to cryptic errors deep in your application code. This package helps you:

1. **Catch errors early** - Validate at startup before any initialization
2. **Clear diagnostics** - See exactly which variables are missing
3. **Fail safely** - Prevent partial initialization and hard-to-debug issues
4. **Production-ready** - Essential for containerized deployments (Docker, Kubernetes)

## Best Practices

1. **Validate early** - Run `checkEnv()` as one of the first things in your application
2. **List all requirements** - Include every required environment variable
3. **Document in README** - Let users know what variables are needed
4. **Use .env.example** - Create a template file showing required variables:

```
NODE_ENV=
DATABASE_URL=
API_KEY=
JWT_SECRET=
```

## TypeScript Support

This package includes full TypeScript type definitions. No additional `@types/` packages needed.

```typescript
import { checkEnv } from 'node-env-guard';

const requiredVars: string[] = ['DATABASE_URL', 'API_KEY'];
checkEnv(requiredVars);
```

## License

MIT © 2024 Sarathkumar

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/sarathkumar1207/node-env-guard/issues).

## Changelog

### v1.0.0
- Initial release
- Basic environment variable validation
- Clear error messaging
