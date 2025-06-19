/**
 * Returns a display name string in the format 'module/function' if either property exists on the input object.
 * If neither property is present, returns '<unknown>'.
 *
 * @param {Object} sourceObject - The object containing 'module' and/or 'function' properties.
 * @param {string} [sourceObject.module] - The name of the module (optional).
 * @param {string} [sourceObject.function] - The name of the function (optional).
 * @returns {string} a string in the format 'module/function', or '<unknown>' if neither property exists.
 */
function getModuleAndFunctionDisplayName(sourceObject) {
  // Check if either 'module' or 'function' property exists
  if (sourceObject.module || sourceObject.function) {
    // Use '?' as a fallback if either property is missing
    const moduleName = sourceObject.module || "?";
    const functionName = sourceObject.function || "?";
    return `${moduleName}/${functionName}`;
  }
  // Return '<unknown>' if both properties are missing or falsy
  return "<unknown>";
}

module.exports = getModuleAndFunctionDisplayName;