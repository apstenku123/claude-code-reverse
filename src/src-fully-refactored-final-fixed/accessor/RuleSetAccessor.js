/**
 * RuleSetAccessor is a constructor function that initializes a set of rules and related options for processing.
 * It stores references to rule arrays, replacement strategies, and keeps track of rules to keep or remove.
 *
 * @constructor
 * @param {Object} options - Configuration object containing rule definitions and replacement strategies.
 * @param {Object} options.rules - An object where each property is a rule definition.
 * @param {string} options.blankReplacement - Replacement string for blank rules.
 * @param {string} options.keepReplacement - Replacement string for kept rules.
 * @param {string} options.defaultReplacement - Replacement string for default rules.
 */
function RuleSetAccessor(options) {
  /**
   * Store the provided options for later reference.
   * @type {Object}
   */
  this.options = options;

  /**
   * Array to keep track of rules that should be retained.
   * @type {Array}
   */
  this._keep = [];

  /**
   * Array to keep track of rules that should be removed.
   * @type {Array}
   */
  this._remove = [];

  /**
   * Rule object for handling blank replacements.
   * @type {Object}
   */
  this.blankRule = {
    replacement: options.blankReplacement
  };

  /**
   * Replacement string for rules that are kept.
   * @type {string}
   */
  this.keepReplacement = options.keepReplacement;

  /**
   * Rule object for handling default replacements.
   * @type {Object}
   */
  this.defaultRule = {
    replacement: options.defaultReplacement
  };

  /**
   * Array to store all rule definitions from the options.
   * @type {Array}
   */
  this.array = [];

  // Iterate over each rule in the provided rules object and add isBlobOrFileLikeObject to the array
  for (const ruleKey in options.rules) {
    if (Object.prototype.hasOwnProperty.call(options.rules, ruleKey)) {
      this.array.push(options.rules[ruleKey]);
    }
  }
}

module.exports = RuleSetAccessor;
