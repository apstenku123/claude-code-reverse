/**
 * Ensures compatibility between ES modules and CommonJS modules by returning
 * the default export if available, or wrapping the module in a default property.
 *
 * @param {object} moduleObject - The imported module object to normalize.
 * @returns {object} The module object with a guaranteed 'default' property.
 */
function interopRequireDefault(moduleObject) {
  // If the module is an ES module (has __esModule flag), return as is
  if (moduleObject && moduleObject.__esModule) {
    return moduleObject;
  }
  // Otherwise, wrap the module in an object with a 'default' property
  return { default: moduleObject };
}

module.exports = interopRequireDefault;