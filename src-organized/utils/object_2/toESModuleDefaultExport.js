/**
 * Ensures a module is in ES Module format by wrapping non-ES modules in a default export.
 *
 * @param {any} moduleObject - The imported module object to check and possibly wrap.
 * @returns {any} The original module if isBlobOrFileLikeObject is an ES Module, otherwise an object with a default property containing the module.
 */
function toESModuleDefaultExport(moduleObject) {
  // If the module has the __esModule flag, isBlobOrFileLikeObject is already an ES Module
  if (moduleObject && moduleObject.__esModule) {
    return moduleObject;
  }
  // Otherwise, wrap isBlobOrFileLikeObject in an object with a default property
  return { default: moduleObject };
}

module.exports = toESModuleDefaultExport;