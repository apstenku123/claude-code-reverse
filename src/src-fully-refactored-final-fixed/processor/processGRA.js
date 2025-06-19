/**
 * Processes a grammar rule application (GRA) by handling matched tokens, updating the parsing state,
 * and managing node transitions in the parsing tree. This function is typically invoked when a grammar rule matches
 * a segment of the input string.
 *
 * @param {Object} matchResult - The result object from a regex match, containing the matched string and index.
 * @returns {number} The length of the matched string if processing continues, or a special constant if processing halts.
 */
function processGrammarRuleApplication(matchResult) {
  // Extract the matched text and its index from the match result
  const matchedText = matchResult[0];
  const matchIndex = matchResult.index;

  // Get the substring of the input starting from the match index
  const remainingInput = inputString.substr(matchIndex);

  // Attempt to insert the matched text at the current cursor position
  const parentNode = insertTextAtCursor(currentNode, matchResult, remainingInput);

  // If insertion failed, return the special constant indicating failure
  if (!parentNode) return GRA_FAILURE;

  // Cache the current node for further processing
  let node = currentNode;

  // Handle skipping and end/return logic
  if (node.skip) {
    // If the node is marked to skip, advance the cursor by the matched text
    cursorPosition += matchedText;
  } else {
    // If not returning or excluding the end, advance the cursor
    if (!(node.returnEnd || node.excludeEnd)) {
      cursorPosition += matchedText;
    }
    // Perform any additional actions required after matching
    performPostMatchActions();
    // If the node excludes the end, reset the cursor to the matched text
    if (node.excludeEnd) {
      cursorPosition = matchedText;
    }
  }

  // Traverse up the node tree until reaching the parent of the inserted node
  do {
    // If the node has a class name, close the current node in the output
    if (currentNode.className) {
      outputBuilder.closeNode();
    }
    // If the node is not skipped and not a sub-language, accumulate relevance
    if (!currentNode.skip && !currentNode.subLanguage) {
      totalRelevance += currentNode.relevance;
    }
    // Move up to the parent node
    currentNode = currentNode.parent;
  } while (currentNode !== parentNode.parent);

  // If the inserted node starts a new context, handle its end regex
  if (parentNode.starts) {
    // If the end is the same as the begin, set the end regex accordingly
    if (parentNode.endSameAsBegin) {
      parentNode.starts.endRe = parentNode.endRe;
    }
    // Push the new context onto the stack
    pushContext(parentNode.starts);
  }

  // Return 0 if the node is set to return at end, otherwise return the length of the matched text
  return node.returnEnd ? 0 : matchedText.length;
}

module.exports = processGrammarRuleApplication;