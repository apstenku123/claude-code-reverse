/**
 * Defines the syntax highlighting configuration for the OCaml programming language.
 *
 * @param {object} highlightJsApi - The Highlight.js API object, providing helper methods and modes.
 * @returns {object} The language definition object for OCaml highlighting, suitable for consumption by Highlight.js.
 */
function defineOCamlHighlighting(highlightJsApi) {
  return {
    name: "OCaml",
    aliases: ["ml"],
    keywords: {
      // Matches keywords and identifiers (optionally ending with ! or ?)
      $pattern: "[a-z_]\\w*!?",
      keyword:
        "and as assert asr begin class constraint do done downto else end exception external for fun function functor if in include inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method mod module mutable new object of open! open or private rec sig struct then to try type val! val virtual when while with parser value",
      built_in:
        "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit in_channel out_channel ref",
      literal: "true false"
    },
    // Disallow C++-style comments and '>>' operator as illegal
    illegal: /\/\/|>>/,
    contains: [
      {
        className: "literal",
        // Matches OCaml list and unit literals: [] [||] ()
        begin: "\\[(\\|\\|)?\\]|\\(\\)",
        relevance: 0
      },
      // OCaml block comments: (* ... *)
      highlightJsApi.COMMENT("\\(\\*", "\\*\\)", {
        contains: ["self"]
      }),
      {
        className: "symbol",
        // Matches polymorphic variant tags: 'foo
        begin: "'[a-z_](?!')[\\w']*"
      },
      {
        className: "type",
        // Matches polymorphic variant constructors: `Foo
        begin: "`[a-zA][\\w']*"
      },
      {
        className: "type",
        // Matches type constructors: Foo
        begin: "\\b[a-zA][\\w']*",
        relevance: 0
      },
      {
        // Matches identifiers with type variables: foo'bar
        begin: "[a-z_]\\w*'[\\w']*",
        relevance: 0
      },
      // Inherit the standard single-quoted string mode, but set className and relevance
      highlightJsApi.inherit(highlightJsApi.APOS_STRING_MODE, {
        className: "string",
        relevance: 0
      }),
      // Inherit the standard double-quoted string mode, but allow all content
      highlightJsApi.inherit(highlightJsApi.QUOTE_STRING_MODE, {
        illegal: null
      }),
      {
        className: "number",
        // Matches OCaml integer and floating point literals in various bases
        begin:
          "\\b(0[xX][a-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
        relevance: 0
      },
      {
        // Matches the function arrow operator: ->
        begin: /->/
      }
    ]
  };
}

module.exports = defineOCamlHighlighting;