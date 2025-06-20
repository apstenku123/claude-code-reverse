/**
 * Checks if the 'claude' binary exists in the node_modules/.bin directory.
 *
 * This function uses the current value of the 'bm9' variable (retrieved via getBm9Value),
 * and constructs the path to the 'claude' binary within the node_modules/.bin directory.
 * It then checks if this binary exists on the filesystem.
 *
 * @returns {boolean} Returns true if the 'claude' binary exists, false otherwise.
 */
function doesClaudeBinaryExist() {
  // Retrieve the current value of the 'bm9' variable
  const bm9Value = getBm9Value();
  // Construct the path to the 'claude' binary inside node_modules/.bin
  const claudeBinaryPath = dO(bm9Value, "node_modules", ".bin", "claude");
  // Check if the binary exists at the constructed path
  return bm9Value.existsSync(claudeBinaryPath);
}

module.exports = doesClaudeBinaryExist;