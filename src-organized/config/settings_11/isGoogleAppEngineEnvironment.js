/**
 * Checks if the current Node.js process is running in a Google App Engine environment.
 *
 * This function determines if either the 'GAE_SERVICE' or 'GAE_MODULE_NAME' environment variables
 * are set, which are indicators of a Google App Engine runtime environment.
 *
 * @returns {boolean} True if running on Google App Engine, false otherwise.
 */
const isGoogleAppEngineEnvironment = () => {
  // Google App Engine sets either GAE_SERVICE or GAE_MODULE_NAME environment variables
  const isServiceSet = Boolean(process.env.GAE_SERVICE);
  const isModuleNameSet = Boolean(process.env.GAE_MODULE_NAME);
  return isServiceSet || isModuleNameSet;
};

module.exports = isGoogleAppEngineEnvironment;