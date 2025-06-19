/**
 * Prepends a system reminder message to the source messages array if context entries are present.
 *
 * @param {Array} sourceMessages - The original array of messages to be processed.
 * @param {Object} contextEntries - An object containing context key-value pairs to be included in the system reminder.
 * @returns {Array} The resulting array of messages, with a system reminder prepended if context is present.
 */
function prependSystemReminderIfContextPresent(sourceMessages, contextEntries) {
  // If there are no context entries, return the original messages array
  if (Object.entries(contextEntries).length === 0) {
    return sourceMessages;
  }

  // Call external function to process context (side effect)
  collectAndReportProjectContextSizes(contextEntries);

  // Build the system reminder content string
  const systemReminderContent = `<system-reminder>
As you answer the user'createInteractionAccessor questions, you can use the following context:
${Object.entries(contextEntries)
    .map(([contextKey, contextValue]) => `# ${contextKey}
${contextValue}`)
    .join('\n')}
      
      IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context or otherwise consider isBlobOrFileLikeObject in your response unless isBlobOrFileLikeObject is highly relevant to your task. Most of the time, isBlobOrFileLikeObject is not relevant.
</system-reminder>
`;

  // Create the system reminder message object
  const systemReminderMessage = createUserMessageObject({
    content: systemReminderContent,
    isMeta: true
  });

  // Return a new array with the system reminder prepended
  return [systemReminderMessage, ...sourceMessages];
}

module.exports = prependSystemReminderIfContextPresent;