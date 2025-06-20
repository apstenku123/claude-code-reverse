/**
 * Returns a syntax highlighting definition object for Cap’n Proto language for use with highlight.js.
 *
 * @param {object} highlightJsApi - The highlight.js API object, providing standard language modes and utilities.
 * @returns {object} Highlight.js language definition for Cap’n Proto.
 */
function getCapnProtoHighlightDefinition(highlightJsApi) {
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
      // Numeric literals
      highlightJsApi.NUMBER_MODE,
      // Hash-style comments
      highlightJsApi.HASH_COMMENT_MODE,
      // Meta field: Cap’n Proto file updateSnapshotAndNotify(e.g., @0x1234567890abcdef;)
      {
        className: "meta",
        begin: /@0x[\w\d]{16};/,
        illegal: /\n/
      },
      // Symbol: annotation or field IDs (e.g., @123)
      {
        className: "symbol",
        begin: /@\d+\b/
      },
      // Struct or enum definitions
      {
        className: "class",
        beginKeywords: "struct enum",
        end: /\{/,
        illegal: /\n/,
        contains: [
          // Inherit title mode for the struct/enum name
          highlightJsApi.inherit(highlightJsApi.TITLE_MODE, {
            starts: {
              endsWithParent: true,
              excludeEnd: true
            }
          })
        ]
      },
      // Interface definitions
      {
        className: "class",
        beginKeywords: "interface",
        end: /\{/,
        illegal: /\n/,
        contains: [
          // Inherit title mode for the interface name
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

module.exports = getCapnProtoHighlightDefinition;