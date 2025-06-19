/**
 * Processes a grammar rule application within a parsing context.
 *
 * This function handles the application of a grammar rule (GRA) to the current parsing state.
 * It updates the parsing position, manages node closure, relevance scoring, and transitions
 * between grammar rules as needed.
 *
 * @param {Object} matchResult - The result object from a regex match, containing the matched string and index.
 * @returns {number} The length of the matched string if processed, or a sentinel value if not.
 */
function processGrammarRuleApplication(matchResult) {
  // Extract the matched string and its index in the source
  const matchedText = matchResult[0];
  const matchIndex = matchResult.index;

  // Get the substring from the current parsing position
  const remainingSource = sourceText.substr(matchIndex);

  // Attempt to find the next grammar rule to apply
  const nextGrammarRule = findNextGrammarRule(currentGrammarRule, matchResult, remainingSource);

  // If no grammar rule is found, return the sentinel value
  if (!nextGrammarRule) return grammarRuleApplicationSentinel;

  // Cache the current grammar rule for later reference
  let grammarRuleAtStart = currentGrammarRule;

  // Handle skipping or including the matched text in the output
  if (grammarRuleAtStart.skip) {
    outputBuffer += matchedText;
  } else {
    // If not returning or excluding the end, include the matched text
    if (!(grammarRuleAtStart.returnEnd || grammarRuleAtStart.excludeEnd)) {
      outputBuffer += matchedText;
    }
    // Perform any necessary cleanup or state transition
    performCleanup();
    // If excluding the end, reset the output buffer to the matched text
    if (grammarRuleAtStart.excludeEnd) {
      outputBuffer = matchedText;
    }
  }

  // Traverse up the grammar rule stack, closing nodes and updating relevance
  do {
    if (currentGrammarRule.className) {
      nodeManager.closeNode();
    }
    if (!currentGrammarRule.skip && !currentGrammarRule.subLanguage) {
      relevanceScore += currentGrammarRule.relevance;
    }
    currentGrammarRule = currentGrammarRule.parent;
  } while (currentGrammarRule !== nextGrammarRule.parent);

  // If the next grammar rule has a 'starts' property, initialize isBlobOrFileLikeObject
  if (nextGrammarRule.starts) {
    // If the end is the same as the beginning, synchronize the end regex
    if (nextGrammarRule.endSameAsBegin) {
      nextGrammarRule.starts.endRe = nextGrammarRule.endRe;
    }
    // Begin processing the new grammar rule
    beginGrammarRule(nextGrammarRule.starts);
  }

  // Return 0 if the rule specifies to return at the end, otherwise the length of the matched text
  return grammarRuleAtStart.returnEnd ? 0 : matchedText.length;
}

module.exports = processGrammarRuleApplication;