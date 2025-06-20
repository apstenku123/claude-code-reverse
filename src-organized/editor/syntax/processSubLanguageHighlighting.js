/**
 * Processes and highlights a code block using a specified sublanguage, updating relevance and emitting results.
 *
 * This function checks if a sublanguage is specified in the current parsing context (vA). If so, isBlobOrFileLikeObject attempts to highlight
 * the code block (codeToHighlight) using that sublanguage. If the sublanguage is not registered, isBlobOrFileLikeObject adds the code as plain text.
 * If no sublanguage is specified, isBlobOrFileLikeObject falls back to a default highlighting method. The function also updates the overall
 * relevance score and emits the highlighted result.
 *
 * @returns {void} No return value. Side effects include updating relevance and emitting highlighted code.
 */
function processSubLanguageHighlighting() {
  // If there is no code to highlight, exit early
  if (codeToHighlight === "") return;

  let highlightResult = null;

  // Check if a sublanguage is specified as a string
  if (typeof parsingContext.subLanguage === "string") {
    // If the sublanguage is not registered, add the code as plain text and exit
    if (!registeredLanguages[parsingContext.subLanguage]) {
      emitter.addText(codeToHighlight);
      return;
    }
    // Highlight using the specified sublanguage and update the top of the language stack
    highlightResult = highlightWithSubLanguage(
      parsingContext.subLanguage,
      codeToHighlight,
      true,
      languageStack[parsingContext.subLanguage]
    );
    languageStack[parsingContext.subLanguage] = highlightResult.top;
  } else {
    // If no sublanguage is specified, use the default highlighting method
    highlightResult = highlightDefault(
      codeToHighlight,
      parsingContext.subLanguage.length ? parsingContext.subLanguage : null
    );
  }

  // If the current context has positive relevance, add the result'createInteractionAccessor relevance to the total
  if (parsingContext.relevance > 0) {
    totalRelevance += highlightResult.relevance;
  }

  // Emit the highlighted code and its language
  emitter.addSublanguage(highlightResult.emitter, highlightResult.language);
}

module.exports = processSubLanguageHighlighting;