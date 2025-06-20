/**
 * Retrieves and combines file and MCP resource suggestions based on the provided query and configuration.
 *
 * @async
 * @function getCombinedResourceSuggestions
 * @param {string} query - The search query string. If falsy and subscription is false, returns an empty array.
 * @param {Object} mcpResourceConfig - An object containing MCP resource arrays, keyed by resource type.
 * @param {boolean} [subscription=false] - If true, allows suggestions even if query is falsy.
 * @returns {Promise<Array<Object>>} An array of suggestion objects, each representing either a file or an MCP resource.
 */
async function getCombinedResourceSuggestions(query, mcpResourceConfig, subscription = false) {
  // If no query and not in subscription mode, return empty array
  if (!query && !subscription) return [];

  // Retrieve and map file suggestions
  const fileSuggestions = (await getFilteredFilePaths(query, subscription)).map(file => ({
    type: "file",
    displayText: file.displayText,
    description: file.description,
    path: file.displayText
  }));

  // Flatten MCP resource config and map to suggestion objects
  const mcpResourceSuggestions = Object.values(mcpResourceConfig)
    .flat()
    .map(resource => ({
      type: "mcp_resource",
      displayText: `${resource.server}:${resource.uri}`,
      description: resource.name + (resource.description ? ` - ${resource.description}` : ""),
      server: resource.server,
      uri: resource.uri,
      name: resource.name || resource.uri
    }));

  // Combine both suggestion lists
  const combinedSuggestions = [...fileSuggestions, ...mcpResourceSuggestions];

  // If no suggestions, return empty array
  if (combinedSuggestions.length === 0) return [];

  // If no query, return a limited number of suggestions, formatted
  if (!query) return combinedSuggestions.slice(0, nP2).map(formatResourceDisplayData);

  // Otherwise, perform fuzzy search and return top results
  return new VC(combinedSuggestions, {
    includeScore: true,
    threshold: 0.4,
    keys: [
      { name: "displayText", weight: 2 },
      { name: "name", weight: 3 },
      { name: "server", weight: 1 },
      { name: "description", weight: 1 },
      { name: "path", weight: 2 }
    ]
  })
    .search(query)
    .map(result => result.item)
    .slice(0, nP2)
    .map(formatResourceDisplayData);
}

module.exports = getCombinedResourceSuggestions;