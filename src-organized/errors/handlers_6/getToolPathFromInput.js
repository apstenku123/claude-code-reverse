/**
 * Retrieves the path from a tool object using its getPath method, if available.
 *
 * @function getToolPathFromInput
 * @category app
 * @file /Users/davegornshtein/Documents/test22/1.0.19/src/app/getInputPathFromTool.js
 *
 * @param {Object} toolInputObject - An object containing a 'tool' property (the tool instance) and an 'input' property (the input to pass to getPath).
 * @param {Object} toolInputObject.tool - The tool instance which may have a getPath method.
 * @param {any} toolInputObject.input - The input value to be passed to the tool'createInteractionAccessor getPath method.
 * @returns {any|null} The result of tool.getPath(input), or null if not available or an error occurs.
 */
function getToolPathFromInput(toolInputObject) {
  const { tool, input } = toolInputObject;

  // Check if the tool has a getPath method
  if (typeof tool?.getPath === "function") {
    try {
      // Attempt to call getPath with the provided input
      return tool.getPath(input);
    } catch (error) {
      // If getPath throws an error, return null
      return null;
    }
  }
  // If getPath is not a function, return null
  return null;
}

module.exports = getToolPathFromInput;
