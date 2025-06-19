/**
 * Defines syntax highlighting rules for the Nim programming language.
 *
 * @param {object} highlightJsInstance - The highlight.js core instance, providing standard modes and utilities.
 * @returns {object} Highlight.js language definition object for Nim.
 */
function defineNimHighlighting(highlightJsInstance) {
  return {
    name: "Nim",
    keywords: {
      keyword:
        "addr and as asm bind block break case cast const continue converter discard distinct div do elif else end enum except export finally for from func generic if import in include interface is isnot iterator let macro method mixin mod nil not notin object of or out proc ptr raise ref return shl shr static template try tuple type using var when while with without xor yield",
      literal: "shared guarded stdin stdout stderr result true false",
      built_in:
        "int int8 int16 int32 int64 uint uint8 uint16 uint32 uint64 float float32 float64 bool char string cstring pointer expr stmt void auto any range array openarray varargs seq set clong culong cchar cschar cshort cint csize clonglong cfloat cdouble clongdouble cuchar cushort cuint culonglong cstringarray semistatic"
    },
    contains: [
      // Meta blocks: {. ... .}
      {
        className: "meta",
        begin: /\{\./,
        end: /\.\}/,
        relevance: 10
      },
      // Single-line strings with identifier prefix: myString"
      {
        className: "string",
        begin: /[a-zA-Z]\w*"/,
        end: /"/,
        contains: [
          {
            // Escaped double quote inside string
            begin: /""/
          }
        ]
      },
      // Multi-line triple-quoted strings: myString"""
      {
        className: "string",
        begin: /([a-zA-Z]\w*)?"""/,
        end: /"""/
      },
      // Standard quoted string mode from highlight.js
      highlightJsInstance.QUOTE_STRING_MODE,
      // Type names: Capitalized identifiers
      {
        className: "type",
        begin: /\b[a-zA]\w+\b/,
        relevance: 0
      },
      // Number literals: hex, octal, binary, decimal, with optional type suffixes
      {
        className: "number",
        relevance: 0,
        variants: [
          {
            // Hexadecimal numbers, e.g., 0x1A3F'u32
            begin: /\b(0[xX][0-9a-fA-F][0-9a-fA-F]*)('?\[iIuU](8|16|32|64))?/
          },
          {
            // Octal numbers, e.g., 0o755'u16
            begin: /\b(0o[0-7][0-7]*)('?\[iIuUfF](8|16|32|64))?/
          },
          {
            // Binary numbers, e.g., 0b1010'u8
            begin: /\b(0(b|B)[01][_01]*)('?\[iIuUfF](8|16|32|64))?/
          },
          {
            // Decimal numbers, e.g., 123_456'u64
            begin: /\b(\d[_\d]*)('?\[iIuUfF](8|16|32|64))?/
          }
        ]
      },
      // Comments: from highlight.js standard hash comment mode
      highlightJsInstance.HASH_COMMENT_MODE
    ]
  };
}

module.exports = defineNimHighlighting;