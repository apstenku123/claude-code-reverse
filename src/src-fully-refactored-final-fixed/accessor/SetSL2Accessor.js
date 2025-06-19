/**
 * SetSL2Accessor is a constructor function that initializes accessor configuration for SL2 rules.
 * It sets up internal arrays for keeping and removing rules, as well as default and blank rule replacements.
 *
 * @constructor
 * @param {Object} options - Configuration options for the accessor.
 * @param {Object} options.rules - An object containing rule definitions.
 * @param {*} options.blankReplacement - Replacement value for blank rules.
 * @param {*} options.keepReplacement - Replacement value for kept rules.
 * @param {*} options.defaultReplacement - Replacement value for default rules.
 */
function SetSL2Accessor(options) {
  // Store the provided options for later use
  this.options = options;

  // Arrays to keep track of rules to keep and remove
  this.keepRules = [];
  this.removeRules = [];

  // Rule for blank replacements
  this.blankRule = {
    replacement: options.blankReplacement
  };

  // Replacement value for kept rules
  this.keepReplacement = options.keepReplacement;

  // Rule for default replacements
  this.defaultRule = {
    replacement: options.defaultReplacement
  };

  // Array to store all rule definitions
  this.rulesArray = [];

  // Populate rulesArray with each rule from the options.rules object
  for (const ruleKey in options.rules) {
    if (Object.prototype.hasOwnProperty.call(options.rules, ruleKey)) {
      this.rulesArray.push(options.rules[ruleKey]);
    }
  }
}

module.exports = SetSL2Accessor;