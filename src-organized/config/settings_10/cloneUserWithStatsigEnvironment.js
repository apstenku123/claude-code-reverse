/**
 * Clones a user object and attaches a statsigEnvironment property based on the provided config or tier.
 *
 * @param {Object} user - The user object to clone.
 * @param {Object} [options] - Optional configuration object. May contain an 'environment' property.
 * @param {string} [tier] - Optional tier string to use if options.environment is not provided.
 * @returns {Object} a deep-cloned user object with a statsigEnvironment property set appropriately.
 */
function cloneUserWithStatsigEnvironment(user, options, tier) {
  try {
    // Deep clone the user object to avoid mutating the original
    const clonedUser = JSON.parse(JSON.stringify(user));

    // Attach statsigEnvironment from options if available
    if (options != null && options.environment != null) {
      clonedUser.statsigEnvironment = options.environment;
    } else if (tier != null) {
      // Otherwise, attach statsigEnvironment with the provided tier
      clonedUser.statsigEnvironment = { tier: tier };
    }

    return clonedUser;
  } catch (error) {
    // Log the error and return a fallback object with undefined statsigEnvironment
    vz9.Log.error("Failed to JSON.stringify user");
    return {
      statsigEnvironment: undefined
    };
  }
}

module.exports = cloneUserWithStatsigEnvironment;