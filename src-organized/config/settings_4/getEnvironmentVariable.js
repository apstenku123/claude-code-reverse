/**
 * Retrieves the value of an environment variable from either Node.js (process.env) or Deno (Deno.env).
 * The value is trimmed of whitespace if found. Returns undefined if the variable is not set or the environment is unsupported.
 *
 * @param {string} variableName - The name of the environment variable to retrieve.
 * @returns {string|undefined} The trimmed value of the environment variable, or undefined if not found.
 */
function getEnvironmentVariable(variableName) {
  // Check if running in a Node.js-like environment
  if (typeof globalThis.process !== "undefined") {
    // Access the environment variable, trim whitespace, or return undefined if not set
    return globalThis.process.env?.[variableName]?.trim() ?? undefined;
  }

  // Check if running in a Deno environment
  if (typeof globalThis.Deno !== "undefined") {
    // Use Deno.env.get to retrieve the variable, trim whitespace, or return undefined if not set
    return globalThis.Deno.env?.get?.(variableName)?.trim();
  }

  // Environment not supported; return undefined
  return undefined;
}

module.exports = getEnvironmentVariable;
