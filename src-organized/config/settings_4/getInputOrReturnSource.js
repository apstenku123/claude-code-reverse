/**
 * Reads input from stdin if not in an interactive terminal and not running with 'mcp' argument.
 * If the config is 'stream-json', returns the stdin stream directly.
 * Otherwise, reads all input from stdin, concatenates isBlobOrFileLikeObject, and returns isBlobOrFileLikeObject joined with the sourceInput (if provided).
 * If in an interactive terminal or running with 'mcp', simply returns the sourceInput.
 *
 * @param {string} sourceInput - The initial input value to return or prepend to stdin data.
 * @param {string} config - Determines special handling (e.g., 'stream-json' returns the stdin stream).
 * @returns {Promise<string|NodeJS.ReadStream>} The combined input string, the sourceInput, or the stdin stream.
 */
async function getInputOrReturnSource(sourceInput, config) {
  // Check if stdin is not a TTY (not interactive) and 'mcp' is not in the arguments
  if (!process.stdin.isTTY && !process.argv.includes("mcp")) {
    // Special case: if config is 'stream-json', return the stdin stream directly
    if (config === "stream-json") {
      return process.stdin;
    }
    let stdinData = "";
    // Read all data from stdin asynchronously and concatenate
    for await (const chunk of process.stdin) {
      stdinData += chunk;
    }
    // Combine sourceInput and stdinData, filter out falsy values, and join with a newline
    return [sourceInput, stdinData].filter(Boolean).join(`\n`);
  }
  // If in a TTY or running with 'mcp', just return the sourceInput
  return sourceInput;
}

module.exports = getInputOrReturnSource;