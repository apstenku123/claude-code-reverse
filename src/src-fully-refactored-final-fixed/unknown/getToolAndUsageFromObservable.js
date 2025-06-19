/**
 * Retrieves the tool and its usage details based on the provided observable and subscription.
 * Utilizes React'createInteractionAccessor useMemo to memoize the result for performance optimization.
 *
 * @param {any} sourceObservable - The observable or data source to extract tool usage from.
 * @param {Array<{name: string, ...}>} toolConfigList - Array of tool configuration objects, each with a 'name' property.
 * @param {any} subscription - The subscription or context used to extract tool usage.
 * @returns {{ tool: object, toolUse: object } | null} An object containing the matched tool and its usage, or null if not found.
 */
function getToolAndUsageFromObservable(sourceObservable, toolConfigList, subscription) {
  return cN2.useMemo(() => {
    // Extract tool usage information from the observable and subscription
    const toolUsage = findToolUseContentById(sourceObservable, subscription);
    if (!toolUsage) return null;

    // Find the tool configuration that matches the tool usage by name
    const matchedTool = toolConfigList.find(tool => tool.name === toolUsage.name);
    if (!matchedTool) return null;

    // Return both the matched tool and its usage details
    return {
      tool: matchedTool,
      toolUse: toolUsage
    };
  }, [sourceObservable, subscription, toolConfigList]);
}

module.exports = getToolAndUsageFromObservable;