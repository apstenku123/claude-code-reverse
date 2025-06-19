/**
 * Checks if the current Node.js process is running on Google App Engine (GAE).
 *
 * This function inspects the environment variables 'GAE_SERVICE' and 'GAE_MODULE_NAME',
 * which are set by Google App Engine to identify the deployed service/module.
 *
 * @returns {boolean} True if running on Google App Engine, false otherwise.
 */
const isRunningOnGoogleAppEngine = () => {
  // Check for GAE-specific environment variables
  const isGaeServiceDefined = Boolean(process.env.GAE_SERVICE);
  const isGaeModuleNameDefined = Boolean(process.env.GAE_MODULE_NAME);

  // Return true if either variable is set
  return isGaeServiceDefined || isGaeModuleNameDefined;
};

module.exports = isRunningOnGoogleAppEngine;