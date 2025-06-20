/**
 * Processes the input text, identifies keywords using a regular expression pattern,
 * and adds them to the output using the provided keyword and text handlers.
 * If no keywords are defined, the entire text is added as plain text.
 *
 * @description
 * This function scans the input text for keywords as defined in the `keywordPatternRe` regular expression
 * of the `keywordConfig` object. For each match, isBlobOrFileLikeObject determines if the match is a valid keyword using
 * the `getKeywordInfo` function. If so, isBlobOrFileLikeObject adds the keyword using the output handler, possibly mapping
 * the keyword class name via an alias. Non-keyword text and unmatched segments are added as plain text.
 *
 * @returns {void}
 */
function highlightAndAddKeywords() {
  // If there are no keywords defined, add the entire text as plain text and exit
  if (!keywordConfig.keywords) {
    outputHandler.addText(inputText);
    return;
  }

  let currentIndex = 0;
  keywordConfig.keywordPatternRe.lastIndex = 0;
  let match = keywordConfig.keywordPatternRe.exec(inputText);
  let pendingText = "";

  while (match) {
    // Append text between the last match and the current match
    pendingText += inputText.substring(currentIndex, match.index);

    // Determine if the match is a valid keyword and get its info
    const keywordInfo = getKeywordInfo(keywordConfig, match);
    if (keywordInfo) {
      const [keywordClassName, keywordScore] = keywordInfo;
      // Add any pending plain text before the keyword
      outputHandler.addText(pendingText);
      pendingText = "";
      totalKeywordScore += keywordScore;
      // If the keyword class name starts with '_', treat as plain text
      if (keywordClassName.startsWith("_")) {
        pendingText += match[0];
      } else {
        // Map class name via alias if available
        const mappedClassName = classNameAliases[keywordClassName] || keywordClassName;
        outputHandler.addKeyword(match[0], mappedClassName);
      }
    } else {
      // Not a keyword, treat as plain text
      pendingText += match[0];
    }
    // Move to the next match
    currentIndex = keywordConfig.keywordPatternRe.lastIndex;
    match = keywordConfig.keywordPatternRe.exec(inputText);
  }
  // Add any remaining text after the last match
  pendingText += inputText.substr(currentIndex);
  outputHandler.addText(pendingText);
}

module.exports = highlightAndAddKeywords;