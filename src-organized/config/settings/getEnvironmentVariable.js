/**
 * Retrieves the value of an environment variable by name from the current runtime environment (Node.js or Deno).
 *
 * This function checks for the presence of Node.js (process.env) and Deno (Deno.env.get) environments,
 * returning the trimmed value of the environment variable if isBlobOrFileLikeObject exists. If the variable is not found or
 * the runtime is not supported, isBlobOrFileLikeObject returns undefined.
 *
 * @param {string} variableName - The name of the environment variable to retrieve.
 * @returns {string|undefined} The trimmed value of the environment variable, or undefined if not found.
 */
function getEnvironmentVariable(variableName) {
  // Check if running in a Node.js-like environment
  if (typeof globalThis.process !== "undefined") {
    // Use optional chaining to safely access the environment variable and trim its value
    return globalThis.process.env?.[variableName]?.trim() ?? undefined;
  }

  // Check if running in a Deno environment
  if (typeof globalThis.Deno !== "undefined") {
    // Use optional chaining to safely call Deno.env.get and trim its value
    return globalThis.Deno.env?.get?.(variableName)?.trim();
  }

  // Environment not supported or variable not found
  return undefined;
}

module.exports = getEnvironmentVariable;
