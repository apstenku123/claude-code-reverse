/**
 * Parses an array of interaction entries and organizes them into a structured result.
 * Handles server tool usage, web search tool results, and text entries, aggregating them into a results array.
 *
 * @param {Array<Object>} interactionEntries - The list of interaction entry objects to process.
 * @param {string} query - The original query string associated with these interactions.
 * @param {number} durationSeconds - The duration in seconds for the interaction session.
 * @returns {Object} An object containing the query, the processed results, and the session duration.
 */
function parseInteractionEntries(interactionEntries, query, durationSeconds) {
  const results = [];
  let textBuffer = "";
  let isFirstTextBlock = true;

  for (const entry of interactionEntries) {
    if (entry.type === "server_tool_use") {
      // If this is the first server tool use, flush any buffered text
      if (isFirstTextBlock) {
        isFirstTextBlock = false;
        if (textBuffer.trim().length > 0) {
          results.push(textBuffer.trim());
        }
        textBuffer = "";
      }
      continue;
    }

    if (entry.type === "web_search_tool_result") {
      // Handle web search tool results
      if (!Array.isArray(entry.content)) {
        const errorMessage = `Web search error: ${entry.content.error_code}`;
        reportErrorIfAllowed(new Error(errorMessage)); // External error handler
        results.push(errorMessage);
        continue;
      }
      // Map web search results to a simplified structure
      const webResults = entry.content.map(result => ({
        title: result.title,
        url: result.url
      }));
      results.push({
        tool_use_id: entry.tool_use_id,
        content: webResults
      });
      continue;
    }

    if (entry.type === "text") {
      // Aggregate consecutive text blocks
      if (isFirstTextBlock) {
        textBuffer += entry.text;
      } else {
        isFirstTextBlock = true;
        textBuffer = entry.text;
      }
    }
  }

  // Push any remaining buffered text
  if (textBuffer.length > 0) {
    results.push(textBuffer.trim());
  }

  return {
    query,
    results,
    durationSeconds
  };
}

module.exports = parseInteractionEntries;