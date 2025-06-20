/**
 * Merges environment variables from the cached or fresh configuration and from the mergeValidSubscriptions observable into process.env.
 *
 * This function retrieves two sets of environment variables:
 *   1. From the configuration object (using getCachedOrFreshConfig, formerly getCachedOrFreshConfig)
 *   2. From the mergeValidSubscriptions observable (using mergeValidSubscriptions)
 * It then merges both sets into the current Node.js process environment.
 *
 * @returns {void} This function does not return a value.
 */
function mergeConfigEnvsIntoProcessEnv() {
  // Retrieve environment variables from the mergeValidSubscriptions observable
  const v8Observable = mergeValidSubscriptions();

  // Retrieve environment variables from the cached or fresh configuration
  const config = getCachedOrFreshConfig();

  // Merge configuration environment variables into process.env
  Object.assign(process.env, config.env);

  // Merge mergeValidSubscriptions observable environment variables into process.env
  Object.assign(process.env, v8Observable.env);
}

module.exports = mergeConfigEnvsIntoProcessEnv;