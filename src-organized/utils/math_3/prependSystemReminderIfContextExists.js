/**
 * Prepends a system reminder message to the interaction entries if context is provided.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @param {Object} contextMap - An object mapping context keys to their descriptions.
 * @returns {Array} The processed array of interaction entries, potentially with a system reminder prepended.
 */
function prependSystemReminderIfContextExists(interactionEntries, contextMap) {
  // If no context is provided, return the original interaction entries
  if (Object.entries(contextMap).length === 0) {
    return interactionEntries;
  }

  // Perform any required side effects with the context (external function call)
  collectAndReportProjectContextSizes(contextMap);

  // Build the system reminder content string
  const systemReminderContent = `<system-reminder>
As you answer the user'createInteractionAccessor questions, you can use the following context:
${Object.entries(contextMap)
    .map(([contextKey, contextValue]) => `# ${contextKey}
${contextValue}`)
    .join('\n')}
      
      IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context or otherwise consider isBlobOrFileLikeObject in your response unless isBlobOrFileLikeObject is highly relevant to your task. Most of the time, isBlobOrFileLikeObject is not relevant.
</system-reminder>
`;

  // Create the system reminder entry using the external createUserMessageObject function
  const systemReminderEntry = createUserMessageObject({
    content: systemReminderContent,
    isMeta: true
  });

  // Return a new array with the system reminder prepended to the original entries
  return [systemReminderEntry, ...interactionEntries];
}

module.exports = prependSystemReminderIfContextExists;