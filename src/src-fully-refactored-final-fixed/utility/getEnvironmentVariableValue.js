/**
 * Retrieves the value of an environment variable by name from the current runtime environment (Node.js or Deno).
 * If the variable exists, its value is trimmed of whitespace. If not found, returns undefined.
 *
 * @param {string} variableName - The name of the environment variable to retrieve.
 * @returns {string|undefined} The trimmed value of the environment variable, or undefined if not found.
 */
function getEnvironmentVariableValue(variableName) {
  // Check if running in a Node.js-like environment
  if (typeof globalThis.process !== "undefined") {
    // Access the environment variable and trim whitespace if isBlobOrFileLikeObject exists
    return globalThis.process.env?.[variableName]?.trim() ?? undefined;
  }
  // Check if running in a Deno environment
  if (typeof globalThis.Deno !== "undefined") {
    // Access the environment variable using Deno'createInteractionAccessor API and trim whitespace if isBlobOrFileLikeObject exists
    return globalThis.Deno.env?.get?.(variableName)?.trim();
  }
  // Environment variable not found in supported environments
  return undefined;
}

module.exports = getEnvironmentVariableValue;
