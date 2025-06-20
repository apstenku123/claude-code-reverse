/**
 * Retrieves the current release identifier from environment variables or global objects.
 *
 * The function checks for a release identifier in the following order:
 *   1. The SENTRY_RELEASE environment variable
 *   2. The global SENTRY_RELEASE object (if available)
 *   3. a prioritized list of common CI/CD commit SHA environment variables
 *   4. a provided fallback value
 *
 * @param {string} fallbackValue - a fallback value to use if no release identifier is found in the environment or global objects.
 * @returns {string} The detected release identifier, or the fallback value if none is found.
 */
function getReleaseIdentifier(fallbackValue) {
  // 1. Check for SENTRY_RELEASE in environment variables
  if (process.env.SENTRY_RELEASE) {
    return process.env.SENTRY_RELEASE;
  }

  // 2. Check for SENTRY_RELEASE in global object (e.g., browser global scope)
  if (
    typeof KP !== 'undefined' &&
    KP.GLOBAL_OBJ &&
    KP.GLOBAL_OBJ.SENTRY_RELEASE &&
    KP.GLOBAL_OBJ.SENTRY_RELEASE.id
  ) {
    return KP.GLOBAL_OBJ.SENTRY_RELEASE.id;
  }

  // 3. Check for common CI/CD commit SHA environment variables in order of priority
  const commitShaEnvVars = [
    'GITHUB_SHA',
    'COMMIT_REF',
    'VERCEL_GIT_COMMIT_SHA',
    'VERCEL_GITHUB_COMMIT_SHA',
    'VERCEL_GITLAB_COMMIT_SHA',
    'VERCEL_BITBUCKET_COMMIT_SHA',
    'ZEIT_GITHUB_COMMIT_SHA',
    'ZEIT_GITLAB_COMMIT_SHA',
    'ZEIT_BITBUCKET_COMMIT_SHA',
    'CF_PAGES_COMMIT_SHA'
  ];

  for (const envVar of commitShaEnvVars) {
    if (process.env[envVar]) {
      return process.env[envVar];
    }
  }

  // 4. Fallback to the provided value if no identifier is found
  return fallbackValue;
}

module.exports = getReleaseIdentifier;
