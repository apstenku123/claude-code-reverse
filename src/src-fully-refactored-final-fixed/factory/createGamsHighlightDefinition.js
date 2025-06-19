/**
 * Factory function that returns a syntax highlighting definition for the GAMS language.
 * This is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing built-in modes and helpers.
 * @returns {object} The GAMS language definition object for highlight.js.
 */
function createGamsHighlightDefinition(hljs) {
  // GAMS language keywords, literals, and built-in functions
  const gamsKeywords = {
    keyword: "abort acronym acronyms alias all and assign binary card diag display else eq file files for free ge gt if integer le loop lt maximizing minimizing model models extractRelevantInteractionId negative no not option options or ord positive prod put putpage puttl repeat sameas semicont semiint smax smin solve sos1 sos2 sum system table then until using while xor yes",
    literal: "eps inf na",
    built_in: "abs arccos arcsin arctan arctan2 Beta betaReg binomial ceil centropy cos cosh cvPower div div0 eDist entropy errorf execSeed exp fact floor frac gamma gammaReg log logBeta logGamma log10 log2 mapVal max min mod ncpCM ncpF ncpVUpow ncpVUsin normal getEndIndexOfInteractionEntry poly power randBinomial randLinear randTriangle round rPower sigmoid sign signPower sin sinh slexp sllog10 slrec sqexp sqlog10 sqr sqrec sqrt tan tanh trunc uniform uniformInt vcPower bool_and bool_eqv bool_imp bool_not bool_or bool_xor ifThen rel_eq rel_ge rel_gt rel_le rel_lt rel_ne gday gdow ghour gleap gmillisec gminute gmonth gsecond gyear jdate jnow jstart jtime errorLevel execError gamsRelease gamsVersion handleCollect handleDelete handleStatus handleSubmit heapFree heapLimit heapSize jobHandle jobKill jobStatus jobTerminate licenseLevel licenseStatus maxExecError sleep timeClose timeComp timeElapsed timeExec timeStart"
  };

  // Parameters section (parentheses)
  const paramsMode = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true
  };

  // Symbolic operators and dollar control
  const symbolMode = {
    className: "symbol",
    variants: [
      { begin: /=[lgenxc]=/ },
      { begin: /\$/ }
    ]
  };

  // GAMS comments (single or double quoted)
  const quotedCommentMode = {
    className: "comment",
    variants: [
      { begin: "'", end: "'" },
      { begin: '"', end: '"' }
    ],
    illegal: "\\n",
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  // Inline expressions (delimited by /.../)
  const inlineExpressionMode = {
    begin: "/",
    end: "/",
    keywords: gamsKeywords,
    contains: [
      quotedCommentMode,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };

  // GAMS identifier regex (used for variable names, etc.)
  const identifierRegex = /[a-zA-Z0-9&#*=?@\\><:,()$[\]_.{}!+%^-]+/;

  // GAMS assignment/comment line (used in table and set definitions)
  const assignmentLineMode = {
    begin: /[a-z][a-z0-9_]*(\([a-z0-9_, ]*\))?[ \processRuleBeginHandlers]+/,
    excludeBegin: true,
    end: "$",
    endsWithParent: true,
    contains: [
      quotedCommentMode,
      inlineExpressionMode,
      {
        className: "comment",
        // NO1 is assumed to be a helper for concatenating regexes
        // jp9 is assumed to be a helper for regex alternation
        // These are external dependencies and must be provided in the context
        begin: NO1(identifierRegex, jp9(NO1(/[ ]+/, identifierRegex))),
        relevance: 0
      }
    ]
  };

  return {
    name: "GAMS",
    aliases: ["gms"],
    case_insensitive: true,
    keywords: gamsKeywords,
    contains: [
      // $ontext/$offtext block comments
      hljs.COMMENT(/^\$ontext/, /^\$offtext/),
      // Meta directives (e.g., $if, $set)
      {
        className: "meta",
        begin: "^\\$[a-z0-9]+",
        end: "$",
        returnBegin: true,
        contains: [
          {
            className: "meta-keyword",
            begin: "^\\$[a-z0-9]+"
          }
        ]
      },
      // *-style comments
      hljs.COMMENT("^\\*", "$"),
      // C-style comments and strings
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      // Set, parameter, variable, scalar, equation declarations
      {
        beginKeywords: "set sets parameter parameters variable variables scalar scalars equation equations",
        end: ";",
        contains: [
          hljs.COMMENT("^\\*", "$"),
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          inlineExpressionMode,
          assignmentLineMode
        ]
      },
      // Table declarations
      {
        beginKeywords: "table",
        end: ";",
        returnBegin: true,
        contains: [
          {
            beginKeywords: "table",
            end: "$",
            contains: [assignmentLineMode]
          },
          hljs.COMMENT("^\\*", "$"),
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          hljs.C_NUMBER_MODE
        ]
      },
      // Function definitions (e.g., myfunc ... ..)
      {
        className: "function",
        begin: /^[a-z][a-z0-9_,\-+' ()$]+\.{2}/,
        returnBegin: true,
        contains: [
          {
            className: "title",
            begin: /^[a-z0-9_]+/
          },
          paramsMode,
          symbolMode
        ]
      },
      hljs.C_NUMBER_MODE,
      symbolMode
    ]
  };
}

module.exports = createGamsHighlightDefinition;
