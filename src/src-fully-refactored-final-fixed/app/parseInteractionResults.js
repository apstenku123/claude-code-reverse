/**
 * Parses a sequence of interaction entries and extracts results for reporting.
 * Handles different entry types: 'server_tool_use', 'web_search_tool_result', and 'text'.
 * Aggregates text, handles tool use boundaries, and collects web search results.
 *
 * @param {Array<Object>} interactionEntries - Array of interaction entry objects to process.
 * @param {string} query - The original query string associated with these interactions.
 * @param {number} durationSeconds - The duration in seconds for the interaction sequence.
 * @returns {Object} An object containing the query, aggregated results, and duration.
 */
function parseInteractionResults(interactionEntries, query, durationSeconds) {
  const results = [];
  let currentText = "";
  let isFirstTextBlock = true;

  for (const entry of interactionEntries) {
    if (entry.type === "server_tool_use") {
      // On encountering a tool use, push any accumulated text (if not first block)
      if (isFirstTextBlock) {
        isFirstTextBlock = false;
        if (currentText.trim().length > 0) {
          results.push(currentText.trim());
        }
        currentText = "";
      }
      continue;
    }

    if (entry.type === "web_search_tool_result") {
      // If content is not an array, treat as an error
      if (!Array.isArray(entry.content)) {
        const errorMessage = `Web search error: ${entry.content.error_code}`;
        reportErrorIfAllowed(new Error(errorMessage)); // External error handler
        results.push(errorMessage);
        continue;
      }
      // Map web search results to simplified objects
      const searchResults = entry.content.map(result => ({
        title: result.title,
        url: result.url
      }));
      results.push({
        tool_use_id: entry.tool_use_id,
        content: searchResults
      });
      continue;
    }

    if (entry.type === "text") {
      // Accumulate or reset text blocks based on tool use boundaries
      if (isFirstTextBlock) {
        currentText += entry.text;
      } else {
        isFirstTextBlock = true;
        currentText = entry.text;
      }
    }
  }

  // Push any remaining text
  if (currentText.length > 0) {
    results.push(currentText.trim());
  }

  return {
    query,
    results,
    durationSeconds
  };
}

module.exports = parseInteractionResults;