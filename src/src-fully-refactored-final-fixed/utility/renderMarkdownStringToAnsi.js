/**
 * Processes a Markdown string by removing custom tags, parsing isBlobOrFileLikeObject into a Markdown AST,
 * rendering each AST node to an ANSI-formatted string, and returning the final formatted output.
 *
 * @param {string} markdownInput - The Markdown string to process and render.
 * @returns {string} The ANSI-formatted string suitable for terminal output.
 */
function renderMarkdownStringToAnsi(markdownInput) {
  // Remove custom tags and their content from the input string
  const cleanedMarkdown = removeCustomTagsFromString(markdownInput);

  // Parse the cleaned Markdown into an array of AST nodes
  const markdownAstNodes = d5.lexer(cleanedMarkdown);

  // Render each AST node to an ANSI-formatted string
  const ansiFormattedSegments = markdownAstNodes.map(astNode => renderMarkdownAstToAnsi(astNode));

  // Join all segments, trim whitespace, and return the result
  return ansiFormattedSegments.join("").trim();
}

module.exports = renderMarkdownStringToAnsi;