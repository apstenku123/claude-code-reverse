/**
 * Returns the selected tool and its usage details based on the current observable and subscription.
 * Utilizes React'createInteractionAccessor useMemo to optimize performance by memoizing the result unless dependencies change.
 *
 * @param {any} sourceObservable - The observable or data source to extract tool usage from.
 * @param {Array<{name: string, ...}>} toolList - Array of tool objects to search for a match.
 * @param {any} subscription - The subscription or context used to extract tool usage.
 * @returns {{ tool: object, toolUse: object } | null} - An object containing the matched tool and its usage, or null if not found.
 */
function useSelectedToolWithUsage(sourceObservable, toolList, subscription) {
  return cN2.useMemo(() => {
    // Extract tool usage details from the observable and subscription
    const toolUsage = findToolUseContentById(sourceObservable, subscription);
    if (!toolUsage) return null;

    // Find the tool in the list that matches the usage by name
    const matchedTool = toolList.find(tool => tool.name === toolUsage.name);
    if (!matchedTool) return null;

    // Return both the matched tool and its usage details
    return {
      tool: matchedTool,
      toolUse: toolUsage
    };
  }, [sourceObservable, subscription, toolList]);
}

module.exports = useSelectedToolWithUsage;