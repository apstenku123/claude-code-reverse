/**
 * Factory function to create a syntax highlighting definition for the Lasso/Lassoscript language.
 *
 * @param {object} highlightJsApi - The Highlight.js API object, providing language helpers and modes.
 * @returns {object} Highlight.js language definition for Lasso/Lassoscript.
 */
function createLassoscriptHighlightDefinition(highlightJsApi) {
  // Define Lasso keywords, literals, and built-ins
  const lassoKeywords = {
    $pattern: "[a-zA-Z_][\\w.]*|&[lg]processRuleBeginHandlers;",
    literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
    built_in: "array date decimal duration integer map pair string tag xml null boolean bytes keyword list locale queue set stack staticarray local var variable global data self inherited currentcapture givenblock",
    keyword: "cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else fail_if fail_ifnot fail if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
  };

  // HTML-style comment for Lasso
  const htmlCommentMode = highlightJsApi.COMMENT("<!--", "-->", {
    relevance: 0
  });

  // [noprocess] meta block
  const noprocessMetaMode = {
    className: "meta",
    begin: "\\[noprocess\\]",
    starts: {
      end: "\\[/noprocess\\]",
      returnEnd: true,
      contains: [htmlCommentMode]
    }
  };

  // End of [noprocess] or start of Lasso script meta
  const endNoprocessOrLassoScriptMetaMode = {
    className: "meta",
    begin: "\\[/noprocess|<\\?(lasso(script)?|=)"
  };

  // Symbol mode for single-quoted identifiers
  const singleQuotedSymbolMode = {
    className: "symbol",
    begin: "'[a-zA-Z_][\\w.]*'"
  };

  // Core language constructs and variants
  const lassoCoreModes = [
    // Line comments (// ...)
    highlightJsApi.C_LINE_COMMENT_MODE,
    // Block comments (/* ... */)
    highlightJsApi.C_BLOCK_COMMENT_MODE,
    // Numbers, including special values
    highlightJsApi.inherit(highlightJsApi.C_NUMBER_MODE, {
      begin: highlightJsApi.C_NUMBER_RE + "|(-?infinity|NaN)\\b"
    }),
    // Single-quoted strings (allow all content)
    highlightJsApi.inherit(highlightJsApi.APOS_STRING_MODE, {
      illegal: null
    }),
    // Double-quoted strings (allow all content)
    highlightJsApi.inherit(highlightJsApi.QUOTE_STRING_MODE, {
      illegal: null
    }),
    // Backtick-quoted strings
    {
      className: "string",
      begin: "`",
      end: "`"
    },
    // Variable and hash-prefixed identifiers
    {
      variants: [
        { begin: "[#$][a-zA-Z_][\\w.]*" },
        { begin: "#", end: "\\d+", illegal: "\\W" }
      ]
    },
    // Type annotation (:: type)
    {
      className: "type",
      begin: "::\\s*",
      end: "[a-zA-Z_][\\w.]*",
      illegal: "\\W"
    },
    // Parameter variants (e.g., -param, ...)
    {
      className: "params",
      variants: [
        {
          begin: "-(?!infinity)[a-zA-Z_][\\w.]*",
          relevance: 0
        },
        {
          begin: "(\\.\\.\\.)"
        }
      ]
    },
    // Arrow or dot followed by optional whitespace and a symbol
    {
      begin: /(->|\.)\s*/,
      relevance: 0,
      contains: [singleQuotedSymbolMode]
    },
    // Class definition (define ...)
    {
      className: "class",
      beginKeywords: "define",
      returnEnd: true,
      end: "\\(|=>",
      contains: [
        highlightJsApi.inherit(highlightJsApi.TITLE_MODE, {
          begin: "[a-zA-Z_][\\w.]*=(?!>)?|[-+*/%](?!>)"
        })
      ]
    }
  ];

  return {
    name: "Lasso",
    aliases: ["ls", "lassoscript"],
    case_insensitive: true,
    keywords: lassoKeywords,
    contains: [
      // Meta block for closing brackets or PHP-style close
      {
        className: "meta",
        begin: "\\]|\\?>",
        relevance: 0,
        starts: {
          end: "\\[|<\\?(lasso(script)?|=)",
          returnEnd: true,
          relevance: 0,
          contains: [htmlCommentMode]
        }
      },
      noprocessMetaMode,
      endNoprocessOrLassoScriptMetaMode,
      // [no_square_brackets ... ] block
      {
        className: "meta",
        begin: "\\[no_square_brackets",
        starts: {
          end: "\\[/no_square_brackets\\]",
          keywords: lassoKeywords,
          contains: [
            // Nested meta for closing brackets or PHP close inside no_square_brackets
            {
              className: "meta",
              begin: "\\]|\\?>",
              relevance: 0,
              starts: {
                end: "\\[noprocess\\]|<\\?(lasso(script)?|=)",
                returnEnd: true,
                contains: [htmlCommentMode]
              }
            },
            noprocessMetaMode,
            endNoprocessOrLassoScriptMetaMode,
            ...lassoCoreModes
          ]
        }
      },
      // Opening square bracket meta
      {
        className: "meta",
        begin: "\\[",
        relevance: 0
      },
      // Shebang for Lasso9 scripts
      {
        className: "meta",
        begin: "^#!",
        end: "lasso9$",
        relevance: 10
      },
      ...lassoCoreModes
    ]
  };
}

module.exports = createLassoscriptHighlightDefinition;