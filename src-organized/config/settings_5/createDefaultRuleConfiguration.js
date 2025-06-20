/**
 * Creates a default configuration object for rule evaluation.
 *
 * This function returns an object containing default settings for rule evaluation,
 * including the mode, a set of additional working directories, and objects for
 * always-allow and always-deny rules. This can be used as a starting point for
 * configuring rule-based systems or access control mechanisms.
 *
 * @returns {Object} Default rule configuration object with the following properties:
 *   - mode: {string} The default mode for rule evaluation.
 *   - additionalWorkingDirectories: {Set<string>} a set of additional directories to consider.
 *   - alwaysAllowRules: {Object} Rules that are always allowed.
 *   - alwaysDenyRules: {Object} Rules that are always denied.
 */
const createDefaultRuleConfiguration = () => {
  return {
    // The default mode for rule evaluation
    mode: "default",

    // Set of additional working directories (empty by default)
    additionalWorkingDirectories: new Set(),

    // Object containing rules that are always allowed (empty by default)
    alwaysAllowRules: {},

    // Object containing rules that are always denied (empty by default)
    alwaysDenyRules: {}
  };
};

module.exports = createDefaultRuleConfiguration;
