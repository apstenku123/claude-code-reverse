/**
 * Creates a new Chalk template instance with custom behavior and prototype chain.
 *
 * This function initializes a configuration object, applies the provided configuration handler,
 * sets up a template function with custom formatting logic, and establishes the correct prototype chain
 * for Chalk compatibility. It also attaches deprecation warnings and the Instance constructor for legacy support.
 *
 * @param {object} chalkConfig - The configuration object or instance to initialize the template with.
 * @returns {function} a template function with extended properties and prototype chain for Chalk usage.
 */
function createChalkTemplateInstance(chalkConfig) {
  // Initialize the configuration object for the template instance
  const templateConfig = {};

  // Apply configuration handler to set up templateConfig based on chalkConfig
  setLevelOption(templateConfig, chalkConfig);

  // Define the template function that formats template strings using JK2
  templateConfig.template = (...templateArgs) => {
    return JK2(templateConfig.template, ...templateArgs);
  };

  // Set up prototype chain for Chalk compatibility
  Object.setPrototypeOf(templateConfig, createChalkTemplateInstance.prototype);
  Object.setPrototypeOf(templateConfig.template, templateConfig);

  // Attach a deprecated constructor to warn users
  templateConfig.template.constructor = () => {
    throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
  };

  // Attach the Instance constructor for legacy support
  templateConfig.template.Instance = YK2;

  // Return the configured template function
  return templateConfig.template;
}

module.exports = createChalkTemplateInstance;