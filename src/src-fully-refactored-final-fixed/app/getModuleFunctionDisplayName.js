/**
 * Returns a string representation of a module/function pair.
 * If either the module or function property is missing, a '?' placeholder is used.
 * If both are missing, returns '<unknown>'.
 *
 * @param {Object} sourceObject - The object containing module and function properties.
 * @param {string} [sourceObject.module] - The name of the module (optional).
 * @param {string} [sourceObject.function] - The name of the function (optional).
 * @returns {string} a string in the format 'module/function', with '?' as placeholders, or '<unknown>' if both are missing.
 */
function getModuleFunctionDisplayName(sourceObject) {
  // Check if either module or function property exists
  if (sourceObject.module || sourceObject.function) {
    // Use '?' as a placeholder if either property is missing
    const moduleName = sourceObject.module || "?";
    const functionName = sourceObject.function || "?";
    return `${moduleName}/${functionName}`;
  }
  // Return '<unknown>' if both properties are missing
  return "<unknown>";
}

module.exports = getModuleFunctionDisplayName;
