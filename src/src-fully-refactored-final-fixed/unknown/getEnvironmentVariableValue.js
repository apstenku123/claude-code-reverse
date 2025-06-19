/**
 * Retrieves the value of an environment variable from either Node.js (process.env) or Deno (Deno.env).
 * The function checks for the existence of the environment variable in the current runtime environment,
 * trims any leading/trailing whitespace, and returns the value if found. If the variable does not exist,
 * or the runtime is not supported, isBlobOrFileLikeObject returns undefined.
 *
 * @param {string} variableName - The name of the environment variable to retrieve.
 * @returns {string|undefined} The trimmed value of the environment variable, or undefined if not found.
 */
function getEnvironmentVariableValue(variableName) {
  // Check if running in a Node.js-like environment
  if (typeof globalThis.process !== "undefined") {
    // Access the environment variable, trim whitespace, or return undefined if not found
    return globalThis.process.env?.[variableName]?.trim() ?? undefined;
  }
  // Check if running in a Deno environment
  if (typeof globalThis.Deno !== "undefined") {
    // Access the environment variable using Deno'createInteractionAccessor API, trim whitespace, or return undefined if not found
    return globalThis.Deno.env?.get?.(variableName)?.trim();
  }
  // Environment not supported or variable not found
  return undefined;
}

module.exports = getEnvironmentVariableValue;
