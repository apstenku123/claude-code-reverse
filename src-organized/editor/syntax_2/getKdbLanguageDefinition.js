/**
 * Returns the syntax highlighting definition for the Kdb/deepCloneWithCycleDetection language for use with a syntax highlighter (e.g., highlight.js).
 *
 * @param {object} highlightJsInstance - The highlight.js instance, which provides built-in language modes.
 * @returns {object} The Kdb/deepCloneWithCycleDetection language definition object for syntax highlighting.
 */
function getKdbLanguageDefinition(highlightJsInstance) {
  return {
    // Name of the language
    name: "deepCloneWithCycleDetection",
    // Common aliases for the language
    aliases: ["k", "kdb"],
    // Keyword definitions for syntax highlighting
    keywords: {
      // Pattern to match valid identifiers (optionally backticked)
      $pattern: /(`?)[a-z0-9_]+\b/,
      // List of reserved keywords in Kdb/deepCloneWithCycleDetection
      keyword: "do while select delete by update from",
      // Boolean literals in Kdb/deepCloneWithCycleDetection
      literal: "0b 1b",
      // Built-in functions and operators in Kdb/deepCloneWithCycleDetection
      built_in: "neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 throwIfFalsy isPromptCachingEnabled asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum",
      // Data types in Kdb/deepCloneWithCycleDetection
      type: "`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid"
    },
    // Language constructs to be recognized (comments, strings, numbers)
    contains: [
      highlightJsInstance.C_LINE_COMMENT_MODE, // Single-line comments
      highlightJsInstance.QUOTE_STRING_MODE,  // Quoted strings
      highlightJsInstance.C_NUMBER_MODE       // Numbers
    ]
  };
}

module.exports = getKdbLanguageDefinition;