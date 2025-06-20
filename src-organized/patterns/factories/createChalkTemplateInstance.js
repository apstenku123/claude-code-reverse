/**
 * Creates a Chalk template instance with a configured prototype chain and deprecation warning for the constructor.
 *
 * @param {any} chalkConfig - The configuration object or options for creating the Chalk template instance.
 * @returns {any} The created Chalk template instance.
 */
function createChalkTemplateInstance(chalkConfig) {
  // Delegate to the underlying factory function to create the template instance
  return createChalkTemplate(chalkConfig);
}

module.exports = createChalkTemplateInstance;