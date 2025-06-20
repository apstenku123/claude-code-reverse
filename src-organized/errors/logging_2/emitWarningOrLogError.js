/**
 * Emits a warning using the VM1.emitWarning method if available, otherwise logs an error to the console.
 *
 * @param {string} warningMessage - The warning message to emit or log.
 * @param {string} warningType - The type or category of the warning.
 * @param {string} warningCode - The warning code or identifier.
 * @param {any} additionalInfo - Additional information to pass to the warning emitter.
 * @returns {void}
 */
const emitWarningOrLogError = (warningMessage, warningType, warningCode, additionalInfo) => {
  // Check if VM1.emitWarning exists and is a function
  if (typeof VM1.emitWarning === "function") {
    // Use VM1.emitWarning to emit the warning
    VM1.emitWarning(warningMessage, warningType, warningCode, additionalInfo);
  } else {
    // Fallback: log the warning as an error to the console
    console.error(`[${warningCode}] ${warningType}: ${warningMessage}`);
  }
};

module.exports = emitWarningOrLogError;
