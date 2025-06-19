/**
 * Returns a syntax highlighting configuration object for Python profiler output.
 *
 * This configuration is intended for use with a syntax highlighting library (such as highlight.js)
 * to properly highlight the output of Python'createInteractionAccessor profiler reports.
 *
 * @param {object} syntaxModes - An object containing predefined syntax highlighting modes (such as number and string modes).
 *   Expected properties:
 *     - C_NUMBER_MODE: Mode for highlighting numbers
 *     - APOS_STRING_MODE: Mode for highlighting single-quoted strings
 *     - QUOTE_STRING_MODE: Mode for highlighting double-quoted strings
 *
 * @returns {object} a configuration object describing how to highlight Python profiler output.
 */
function getPythonProfilerHighlightConfig(syntaxModes) {
  return {
    name: "Python profiler",
    contains: [
      // Highlight numbers using the provided number mode
      syntaxModes.C_NUMBER_MODE,
      {
        // Matches attribute access like 'module.func:'
        begin: "[a-zA-Z_][\da-zA-Z_]+\.[\da-zA-Z_]{1,3}",
        end: ":",
        excludeEnd: true
      },
      {
        // Matches profiler summary lines like 'ncalls', 'tottime', 'cumtime'
        begin: "(ncalls|tottime|cumtime)",
        end: "$",
        keywords: "ncalls tottime|10 cumtime|10 filename",
        relevance: 10
      },
      {
        // Matches the 'function calls' summary line
        begin: "function calls",
        end: "$",
        contains: [syntaxModes.C_NUMBER_MODE],
        relevance: 10
      },
      // Highlight single-quoted and double-quoted strings
      syntaxModes.APOS_STRING_MODE,
      syntaxModes.QUOTE_STRING_MODE,
      {
        // Matches content within parentheses, but excludes the parentheses themselves
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

module.exports = getPythonProfilerHighlightConfig;