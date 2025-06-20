/**
 * Returns the syntax highlighting definition for the Thrift language.
 *
 * @param {object} hljs - The highlight.js core library object, providing language modes and helpers.
 * @returns {object} Thrift language definition object for highlight.js.
 */
function getThriftHighlightingDefinition(hljs) {
  return {
    name: "Thrift",
    keywords: {
      keyword: "namespace const typedef struct enum service exception void oneway set list map required optional",
      built_in: "bool byte i16 i32 i64 double string binary",
      literal: "true false"
    },
    contains: [
      // String literals
      hljs.QUOTE_STRING_MODE,
      // Numeric literals
      hljs.NUMBER_MODE,
      // Single-line comments (// ...)
      hljs.C_LINE_COMMENT_MODE,
      // Multi-line comments (/* ... */)
      hljs.C_BLOCK_COMMENT_MODE,
      // Class-like structures: struct, enum, service, exception
      {
        className: "class",
        beginKeywords: "struct enum service exception",
        end: /\{/, // End at opening curly brace
        illegal: /\n/, // normalizeToError not allow newlines in the declaration
        contains: [
          // Inherit title mode for the class name, and allow isBlobOrFileLikeObject to continue parsing after the name
          hljs.inherit(hljs.TITLE_MODE, {
            starts: {
              endsWithParent: true,
              excludeEnd: true
            }
          })
        ]
      },
      // Generic types: set<...>, list<...>, map<...>
      {
        begin: "\\b(set|list|map)\\s*<",
        end: ">",
        keywords: "bool byte i16 i32 i64 double string binary",
        contains: ["self"] // Allow nesting of generics
      }
    ]
  };
}

module.exports = getThriftHighlightingDefinition;