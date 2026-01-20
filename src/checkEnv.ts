export function checkEnv(requiredVars: string[]): void {
    if (!Array.isArray(requiredVars)) {
        throw new Error('checkEnv expects an array of environment variable names');
    }

    const missing: string[] = [];

    for (const key of requiredVars) {
        const value = process.env[key];

        if (value === undefined || value.trim() === '') {
            missing.push(key);
        }
    }

    if (missing.length > 0) {
        console.error('');
        console.error('========================================');
        console.error('ENV VALIDATION FAILED');
        console.error('========================================');
        console.error('');
        console.error('Missing required environment variables:');
        console.error('');

        for (const key of missing) {
            console.error(`- ${key}`);
        }

        console.error('');
        console.error('Tip: Check your .env file or deployment configuration');
        console.error('');
        console.error('========================================');
        console.error('');

        process.exit(1);
    }
}
