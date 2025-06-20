/**
 * Creates a structured result object for an interaction process.
 *
 * @param {any} interactionEntriesResult - Result from processing interaction entries (from processInteractionEntries).
 * @param {any} interactionConfig - Configuration or source information for the interaction.
 * @param {any} interactionDuration - Duration of the interaction or subscription.
 * @param {any} uiActionTransaction - Result from starting a UI action click transaction (from startUiActionClickTransaction).
 * @param {any} interactionSourceUrl - The URL source of the interaction.
 * @param {any} interactionWarnings - Any warnings generated during the interaction process.
 * @returns {object} Structured result object containing details about the interaction.
 */
const createInteractionResult = (
  interactionEntriesResult,
  interactionConfig,
  interactionDuration,
  uiActionTransaction,
  interactionSourceUrl,
  interactionWarnings
) => {
  return {
    duration: interactionDuration, // Duration of the interaction
    source: interactionConfig,     // Source or configuration details
    success: interactionEntriesResult, // Result of processing interaction entries
    error: uiActionTransaction,    // Transaction result or error
    sourceUrl: interactionSourceUrl, // URL source of the interaction
    warnings: interactionWarnings    // Any warnings encountered
  };
};

module.exports = createInteractionResult;
