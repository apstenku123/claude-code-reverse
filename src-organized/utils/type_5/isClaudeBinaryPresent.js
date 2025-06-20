/**
 * Checks if the 'claude' binary exists in the node_modules/.bin directory.
 *
 * This function uses the current value of the external variable 'bm9' (retrieved via getBm9Value),
 * and checks for the existence of the 'claude' binary in the node_modules/.bin directory relative to that path.
 *
 * @returns {boolean} True if the 'claude' binary exists in node_modules/.bin, false otherwise.
 */
function isClaudeBinaryPresent() {
  // Retrieve the current value of the external variable 'bm9'
  const bm9Value = getBm9Value();

  // Build the path to the 'claude' binary inside node_modules/.bin
  const claudeBinaryPath = dO(mO, "node_modules", ".bin", "claude");

  // Check if the 'claude' binary exists at the constructed path
  return bm9Value.existsSync(claudeBinaryPath);
}

module.exports = isClaudeBinaryPresent;