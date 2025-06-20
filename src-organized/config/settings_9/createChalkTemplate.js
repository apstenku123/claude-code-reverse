/**
 * Creates a Chalk template function with a configured prototype chain and deprecation warning for constructor.
 *
 * @param {object} chalkConfig - The configuration object for the Chalk instance.
 * @returns {function} The template function with extended properties and prototype.
 */
function createChalkTemplate(chalkConfig) {
  // The template context object that will hold configuration and methods
  const templateContext = {};

  // Initialize the template context with the provided configuration
  setLevelOption(templateContext, chalkConfig);

  // Define the template function, which delegates to JK2 with the template and arguments
  templateContext.template = (...templateArgs) => {
    return JK2(templateContext.template, ...templateArgs);
  };

  // Set up the prototype chain: templateContext inherits from createChalkTemplateInstance.prototype
  Object.setPrototypeOf(templateContext, createChalkTemplateInstance.prototype);
  // The template function itself inherits from the template context
  Object.setPrototypeOf(templateContext.template, templateContext);

  // Override the constructor to throw a deprecation error
  templateContext.template.constructor = () => {
    throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
  };

  // Attach the Instance property to the template function
  templateContext.template.Instance = YK2;

  // Return the configured template function
  return templateContext.template;
}

module.exports = createChalkTemplate;
