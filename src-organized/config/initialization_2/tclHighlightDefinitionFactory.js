/**
 * Factory function that returns a syntax highlighting definition object for the Tcl language.
 * This is designed for use with highlight.js or similar syntax highlighters.
 *
 * @param {object} hljs - The highlight.js instance, providing language modes and utility functions.
 * @returns {object} Syntax highlighting definition for Tcl.
 */
function tclHighlightDefinitionFactory(hljs) {
  // Regular expression for a valid Tcl identifier
  const TCL_IDENTIFIER = /[a-zA-Z_][a-zA-Z0-9_]*/;

  // Number mode: supports binary and C-style numbers
  const NUMBER_MODE = {
    className: "number",
    variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]
  };

  return {
    name: "Tcl",
    aliases: ["tk"],
    // List of Tcl keywords, with some having relevance scores (e.g. '|10')
    keywords: "after append apply array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd chan clock close concat continue dde dict encoding eof error eval exec exit expr fblocked fconfigure fcopy file fileevent filename flush for foreach format gets glob global history http if incr info interp join lappend|10 lassign|10 lindex|10 linsert|10 list llength|10 load lrange|10 lrepeat|10 lreplace|10 lreverse|10 lsearch|10 lset|10 lsort|10 mathfunc mathop memory msgcat namespace open package parray pid pkg::create pkg_mkIndex platform platform::shell proc puts pwd read refchan regexp registry regsub|10 rename return safe scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_startOfPreviousWord tcl_wordBreakAfter tcl_wordBreakBefore tcltest tclvars tell time tm trace unknown unload unset update uplevel upvar variable vwait while",
    contains: [
      // Inline comment: semicolon followed by optional whitespace and then #
      hljs.COMMENT(';[ \processRuleBeginHandlers]*#', '$'),
      // Line comment: line starting with optional whitespace and then #
      hljs.COMMENT('^[ \processRuleBeginHandlers]*#', '$'),
      {
        // Procedure definition
        beginKeywords: "proc",
        end: "[\{]",
        excludeEnd: true,
        contains: [
          {
            className: "title",
            // Matches procedure names, possibly namespaced (::)
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
            // $var or $::var or $::ns::var, etc.
            begin: rkA(/\$/, ni9(/::/), TCL_IDENTIFIER, "(::", TCL_IDENTIFIER, ")*")
          },
          {
            // ${var} or ${::ns::var}
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

module.exports = tclHighlightDefinitionFactory;