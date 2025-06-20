/**
 * Returns a string identifier for a given source object based on its module and function properties.
 * If either property is missing, a placeholder '?' is used. If both are missing, returns '<unknown>'.
 *
 * @param {Object} sourceObject - The object containing module and function properties.
 * @param {string} [sourceObject.module] - The name of the module (optional).
 * @param {string} [sourceObject.function] - The name of the function (optional).
 * @returns {string} a string in the format 'module/function', with '?' as a placeholder for missing values, or '<unknown>' if both are missing.
 */
function getModuleFunctionIdentifier(sourceObject) {
  // Check if at least one of 'module' or 'function' exists
  if (sourceObject.module || sourceObject.function) {
    // Use '?' as a placeholder for missing values
    const moduleName = sourceObject.module || "?";
    const functionName = sourceObject.function || "?";
    return `${moduleName}/${functionName}`;
  }
  // If both are missing, return '<unknown>'
  return "<unknown>";
}

module.exports = getModuleFunctionIdentifier;