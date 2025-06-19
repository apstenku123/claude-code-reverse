/**
 * Determines if the provided object resembles a Node.js process-like object.
 *
 * Checks for the presence and types of common process methods and properties:
 * - removeListener (function)
 * - emit (function)
 * - reallyExit (function)
 * - listeners (function)
 * - kill (function)
 * - pid (number)
 * - on (function)
 *
 * @param {object} possibleProcess - The object to check for process-like characteristics.
 * @returns {boolean} True if the object matches the expected process-like interface, false otherwise.
 */
const isProcessLikeObject = (possibleProcess) => {
  // Ensure the value is a non-null object
  if (!possibleProcess || typeof possibleProcess !== "object") {
    return false;
  }

  // Check for required methods and properties
  const hasRemoveListener = typeof possibleProcess.removeListener === "function";
  const hasEmit = typeof possibleProcess.emit === "function";
  const hasReallyExit = typeof possibleProcess.reallyExit === "function";
  const hasListeners = typeof possibleProcess.listeners === "function";
  const hasKill = typeof possibleProcess.kill === "function";
  const hasPid = typeof possibleProcess.pid === "number";
  const hasOn = typeof possibleProcess.on === "function";

  // Return true only if all checks pass
  return (
    hasRemoveListener &&
    hasEmit &&
    hasReallyExit &&
    hasListeners &&
    hasKill &&
    hasPid &&
    hasOn
  );
};

module.exports = isProcessLikeObject;
