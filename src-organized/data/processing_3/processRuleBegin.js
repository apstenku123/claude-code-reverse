/**
 * Processes the beginning of a rule match, handling callbacks and state updates.
 *
 * @param {Object} matchContext - The context object for the current match.
 * @param {string} matchContext[0] - The matched string at the beginning.
 * @param {Object} matchContext.rule - The rule object containing match configuration and callbacks.
 * @returns {number|string} Returns 0 if the rule specifies returnBegin, otherwise returns the length of the matched string. May return a value from processRegexMatchResult if match is ignored.
 */
function processRuleBegin(matchContext) {
  const matchedString = matchContext[0];
  const rule = matchContext.rule;
  // Create a match state object for this rule
  const matchState = new FO1(rule);
  // Collect any 'before begin' or 'on:begin' callbacks
  const beginCallbacks = [rule.__beforeBegin, rule["on:begin"]];

  // Execute callbacks if present
  for (const callback of beginCallbacks) {
    if (!callback) continue;
    // Call the callback with the match context and match state
    callback(matchContext, matchState);
    // If the match is marked as ignored, return the result of processRegexMatchResult
    if (matchState.isMatchIgnored) return processRegexMatchResult(matchedString);
  }

  // If the rule specifies that the end pattern is the same as the begin, update the end regex
  if (rule && rule.endSameAsBegin) {
    rule.endRe = mm9(matchedString);
  }

  // Handle skipping or including the matched string in the output buffer
  if (rule.skip) {
    d0 += matchedString;
  } else {
    if (rule.excludeBegin) {
      d0 += matchedString;
    }
    // A1 likely resets or prepares some state for the next match
    A1();
    // If not returning or excluding the begin, set the output buffer to the matched string
    if (!rule.returnBegin && !rule.excludeBegin) {
      d0 = matchedString;
    }
  }

  // Finalize the rule processing
  D1(rule);
  // Return 0 if returnBegin is set, otherwise the length of the matched string
  return rule.returnBegin ? 0 : matchedString.length;
}

module.exports = processRuleBegin;