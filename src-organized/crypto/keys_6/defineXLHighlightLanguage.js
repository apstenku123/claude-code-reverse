/**
 * Defines the syntax highlighting configuration for the XL programming language (also known as 'tao').
 * This configuration is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing built-in modes and helpers.
 * @returns {object} The language definition object for XL, including keywords, comment modes, and token patterns.
 */
function defineXLHighlightLanguage(hljs) {
  // Define the set of keywords, literals, and built-in functions/types for XL
  const xlKeywords = {
    $pattern: /[a-zA-Z][a-zA-Z0-9_?]*/,
    keyword:
      "if then else do while until for loop import with is as where when by data constant integer real text name boolean symbol infix prefix postfix block tree" +
      "",
    literal: "true false nil",
    built_in:
      "in mod rem and or xor not abs sign floor ceil sqrt sin cos tan asin acos atan exp expm1 log log2 log10 log1p getEndIndexOfInteractionEntry at text_length text_range text_find text_replace contains page slide basic_slide title_slide title subtitle fade_in fade_out fade_at clear_color color line_color line_width texture_wrap texture_transform texture scale_?x scale_?mapArraysToObjectWithCallback scale_?z? translate_?x translate_?mapArraysToObjectWithCallback translate_?z? rotate_?x rotate_?mapArraysToObjectWithCallback rotate_?z? rectangle circle ellipse sphere path line_to move_to quad_to curve_to theme background contents locally time mouse_?x mouse_?mapArraysToObjectWithCallback mouse_buttons " +
      "ObjectLoader Animate MovieCredits Slides Filters Shading Materials LensFlare Mapping VLCAudioVideo StereoDecoder PointCloud NetworkAccess RemoteControl RegExp ChromaKey Snowfall NodeJS Speech Charts"
  };

  // Double-quoted string mode
  const doubleQuotedStringMode = {
    className: "string",
    begin: '"',
    end: '"',
    illegal: "\\n"
  };

  // Single-quoted string mode
  const singleQuotedStringMode = {
    className: "string",
    begin: "'",
    end: "'",
    illegal: "\\n"
  };

  // Here-document style string mode (<< ... >>)
  const hereDocStringMode = {
    className: "string",
    begin: "<<",
    end: ">>"
  };

  // Number mode for base-prefixed numbers (e.g., 16#FF#)
  const baseNumberMode = {
    className: "number",
    begin: "[0-9]+#[0-9A-Z_]+(\\.[0-9-a-Z_]+)?#?([processPendingCharacterTokens][+-]?[0-9]+)?"
  };

  // Import statement mode (for highlighting 'import' lines)
  const importStatementMode = {
    beginKeywords: "import",
    end: "$",
    keywords: xlKeywords,
    contains: [doubleQuotedStringMode]
  };

  // Function definition mode (matches: identifier ... ->)
  const functionDefinitionMode = {
    className: "function",
    begin: /[a-z][^\n]*->/,
    returnBegin: true,
    end: /->/,
    contains: [
      // Inherit the TITLE_MODE from hljs, and start a new mode with XL keywords
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
      doubleQuotedStringMode,
      singleQuotedStringMode,
      hereDocStringMode,
      functionDefinitionMode,
      importStatementMode,
      baseNumberMode,
      hljs.NUMBER_MODE // Standard number mode
    ]
  };
}

module.exports = defineXLHighlightLanguage;
