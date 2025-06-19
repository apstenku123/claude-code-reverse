/**
 * Factory function that defines the syntax highlighting rules for the Lasso language.
 * This function is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} hljs - The syntax highlighting library instance, providing helper methods and modes.
 * @returns {object} The Lasso language definition object for the syntax highlighter.
 */
function createLassoHighlightDefinition(hljs) {
  // Define the set of keywords, literals, and built-in types for Lasso
  const lassoKeywords = {
    $pattern: "[a-zA-Z_][\\w.]*|&[lg]processRuleBeginHandlers;",
    literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
    built_in: "array date decimal duration integer map pair string tag xml null boolean bytes keyword list locale queue set stack staticarray local var variable global data self inherited currentcapture givenblock",
    keyword: "cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else fail_if fail_ifnot fail if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
  };

  // Define HTML-style comment for Lasso
  const htmlCommentMode = hljs.COMMENT("<!--", "-->", {
    relevance: 0
  });

  // [noprocess] meta region
  const noprocessMeta = {
    className: "meta",
    begin: "\\[noprocess\\]",
    starts: {
      end: "\\[/noprocess\\]",
      returnEnd: true,
      contains: [htmlCommentMode]
    }
  };

  // End of [noprocess] or start of Lasso script meta
  const noprocessEndOrScriptMeta = {
    className: "meta",
    begin: "\\[/noprocess|<\\?(lasso(script)?|=)"
  };

  // Symbol mode for quoted identifiers
  const quotedSymbolMode = {
    className: "symbol",
    begin: "'[a-zA-Z_][\\w.]*'"
  };

  // Core language modes for Lasso
  const lassoCoreModes = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    // Number mode, including special values
    hljs.inherit(hljs.C_NUMBER_MODE, {
      begin: hljs.C_NUMBER_RE + "|(-?infinity|NaN)\\b"
    }),
    // Single-quoted string mode (allowing all content)
    hljs.inherit(hljs.APOS_STRING_MODE, {
      illegal: null
    }),
    // Double-quoted string mode (allowing all content)
    hljs.inherit(hljs.QUOTE_STRING_MODE, {
      illegal: null
    }),
    // Backtick string mode
    {
      className: "string",
      begin: "`",
      end: "`"
    },
    // Variable and special identifier modes
    {
      variants: [
        { begin: "[#$][a-zA-Z_][\\w.]*" },
        { begin: "#", end: "\\d+", illegal: "\\W" }
      ]
    },
    // Type annotation mode
    {
      className: "type",
      begin: "::\\s*",
      end: "[a-zA-Z_][\\w.]*",
      illegal: "\\W"
    },
    // Parameter and ellipsis modes
    {
      className: "params",
      variants: [
        { begin: "-(?!infinity)[a-zA-Z_][\\w.]*", relevance: 0 },
        { begin: "(\\.\\.\\.)" }
      ]
    },
    // Member access and arrow function mode
    {
      begin: /(->|\.)\s*/,
      relevance: 0,
      contains: [quotedSymbolMode]
    },
    // Class/define mode
    {
      className: "class",
      beginKeywords: "define",
      returnEnd: true,
      end: "\\(|=>",
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
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
      // Meta region for closing brackets or PHP-style close tags
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
      noprocessMeta,
      noprocessEndOrScriptMeta,
      // [no_square_brackets] meta region
      {
        className: "meta",
        begin: "\\[no_square_brackets",
        starts: {
          end: "\\[/no_square_brackets\\]",
          keywords: lassoKeywords,
          contains: [
            // Nested meta region inside [no_square_brackets]
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
            noprocessMeta,
            noprocessEndOrScriptMeta,
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

module.exports = createLassoHighlightDefinition;