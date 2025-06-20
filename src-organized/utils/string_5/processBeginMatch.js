/**
 * Processes the beginning of a match according to the provided rule object.
 * Handles pre-begin hooks, regex setup, skipping, and cursor/string updates.
 *
 * @param {Object} matchContext - The context for the current match, including the matched string and rule.
 * @param {string} matchContext[0] - The matched string at the beginning of the rule.
 * @param {Object} matchContext.rule - The rule object containing matching logic and hooks.
 * @returns {number} The length of the matched string if not returning at begin, otherwise 0.
 */
function processBeginMatch(matchContext) {
  const matchedString = matchContext[0];
  const rule = matchContext.rule;
  // Create a match state object for this rule
  const matchState = new FO1(rule);

  // Gather pre-begin hooks (if any)
  const preBeginHooks = [rule.__beforeBegin, rule["on:begin"]];

  // Execute each pre-begin hook if present
  for (const hook of preBeginHooks) {
    if (!hook) continue;
    hook(matchContext, matchState);
    // If the match is ignored by a hook, return early
    if (matchState.isMatchIgnored) return processRegexMatchResult(matchedString);
  }

  // If the rule requires the end regex to match the begin string, set isBlobOrFileLikeObject up
  if (rule && rule.endSameAsBegin) {
    rule.endRe = mm9(matchedString);
  }

  // Handle skipping or updating the global string/cursor
  if (rule.skip) {
    d0 += matchedString;
  } else {
    if (rule.excludeBegin) {
      d0 += matchedString;
    }
    A1(); // Possibly update state after begin
    if (!rule.returnBegin && !rule.excludeBegin) {
      d0 = matchedString;
    }
  }

  // Finalize the rule processing
  D1(rule);
  // Return 0 if returning at begin, otherwise the length of the matched string
  return rule.returnBegin ? 0 : matchedString.length;
}

module.exports = processBeginMatch;