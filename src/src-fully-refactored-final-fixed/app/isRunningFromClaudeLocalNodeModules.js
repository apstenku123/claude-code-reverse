/**
 * Checks if the current Node.js process is being executed from the '/.claude/local/node_modules/' directory.
 *
 * This can be useful for determining if the script is running from a local development environment or a specific installed package path.
 *
 * @returns {boolean} Returns true if the process is running from '/.claude/local/node_modules/', otherwise false.
 */
function isRunningFromClaudeLocalNodeModules() {
  // process.argv[1] contains the path of the executed script
  // If undefined, default to an empty string to avoid errors
  const executedScriptPath = process.argv[1] || "";

  // Check if the executed script path includes the specific directory
  return executedScriptPath.includes("/.claude/local/node_modules/");
}

module.exports = isRunningFromClaudeLocalNodeModules;
