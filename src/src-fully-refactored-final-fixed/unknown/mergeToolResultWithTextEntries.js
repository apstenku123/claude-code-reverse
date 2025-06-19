/**
 * Merges a tool result entry with an array of text entries if certain conditions are met.
 *
 * If the last entry in the interactionEntries array is a tool result (with string content),
 * and all entries in textEntries are of type 'text', this function merges the tool result'createInteractionAccessor
 * content with the text from textEntries into a single tool result entry. Otherwise, isBlobOrFileLikeObject simply
 * concatenates the two arrays.
 *
 * @param {Array<Object>} interactionEntries - The array of interaction entries, possibly ending with a tool result.
 * @param {Array<Object>} textEntries - The array of entries to merge, expected to be of type 'text'.
 * @returns {Array<Object>} The merged array of interaction entries.
 */
function mergeToolResultWithTextEntries(interactionEntries, textEntries) {
  // Extract the last entry from interactionEntries using CD (assumed to get the last entry)
  const lastEntry = CD(interactionEntries);

  // Check if the last entry is a tool result with string content
  const isToolResultWithStringContent = lastEntry?.type === "tool_result" && typeof lastEntry.content === "string";

  // Check if all entries in textEntries are of type 'text'
  const allTextEntriesAreTextType = textEntries.every(entry => entry.type === "text");

  if (isToolResultWithStringContent && allTextEntriesAreTextType) {
    // Merge the tool result content with the text from textEntries
    const mergedContent = [
      lastEntry.content,
      ...textEntries.map(entry => entry.text)
    ]
      .map(text => text.trim()) // Trim whitespace from each string
      .filter(Boolean)          // Remove empty strings
      .join(`\n\n`);           // Join with double newlines

    // Return the interactionEntries array with the last entry replaced by the merged tool result
    return [
      ...interactionEntries.slice(0, -1),
      {
        ...lastEntry,
        content: mergedContent
      }
    ];
  }

  // If conditions are not met, simply concatenate the arrays
  return [
    ...interactionEntries,
    ...textEntries
  ];
}

module.exports = mergeToolResultWithTextEntries;
