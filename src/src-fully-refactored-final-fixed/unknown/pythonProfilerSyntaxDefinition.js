/**
 * Returns a syntax highlighting definition object for Python profiler output.
 *
 * This function is intended for use with syntax highlighters (such as highlight.js)
 * to recognize and highlight the output of Python'createInteractionAccessor built-in profiler.
 *
 * @param {object} syntaxModes - An object containing syntax highlighting modes (e.g., number, string modes).
 *   Expected to include:
 *     - C_NUMBER_MODE: Mode for highlighting numbers
 *     - APOS_STRING_MODE: Mode for highlighting single-quoted strings
 *     - QUOTE_STRING_MODE: Mode for highlighting double-quoted strings
 * @returns {object} a syntax highlighting definition for Python profiler output
 */
function pythonProfilerSyntaxDefinition(syntaxModes) {
  return {
    name: "Python profiler",
    contains: [
      // Highlight numbers (e.g., counts, times)
      syntaxModes.C_NUMBER_MODE,
      // Match lines like: 'module.function: '
      {
        begin: "[a-zA-Z_][\da-zA-Z_]+\.[\da-zA-Z_]{1,3}",
        end: ":",
        excludeEnd: true
      },
      // Match summary/statistics lines (e.g., 'ncalls', 'tottime', 'cumtime')
      {
        begin: "(ncalls|tottime|cumtime)",
        end: "$",
        keywords: "ncalls tottime|10 cumtime|10 filename",
        relevance: 10
      },
      // Match 'function calls' summary lines
      {
        begin: "function calls",
        end: "$",
        contains: [syntaxModes.C_NUMBER_MODE],
        relevance: 10
      },
      // Highlight single-quoted strings
      syntaxModes.APOS_STRING_MODE,
      // Highlight double-quoted strings
      syntaxModes.QUOTE_STRING_MODE,
      // Highlight parenthesized strings (e.g., '(filename:line)')
      {
        className: "string",
        begin: "\\(",
        end: "\\)$",
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      }
    ]
  };
}

module.exports = pythonProfilerSyntaxDefinition;