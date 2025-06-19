/**
 * Factory function to create a syntax highlighting definition for LassoScript.
 *
 * @param {object} highlighterAPI - The highlighting API, providing comment, inherit, and mode utilities.
 * @returns {object} LassoScript syntax highlighting definition for use with a syntax highlighter.
 */
function createLassoscriptHighlighter(highlighterAPI) {
  // Define LassoScript keywords, built-ins, and literals
  const lassoscriptKeywords = {
    $pattern: "[a-zA-Z_][\\w.]*|&[lg]processRuleBeginHandlers;",
    literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
    built_in: "array date decimal duration integer map pair string tag xml null boolean bytes keyword list locale queue set stack staticarray local var variable global data self inherited currentcapture givenblock",
    keyword: "cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else fail_if fail_ifnot fail if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
  };

  // HTML-style comment mode
  const htmlCommentMode = highlighterAPI.COMMENT("<!--", "-->", {
    relevance: 0
  });

  // [noprocess] meta block
  const noprocessMetaBlock = {
    className: "meta",
    begin: "\\[noprocess\\]",
    starts: {
      end: "\\[/noprocess\\]",
      returnEnd: true,
      contains: [htmlCommentMode]
    }
  };

  // End of noprocess or LassoScript block meta
  const endNoprocessOrScriptMeta = {
    className: "meta",
    begin: "\\[/noprocess|<\\?(lasso(script)?|=)"
  };

  // Symbol mode for quoted identifiers
  const quotedSymbolMode = {
    className: "symbol",
    begin: "'[a-zA-Z_][\\w.]*'"
  };

  // Main set of language modes for LassoScript
  const lassoscriptModes = [
    // Line comments
    highlighterAPI.C_LINE_COMMENT_MODE,
    // Block comments
    highlighterAPI.C_BLOCK_COMMENT_MODE,
    // Numbers, including special values
    highlighterAPI.inherit(highlighterAPI.C_NUMBER_MODE, {
      begin: highlighterAPI.C_NUMBER_RE + "|(-?infinity|NaN)\\b"
    }),
    // Single-quoted strings (allow all content)
    highlighterAPI.inherit(highlighterAPI.APOS_STRING_MODE, {
      illegal: null
    }),
    // Double-quoted strings (allow all content)
    highlighterAPI.inherit(highlighterAPI.QUOTE_STRING_MODE, {
      illegal: null
    }),
    // Backtick strings
    {
      className: "string",
      begin: "`",
      end: "`"
    },
    // Variable interpolation and special variable forms
    {
      variants: [
        {
          begin: "[#$][a-zA-Z_][\\w.]*"
        },
        {
          begin: "#",
          end: "\\d+",
          illegal: "\\W"
        }
      ]
    },
    // Type annotation (:: typeName)
    {
      className: "type",
      begin: "::\\s*",
      end: "[a-zA-Z_][\\w.]*",
      illegal: "\\W"
    },
    // Parameter variants (e.g. -param, ...)
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
    // Dot or arrow property access with possible quoted symbol
    {
      begin: /(->|\.)\s*/,
      relevance: 0,
      contains: [quotedSymbolMode]
    },
    // Class/define block
    {
      className: "class",
      beginKeywords: "define",
      returnEnd: true,
      end: "\\(|=>",
      contains: [
        highlighterAPI.inherit(highlighterAPI.TITLE_MODE, {
          begin: "[a-zA-Z_][\\w.]*=(?!>)?|[-+*/%](?!>)"
        })
      ]
    }
  ];

  return {
    name: "Lasso",
    aliases: ["ls", "lassoscript"],
    case_insensitive: true,
    keywords: lassoscriptKeywords,
    contains: [
      // End of meta block (e.g. ] or ?>)
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
      noprocessMetaBlock,
      endNoprocessOrScriptMeta,
      // [no_square_brackets ... ] block
      {
        className: "meta",
        begin: "\\[no_square_brackets",
        starts: {
          end: "\\[/no_square_brackets\\]",
          keywords: lassoscriptKeywords,
          contains: [
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
            noprocessMetaBlock,
            endNoprocessOrScriptMeta,
            ...lassoscriptModes
          ]
        }
      },
      // Opening meta bracket
      {
        className: "meta",
        begin: "\\[",
        relevance: 0
      },
      // Shebang for Lasso9
      {
        className: "meta",
        begin: "^#!",
        end: "lasso9$",
        relevance: 10
      },
      ...lassoscriptModes
    ]
  };
}

module.exports = createLassoscriptHighlighter;