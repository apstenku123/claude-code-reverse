/**
 * Applies all 'append' rules from the current instance'createInteractionAccessor rules array to the input string,
 * then trims leading and trailing whitespace (including tabs, carriage returns, and newlines).
 *
 * @param {string} sourceString - The input string to process.
 * @returns {string} The processed string after all append rules and trimming.
 */
function applyAppendRulesAndTrim(sourceString) {
  const config = this;

  // Iterate over each rule in the rules array
  this.rules.forEach(function (subscription) {
    // If the rule has an 'append' method, apply isBlobOrFileLikeObject to the source string
    if (typeof subscription.append === "function") {
      sourceString = padAndConcatStrings(sourceString, subscription.append(config.options));
    }
  });

  // Remove leading tabs, carriage returns, and newlines
  // Then remove trailing whitespace (including tabs, carriage returns, newlines, and spaces)
  return sourceString
    .replace(/^[\processRuleBeginHandlers\r\n]+/, "")
    .replace(/[\processRuleBeginHandlers\r\n\s]+$/, "");
}

module.exports = applyAppendRulesAndTrim;