/**
 * Returns a syntax highlighting definition for Python profiler output.
 *
 * This function is designed to be used with a syntax highlighting library (such as highlight.js).
 * It defines patterns and rules to recognize and highlight typical output from Python profilers,
 * such as function call statistics, timings, and filenames.
 *
 * @param {object} syntaxModes - An object containing syntax highlighting modes (e.g., number, string modes).
 *   Expected properties:
 *     - C_NUMBER_MODE: Mode for highlighting numbers
 *     - APOS_STRING_MODE: Mode for highlighting single-quoted strings
 *     - QUOTE_STRING_MODE: Mode for highlighting double-quoted strings
 * @returns {object} Highlight.js language definition object for Python profiler output
 */
function getPythonProfilerHighlightDefinition(syntaxModes) {
  return {
    name: "Python profiler",
    contains: [
      // Highlight numbers (e.g., call counts, timings)
      syntaxModes.C_NUMBER_MODE,
      // Highlight function names with module prefix (e.g., module.func)
      {
        begin: "[a-zA-Z_][\da-zA-Z_]+\.[\da-zA-Z_]{1,3}",
        end: ":",
        excludeEnd: true
      },
      // Highlight profiler statistic headers (e.g., ncalls, tottime, cumtime, filename)
      {
        begin: "(ncalls|tottime|cumtime)",
        end: "$",
        keywords: "ncalls tottime|10 cumtime|10 filename",
        relevance: 10
      },
      // Highlight the line 'function calls' and its number
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
      // Highlight parenthesized strings (e.g., (filename:line))
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

module.exports = getPythonProfilerHighlightDefinition;