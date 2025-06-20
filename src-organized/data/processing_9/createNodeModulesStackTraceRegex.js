/**
 * Generates a regular expression to match stack trace lines from node_modules for specific modules.
 *
 * @param {string[]} moduleNames - An array of module names to match within node_modules stack trace entries.
 * @returns {RegExp} a regular expression that matches stack trace lines for the specified modules in node_modules.
 */
function createNodeModulesStackTraceRegex(moduleNames) {
  // If no module names are provided, return an empty array (no regex)
  if (moduleNames.length === 0) return [];

  // Transform each module name using Iy4 (assumed to escape or process the name for regex)
  const processedModuleNames = moduleNames.map(moduleName => Iy4(moduleName));

  // Join the processed module names with '|' for regex alternation
  // Construct a regex to match stack trace lines from node_modules for these modules
  const stackTraceRegex = new RegExp(
    `[/\]node_modules[/\](?:${processedModuleNames.join("|")})[/\][^:]+:\\d+:\\d+`
  );

  return stackTraceRegex;
}

module.exports = createNodeModulesStackTraceRegex;