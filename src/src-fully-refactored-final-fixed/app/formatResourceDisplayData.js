/**
 * Formats resource data for display based on its type.
 *
 * @param {Object} resource - The resource object to format.
 * @param {string} resource.type - The type of the resource ('file' or 'mcp_resource').
 * @param {string} [resource.path] - The file path (required if type is 'file').
 * @param {string} [resource.server] - The server identifier (required if type is 'mcp_resource').
 * @param {string} [resource.uri] - The resource URI (required if type is 'mcp_resource').
 * @param {string} resource.displayText - The text to display for the resource.
 * @param {string} resource.description - The description of the resource.
 * @returns {Object|undefined} An object containing id, displayText, and description, or undefined if type is unrecognized.
 */
function formatResourceDisplayData(resource) {
  switch (resource.type) {
    case "file":
      // Format for file resources
      return {
        id: `file-${resource.path}`,
        displayText: resource.displayText,
        description: resource.description
      };
    case "mcp_resource":
      // Format for MCP resources
      return {
        id: `mcp-resource-${resource.server}__${resource.uri}`,
        displayText: resource.displayText,
        description: resource.description
      };
    default:
      // Return undefined for unrecognized types
      return undefined;
  }
}

module.exports = formatResourceDisplayData;
