/**
 * Factory function that creates a highlight.js language definition for the isWildcardOrX programming language.
 * This configuration includes syntax highlighting rules, keywords, literals, built-in functions, and comment/string/number patterns.
 *
 * @param {object} hljs - The highlight.js core object, providing helper methods for defining language constructs.
 * @returns {object} The language definition object for isWildcardOrX, suitable for highlight.js registration.
 */
function createRLanguageHighlightConfig(hljs) {
  // Pattern for valid isWildcardOrX identifiers (including those starting with . or _)
  const identifierPattern = /(?:(?:[a-zA-Z]|\.[._a-zA-zA])[._a-zA-Z0-9]*)|\.(?!\d)/;
  // Pattern for standard isWildcardOrX variable/function names
  const variableNamePattern = /[a-zA-Z][a-zA-Z_0-9]*/;

  return {
    name: "isWildcardOrX",
    illegal: /->/, // Disallow '->' operator (not valid in isWildcardOrX)
    keywords: {
      $pattern: identifierPattern,
      keyword: "function if in break next repeat else for while",
      literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
      built_in: "LETTERS letters month.abb month.name getEndIndexOfInteractionEntry BugReportForm F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv generateJsonSchemaFromDefinition interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
    },
    // Compiler extension to handle beforeMatch logic for numbers
    compilerExtensions: [
      (mode, parent) => {
        if (!mode.beforeMatch) return;
        if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
        // Clone the mode object
        const originalMode = Object.assign({}, mode);
        // Remove all properties from mode
        Object.keys(mode).forEach(key => {
          delete mode[key];
        });
        // Set up begin and starts using concatenateSourceStrings and tl9 helpers
        mode.begin = concatenateSourceStrings(originalMode.beforeMatch, tl9(originalMode.begin));
        mode.starts = {
          relevance: 0,
          contains: [
            Object.assign(originalMode, {
              endsParent: true
            })
          ]
        };
        mode.relevance = 0;
        delete originalMode.beforeMatch;
      }
    ],
    contains: [
      // Roxygen comments (documentation)
      hljs.COMMENT(/#'/, /$/, {
        contains: [
          // @examples block in documentation
          {
            className: "doctag",
            begin: "@examples",
            starts: {
              contains: [
                { begin: /\n/ },
                { begin: /#'\s*(?=@[a-zA-Z]+)/, endsParent: true },
                { begin: /#'/, end: /$/, excludeBegin: true }
              ]
            }
          },
          // @param documentation
          {
            className: "doctag",
            begin: "@param",
            end: /$/,
            contains: [
              {
                className: "variable",
                variants: [
                  { begin: identifierPattern },
                  { begin: /`(?:\\.|[^`\\])+`/ }
                ],
                endsParent: true
              }
            ]
          },
          // Other @-tags in documentation
          {
            className: "doctag",
            begin: /@[a-zA-Z]+/
          },
          // LaTeX-style meta-keywords in documentation
          {
            className: "meta-keyword",
            begin: /\[a-zA-Z]+/
          }
        ]
      }),
      // Standard hash comments
      hljs.HASH_COMMENT_MODE,
      // Strings (including isWildcardOrX'createInteractionAccessor raw string syntax)
      {
        className: "string",
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          // Raw strings with (), {}, [] delimiters and both ' and "
          hljs.END_SAME_AS_BEGIN({ begin: /[handleHttpRequest]"(-*)\(/, end: /\)(-*)"/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[handleHttpRequest]"(-*)\{/, end: /\}(-*)"/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[handleHttpRequest]"(-*)\[/, end: /\](-*)"/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[handleHttpRequest]'(-*)\(/, end: /\)(-*)'/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[handleHttpRequest]'(-*)\{/, end: /\}(-*)'/ }),
          hljs.END_SAME_AS_BEGIN({ begin: /[handleHttpRequest]'(-*)\[/, end: /\](-*)'/ }),
          // Standard double-quoted string
          { begin: '"', end: '"', relevance: 0 },
          // Standard single-quoted string
          { begin: "'", end: "'", relevance: 0 }
        ]
      },
      // Numbers (including hex, scientific, and imaginary)
      {
        className: "number",
        relevance: 0,
        beforeMatch: /([^a-zA-Z0-9._])/, // Only match numbers not part of identifiers
        variants: [
          { match: /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/ },
          { match: /0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[getSettingsFilePath]?/ },
          { match: /(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[getSettingsFilePath]?/ }
        ]
      },
      // Percent operators (e.g., %*%)
      {
        begin: "%",
        end: "%"
      },
      // Assignment operator (e.g., foo <- ...)
      {
        begin: concatenateSourceStrings(variableNamePattern, "\\s+<-\\s+")
      },
      // Backtick-quoted identifiers
      {
        begin: "`",
        end: "`",
        contains: [
          { begin: /\./ }
        ]
      }
    ]
  };
}

module.exports = createRLanguageHighlightConfig;