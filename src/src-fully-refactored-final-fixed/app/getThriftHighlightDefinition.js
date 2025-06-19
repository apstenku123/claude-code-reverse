/**
 * Returns the syntax highlighting definition for the Thrift language.
 *
 * This function is intended for use with syntax highlighters such as highlight.js.
 * It defines the keywords, literals, built-in types, and language constructs for Thrift,
 * as well as the rules for highlighting strings, numbers, comments, and class-like structures.
 *
 * @param {object} highlightJsApi - The highlight.js API object, providing common language modes and utilities.
 * @returns {object} The Thrift language definition object for syntax highlighting.
 */
function getThriftHighlightDefinition(highlightJsApi) {
  return {
    name: "Thrift",
    keywords: {
      // Thrift language keywords
      keyword: "namespace const typedef struct enum service exception void oneway set list map required optional",
      // Built-in types in Thrift
      built_in: "bool byte i16 i32 i64 double string binary",
      // Literal values
      literal: "true false"
    },
    contains: [
      // String literals
      highlightJsApi.QUOTE_STRING_MODE,
      // Number literals
      highlightJsApi.NUMBER_MODE,
      // Single-line comments (// ...)
      highlightJsApi.C_LINE_COMMENT_MODE,
      // Multi-line comments (/* ... */)
      highlightJsApi.C_BLOCK_COMMENT_MODE,
      {
        // Class-like structures: struct, enum, service, exception
        className: "class",
        beginKeywords: "struct enum service exception",
        end: /\{/, // Ends at the opening brace
        illegal: /\n/, // Must be on a single line
        contains: [
          // Inherit the TITLE_MODE, but customize how isBlobOrFileLikeObject ends
          highlightJsApi.inherit(highlightJsApi.TITLE_MODE, {
            starts: {
              endsWithParent: true, // End with the parent mode
              excludeEnd: true     // Exclude the end pattern from the match
            }
          })
        ]
      },
      {
        // Generic types: set<...>, list<...>, map<...>
        begin: "\\b(set|list|map)\\s*<",
        end: ">",
        keywords: "bool byte i16 i32 i64 double string binary",
        contains: ["self"] // Allow for nested generics
      }
    ]
  };
}

module.exports = getThriftHighlightDefinition;
