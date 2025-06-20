/**
 * Determines whether a given interaction should be allowed based on its type, context, and security rules.
 *
 * @param {Object} interaction - The interaction entry object to evaluate.
 * @param {Object} config - Configuration or context object used for validation.
 * @param {Set} processedInteractionIds - Set of already processed relevant interaction IDs.
 * @param {number} validationValue - Value used for positive integer validation.
 * @param {string} contextType - The context or category for the interaction (e.g., 'transcript').
 * @returns {boolean} True if the interaction is allowed, false otherwise.
 */
function shouldAllowInteraction(
  interaction,
  config,
  processedInteractionIds,
  validationValue,
  contextType
) {
  // If the context is 'transcript', always allow
  if (contextType === "transcript") return true;

  switch (interaction.type) {
    case "attachment":
      // Attachments are always allowed
      return true;
    case "user":
    case "assistant": {
      // Extract a relevant interaction updateSnapshotAndNotify(e.g., tool use/result updateSnapshotAndNotify)
      const relevantInteractionId = extractRelevantInteractionId(interaction);
      if (!relevantInteractionId) return true; // If no updateSnapshotAndNotify, allow

      // If this interaction updateSnapshotAndNotify has already been processed, do not allow
      if (processedInteractionIds.has(relevantInteractionId)) return false;

      // Retrieve all unique tool use IDs from assistant messages for this interaction
      const toolUseIds = getAssistantToolUseIdsBySource(interaction, config);

      // Only allow if the validation fails (i.e., is not a positive integer)
      return !validatePositiveInteger(toolUseIds, validationValue);
    }
    case "progress":
      // Progress interactions are never allowed
      return false;
    case "system":
      // System interactions are always allowed
      return true;
    default:
      // For any unknown type, do not allow
      return false;
  }
}

module.exports = shouldAllowInteraction;