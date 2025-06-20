/**
 * Factory function that creates a syntax highlighting definition for the Tcl language.
 * This is intended for use with a syntax highlighting engine (such as highlight.js).
 *
 * @param {object} hljs - The highlighting engine instance, providing language modes and helpers.
 * @returns {object} The language definition object for Tcl syntax highlighting.
 */
function createTclHighlightDefinition(hljs) {
  // Regular expression for a valid Tcl identifier (variable/function names)
  const IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z0-9_]*/;

  // Number mode: supports binary and C-style numbers via hljs built-in modes
  const NUMBER_MODE = {
    className: "number",
    variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]
  };

  return {
    name: "Tcl",
    aliases: ["tk"],
    keywords: "after append apply array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd chan clock close concat continue dde dict encoding eof error eval exec exit expr fblocked fconfigure fcopy file fileevent filename flush for foreach format gets glob global history http if incr info interp join lappend|10 lassign|10 lindex|10 linsert|10 list llength|10 load lrange|10 lrepeat|10 lreplace|10 lreverse|10 lsearch|10 lset|10 lsort|10 mathfunc mathop memory msgcat namespace open package parray pid pkg::create pkg_mkIndex platform platform::shell proc puts pwd read refchan regexp registry regsub|10 rename return safe scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_startOfPreviousWord tcl_wordBreakAfter tcl_wordBreakBefore tcltest tclvars tell time tm trace unknown unload unset update uplevel upvar variable vwait while",
    contains: [
      // Inline comment: semicolon followed by optional whitespace and #
      hljs.COMMENT(';[ \processRuleBeginHandlers]*#', '$'),
      // Line comment: line starts with optional whitespace and #
      hljs.COMMENT('^[ \processRuleBeginHandlers]*#', '$'),
      {
        // Procedure definition
        beginKeywords: "proc",
        end: "[\{]",
        excludeEnd: true,
        contains: [
          {
            className: "title",
            // Match procedure names, possibly namespaced (::)
            begin: "[ \processRuleBeginHandlers\n\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
            end: "[ \processRuleBeginHandlers\n\r]",
            endsWithParent: true,
            excludeEnd: true
          }
        ]
      },
      {
        // Variable interpolation
        className: "variable",
        variants: [
          {
            // $var or $::namespace::var
            begin: rkA(
              /\$/, // Dollar sign
              ni9(/::/), // Possibly namespaced
              IDENTIFIER_REGEX,
              "(::",
              IDENTIFIER_REGEX,
              ")*"
            )
          },
          {
            // ${var} or ${::namespace::var}
            begin: "\\$\\{(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
            end: "\\}",
            contains: [NUMBER_MODE]
          }
        ]
      },
      {
        // String literals
        className: "string",
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          hljs.inherit(hljs.QUOTE_STRING_MODE, {
            illegal: null // Allow all content inside strings
          })
        ]
      },
      NUMBER_MODE // Numbers
    ]
  };
}

module.exports = createTclHighlightDefinition;