/**
 * Determines whether a given interaction entry should be allowed based on its type, associated IDs, and subscription state.
 *
 * @param {Object} interactionEntry - The interaction entry object to evaluate.
 * @param {Object} config - Configuration or context object used for further validation.
 * @param {Set} subscription - Set of IDs representing current subscriptions.
 * @param {number} positiveIntegerValue - Value to be validated as a positive integer.
 * @param {string} entryCategory - Category of the entry (e.g., 'transcript', 'attachment', etc.).
 * @returns {boolean} - Returns true if the interaction entry should be allowed, false otherwise.
 */
function shouldAllowInteractionEntry(
  interactionEntry,
  config,
  subscription,
  positiveIntegerValue,
  entryCategory
) {
  // Special case: if the entry category is 'transcript', always allow
  if (entryCategory === "transcript") return true;

  switch (interactionEntry.type) {
    case "attachment":
      // Always allow attachments
      return true;
    case "user":
    case "assistant": {
      // Extract a relevant interaction or tool-use updateSnapshotAndNotify from the entry
      const relevantInteractionId = extractRelevantInteractionId(interactionEntry);
      if (!relevantInteractionId) return true; // Allow if no relevant updateSnapshotAndNotify found
      if (subscription.has(relevantInteractionId)) return false; // Disallow if already subscribed
      // Retrieve all unique tool_use IDs from assistant messages
      const toolUseIds = getToolUseIdsFromAssistantMessages(interactionEntry, config);
      // Allow only if the positive integer value is NOT present in the toolUseIds
      return !validatePositiveInteger(toolUseIds, positiveIntegerValue);
    }
    case "progress":
      // Never allow progress entries
      return false;
    case "system":
      // Always allow system entries
      return true;
    default:
      // For any unknown type, do not allow
      return false;
  }
}

module.exports = shouldAllowInteractionEntry;