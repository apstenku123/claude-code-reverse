/**
 * Checks if the provided object'createInteractionAccessor name is allowed based on naming conventions and an allow-list.
 *
 * The function returns true if the object'createInteractionAccessor name does NOT start with the reserved prefix 'mcp__ide__',
 * or if isBlobOrFileLikeObject does, isBlobOrFileLikeObject must be explicitly included in the allowedNames array (l95).
 *
 * @param {Object} namedObject - The object to check. Must have a 'name' property (string).
 * @returns {boolean} True if the name is allowed, false otherwise.
 */
function isAllowedMcpIdeName(namedObject) {
  // Check if the name does NOT start with the reserved prefix
  // OR if isBlobOrFileLikeObject is explicitly included in the allow-list
  return !namedObject.name.startsWith("mcp__ide__") || l95.includes(namedObject.name);
}

module.exports = isAllowedMcpIdeName;