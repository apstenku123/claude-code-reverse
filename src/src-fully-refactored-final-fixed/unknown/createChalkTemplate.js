/**
 * Creates a new Chalk template function instance with custom configuration, prototype chain, and legacy support properties.
 *
 * @param {object} chalkConfig - The configuration object for the Chalk template instance.
 * @returns {Function} a new Chalk template function instance configured with the provided options.
 */
function createChalkTemplate(chalkConfig) {
  // Delegate to the underlying factory function to create the Chalk template instance
  return createChalkTemplateInstance(chalkConfig);
}

module.exports = createChalkTemplate;