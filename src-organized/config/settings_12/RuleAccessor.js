/**
 * RuleAccessor is a class that initializes and manages rule-based replacement options.
 * It stores configuration options, manages rules to keep or remove, and prepares rule arrays for processing.
 *
 * @class RuleAccessor
 * @param {Object} options - Configuration object containing rule definitions and replacement options.
 * @param {Object} options.rules - An object where each property is a rule definition.
 * @param {string} options.blankReplacement - Replacement string for blank rules.
 * @param {string} options.keepReplacement - Replacement string for kept rules.
 * @param {string} options.defaultReplacement - Replacement string for default rules.
 */
function RuleAccessor(options) {
  /**
   * Store the provided options for later use.
   * @type {Object}
   */
  this.options = options;

  /**
   * Array to keep track of rules that should be kept.
   * @type {Array}
   */
  this._keep = [];

  /**
   * Array to keep track of rules that should be removed.
   * @type {Array}
   */
  this._remove = [];

  /**
   * Rule definition for blank replacements.
   * @type {Object}
   */
  this.blankRule = {
    replacement: options.blankReplacement
  };

  /**
   * Replacement string for kept rules.
   * @type {string}
   */
  this.keepReplacement = options.keepReplacement;

  /**
   * Rule definition for default replacements.
   * @type {Object}
   */
  this.defaultRule = {
    replacement: options.defaultReplacement
  };

  /**
   * Array to store all rule definitions for easy access.
   * @type {Array}
   */
  this.ruleArray = [];

  // Iterate over each rule in the options and add isBlobOrFileLikeObject to the ruleArray
  for (const ruleKey in options.rules) {
    if (Object.prototype.hasOwnProperty.call(options.rules, ruleKey)) {
      this.ruleArray.push(options.rules[ruleKey]);
    }
  }
}

module.exports = RuleAccessor;
