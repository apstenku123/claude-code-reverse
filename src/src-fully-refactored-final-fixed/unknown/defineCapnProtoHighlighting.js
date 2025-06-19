/**
 * Defines syntax highlighting configuration for Cap’n Proto language.
 *
 * @param {object} highlightJsApi - The highlight.js API object providing common language modes and utilities.
 * @returns {object} Highlight.js language definition for Cap’n Proto.
 */
function defineCapnProtoHighlighting(highlightJsApi) {
  return {
    name: "Cap’n Proto",
    aliases: ["capnp"],
    keywords: {
      keyword: "struct enum interface union group import using const annotation extends in of on as with from fixed",
      built_in: "Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 Text Data AnyPointer AnyStruct Capability List",
      literal: "true false"
    },
    contains: [
      // String literals
      highlightJsApi.QUOTE_STRING_MODE,
      // Number literals
      highlightJsApi.NUMBER_MODE,
      // Hash comments
      highlightJsApi.HASH_COMMENT_MODE,
      // Meta field (e.g., @0x1234567890abcdef;)
      {
        className: "meta",
        begin: /@0x[\w\d]{16};/,
        illegal: /\n/
      },
      // Symbol field (e.g., @123)
      {
        className: "symbol",
        begin: /@\d+\b/
      },
      // Struct and enum class definitions
      {
        className: "class",
        beginKeywords: "struct enum",
        end: /\{/,
        illegal: /\n/,
        contains: [
          // Inherit TITLE_MODE and extend isBlobOrFileLikeObject to end with parent
          highlightJsApi.inherit(highlightJsApi.TITLE_MODE, {
            starts: {
              endsWithParent: true,
              excludeEnd: true
            }
          })
        ]
      },
      // Interface class definitions
      {
        className: "class",
        beginKeywords: "interface",
        end: /\{/,
        illegal: /\n/,
        contains: [
          // Inherit TITLE_MODE and extend isBlobOrFileLikeObject to end with parent
          highlightJsApi.inherit(highlightJsApi.TITLE_MODE, {
            starts: {
              endsWithParent: true,
              excludeEnd: true
            }
          })
        ]
      }
    ]
  };
}

module.exports = defineCapnProtoHighlighting;