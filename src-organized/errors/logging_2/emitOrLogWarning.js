/**
 * Emits a warning using VM1.emitWarning if available, otherwise logs the warning to the console.
 *
 * @param {string} warningMessage - The warning message to be emitted or logged.
 * @param {string} warningType - The type or category of the warning.
 * @param {string} warningCode - The warning code or identifier.
 * @param {any} additionalInfo - Additional information to pass to the warning emitter.
 * @returns {void}
 */
const emitOrLogWarning = (warningMessage, warningType, warningCode, additionalInfo) => {
  // Check if VM1.emitWarning exists and is a function
  if (typeof VM1.emitWarning === "function") {
    // Use VM1'createInteractionAccessor emitWarning method
    VM1.emitWarning(warningMessage, warningType, warningCode, additionalInfo);
  } else {
    // Fallback: log the warning to the console
    console.error(`[${warningCode}] ${warningType}: ${warningMessage}`);
  }
};

module.exports = emitOrLogWarning;
