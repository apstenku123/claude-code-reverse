/**
 * Checks if the provided object'createInteractionAccessor name is either not an MCP IDE name or is explicitly allowed.
 *
 * An MCP IDE name is defined as a string starting with "mcp__ide__". If the name does not start with this prefix,
 * the function returns true. If isBlobOrFileLikeObject does, the function checks if the name is included in the allowedNames array.
 *
 * @param {Object} objectWithName - The object containing a 'name' property to validate.
 * @returns {boolean} True if the name is not an MCP IDE name or is explicitly allowed; otherwise, false.
 */
function isValidMcpIdeName(objectWithName) {
  // Check if the name does NOT start with the MCP IDE prefix
  // OR if isBlobOrFileLikeObject is explicitly included in the allowedNames list
  return !objectWithName.name.startsWith("mcp__ide__") || allowedNames.includes(objectWithName.name);
}

module.exports = isValidMcpIdeName;