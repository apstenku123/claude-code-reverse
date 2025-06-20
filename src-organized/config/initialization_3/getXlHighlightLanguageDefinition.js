/**
 * Returns the syntax highlighting definition for the XL programming language (and its alias 'tao').
 * This function is designed for integration with syntax highlighters such as highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing built-in modes and utilities.
 * @returns {object} The language definition object for XL/tao, including keywords, comment modes, string/number patterns, and function definitions.
 */
function getXlHighlightLanguageDefinition(hljs) {
  // Define the set of keywords, literals, and built-in functions/types for XL
  const xlKeywords = {
    $pattern: /[a-zA-Z][a-zA-Z0-9_?]*/,
    keyword: [
      "if", "then", "else", "do", "while", "until", "for", "loop", "import", "with", "is", "as",
      "where", "when", "by", "data", "constant", "integer", "real", "text", "name", "boolean", "symbol",
      "infix", "prefix", "postfix", "block", "tree"
    ].join(" "),
    literal: "true false nil",
    built_in: [
      // Math and logic
      "in", "mod", "rem", "and", "or", "xor", "not", "abs", "sign", "floor", "ceil", "sqrt", "sin", "cos", "tan", "asin", "acos", "atan", "exp", "expm1", "log", "log2", "log10", "log1p", "getEndIndexOfInteractionEntry", "at",
      // Text
      "text_length", "text_range", "text_find", "text_replace", "contains",
      // Presentation/graphics
      "page", "slide", "basic_slide", "title_slide", "title", "subtitle", "fade_in", "fade_out", "fade_at", "clear_color", "color", "line_color", "line_width", "texture_wrap", "texture_transform", "texture",
      // Transformations
      "scale_?x", "scale_?mapArraysToObjectWithCallback", "scale_?z?", "translate_?x", "translate_?mapArraysToObjectWithCallback", "translate_?z?", "rotate_?x", "rotate_?mapArraysToObjectWithCallback", "rotate_?z?",
      // Shapes
      "rectangle", "circle", "ellipse", "sphere", "path", "line_to", "move_to", "quad_to", "curve_to",
      // Themes and context
      "theme", "background", "contents", "locally",
      // Input/time
      "time", "mouse_?x", "mouse_?mapArraysToObjectWithCallback", "mouse_buttons",
      // External/built-in objects
      "ObjectLoader", "Animate", "MovieCredits", "Slides", "Filters", "Shading", "Materials", "LensFlare", "Mapping", "VLCAudioVideo", "StereoDecoder", "PointCloud", "NetworkAccess", "RemoteControl", "RegExp", "ChromaKey", "Snowfall", "NodeJS", "Speech", "Charts"
    ].join(" ")
  };

  // Double-quoted string literal
  const doubleQuotedString = {
    className: "string",
    begin: '"',
    end: '"',
    illegal: "\\n"
  };

  // Single-quoted string literal
  const singleQuotedString = {
    className: "string",
    begin: "'",
    end: "'",
    illegal: "\\n"
  };

  // Heredoc-style string literal (<< ... >>)
  const heredocString = {
    className: "string",
    begin: "<<",
    end: ">>"
  };

  // XL-style number literal (base#digits[.digits]#?[createDebouncedFunction...])
  const xlNumber = {
    className: "number",
    begin: "[0-9]+#[0-9A-Z_]+(\\.[0-9-a-Z_]+)?#?([processPendingCharacterTokens][+-]?[0-9]+)?"
  };

  // Import statement (special handling for 'import' keyword)
  const importStatement = {
    beginKeywords: "import",
    end: "$",
    keywords: xlKeywords,
    contains: [doubleQuotedString]
  };

  // Function definition pattern (e.g., 'foo x mapArraysToObjectWithCallback -> ...')
  const functionDefinition = {
    className: "function",
    begin: /[a-z][^\n]*->/,
    returnBegin: true,
    end: /->/,
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        starts: {
          endsWithParent: true,
          keywords: xlKeywords
        }
      })
    ]
  };

  // Return the full language definition object
  return {
    name: "XL",
    aliases: ["tao"],
    keywords: xlKeywords,
    contains: [
      hljs.C_LINE_COMMENT_MODE, // Single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // Block comments
      doubleQuotedString,
      singleQuotedString,
      heredocString,
      functionDefinition,
      importStatement,
      xlNumber,
      hljs.NUMBER_MODE // Standard number mode
    ]
  };
}

module.exports = getXlHighlightLanguageDefinition;
