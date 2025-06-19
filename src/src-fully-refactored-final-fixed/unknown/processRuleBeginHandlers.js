/**
 * Processes the 'begin' handlers for a parsing rule, manages state, and returns the appropriate match length or result.
 *
 * @param {Object} matchContext - The context object for the current match. Expected to have:
 *   - [0]: {string} matchedText - The matched text at the beginning of the rule
 *   - rule: {Object} ruleDefinition - The rule definition object
 * @returns {number|string} Returns 0 if the rule specifies returnBegin, otherwise the length of the matched text, or a special value if match is ignored.
 */
function processRuleBeginHandlers(matchContext) {
  const matchedText = matchContext[0];
  const ruleDefinition = matchContext.rule;
  const ruleContext = new FO1(ruleDefinition);

  // Gather any 'before begin' or 'on:begin' hooks for the rule
  const beginHandlers = [ruleDefinition.__beforeBegin, ruleDefinition["on:begin"]];

  // Execute each begin handler if present
  for (const handler of beginHandlers) {
    if (!handler) continue;
    handler(matchContext, ruleContext);
    // If the handler sets isMatchIgnored, return special result
    if (ruleContext.isMatchIgnored) return processRegexMatchResult(matchedText);
  }

  // If the rule specifies that the end pattern is the same as the begin pattern, update end regex
  if (ruleDefinition && ruleDefinition.endSameAsBegin) {
    ruleDefinition.endRe = mm9(matchedText);
  }

  // Manage global state variable 'd0' based on rule options
  if (ruleDefinition.skip) {
    d0 += matchedText;
  } else {
    if (ruleDefinition.excludeBegin) {
      d0 += matchedText;
    }
    A1(); // Reset or update parser state as needed
    // If not returning or excluding begin, reset d0 to matchedText
    if (!ruleDefinition.returnBegin && !ruleDefinition.excludeBegin) {
      d0 = matchedText;
    }
  }

  // Finalize rule processing
  D1(ruleDefinition);

  // Return 0 if rule specifies returnBegin, else length of matchedText
  return ruleDefinition.returnBegin ? 0 : matchedText.length;
}

module.exports = processRuleBeginHandlers;