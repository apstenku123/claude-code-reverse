/**
 * Checks if the current Node.js process is running from a local node_modules directory.
 *
 * This function inspects the process.argv array to determine if the script being executed
 * is located within the '/.claude/local/node_modules/' path. This can be useful for
 * distinguishing between globally and locally installed CLI tools.
 *
 * @returns {boolean} True if the script is running from '/.claude/local/node_modules/', otherwise false.
 */
function isRunningFromLocalNodeModules() {
  // process.argv[1] contains the path to the executed script, or undefined if not present
  const executedScriptPath = process.argv[1] || "";
  // Check if the executed script path includes the specific local node_modules directory
  return executedScriptPath.includes("/.claude/local/node_modules/");
}

module.exports = isRunningFromLocalNodeModules;