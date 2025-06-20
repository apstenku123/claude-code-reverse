/**
 * Converts a source string into a formatted Markdown string by parsing isBlobOrFileLikeObject into an AST,
 * tokenizing isBlobOrFileLikeObject, rendering each Markdown AST node, and joining the results.
 *
 * @param {string} sourceMarkdown - The raw Markdown source string to process.
 * @returns {string} The fully rendered and formatted Markdown string.
 */
function renderMarkdownFromSource(sourceMarkdown) {
  // Parse the source Markdown into an AST using the 'pe' parser
  const markdownAst = pe(sourceMarkdown);

  // Tokenize the AST using the 'd5.lexer' function
  const markdownTokens = d5.lexer(markdownAst);

  // Render each Markdown AST node into a formatted string
  const renderedMarkdownArray = markdownTokens.map(astNode => renderMarkdownAstNode(astNode));

  // Join all rendered strings, trim whitespace, and return the final Markdown output
  return renderedMarkdownArray.join("").trim();
}

module.exports = renderMarkdownFromSource;