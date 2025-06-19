/**
 * Merges environment variables from the cached configuration and mergeValidSubscriptions sources into process.env.
 *
 * This function retrieves environment variables from two sources:
 *   1. The cached configuration (via getCachedConfig())
 *   2. The mergeValidSubscriptions environment (via mergeValidSubscriptions())
 * It then merges both sets of environment variables into the current process.env object.
 *
 * @returns {void} This function does not return a value.
 */
function mergeEnvFromConfigAndV8() {
  // Retrieve environment variables from the mergeValidSubscriptions source
  const v8Environment = mergeValidSubscriptions();

  // Merge environment variables from the cached config into process.env
  Object.assign(process.env, getCachedConfig().env);

  // Merge environment variables from the mergeValidSubscriptions source into process.env
  Object.assign(process.env, v8Environment.env);
}

module.exports = mergeEnvFromConfigAndV8;