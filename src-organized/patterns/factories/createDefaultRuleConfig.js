/**
 * Creates a default rule configuration object for use in rule-based systems.
 *
 * @returns {Object} An object containing default mode, working directories, and rule sets.
 * @property {string} mode - The current mode of operation (default: "default").
 * @property {Set<string>} additionalWorkingDirectories - a set of additional working directories.
 * @property {Object} alwaysAllowRules - Rules that are always allowed.
 * @property {Object} alwaysDenyRules - Rules that are always denied.
 */
function createDefaultRuleConfig() {
  return {
    mode: "default", // Default operation mode
    additionalWorkingDirectories: new Set(), // Set of extra working directories
    alwaysAllowRules: {}, // Rules that are always allowed
    alwaysDenyRules: {}   // Rules that are always denied
  };
}

module.exports = createDefaultRuleConfig;
