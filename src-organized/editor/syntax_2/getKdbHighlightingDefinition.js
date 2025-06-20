/**
 * Returns the syntax highlighting definition for the kdb+/q language for use with a syntax highlighter.
 *
 * @param {object} highlighter - The syntax highlighter object, typically containing predefined modes.
 * @returns {object} The highlighting definition object for kdb+/q, including keywords, types, and modes.
 */
function getKdbHighlightingDefinition(highlighter) {
  return {
    name: "kdb+",
    aliases: ["k", "kdb"],
    keywords: {
      // Pattern for matching identifiers (optionally backticked)
      $pattern: /(`?)[a-z0-9_]+\b/,
      // List of language keywords
      keyword: "do while select delete by update from",
      // List of language literals
      literal: "0b 1b",
      // List of built-in functions and operators
      built_in: "neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 throwIfFalsy isPromptCachingEnabled asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum",
      // List of built-in types
      type: "`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid"
    },
    // Supported syntax modes: line comments, quoted strings, and numbers
    contains: [
      highlighter.C_LINE_COMMENT_MODE, // C-style line comments
      highlighter.QUOTE_STRING_MODE,   // Quoted strings
      highlighter.C_NUMBER_MODE        // Numbers
    ]
  };
}

module.exports = getKdbHighlightingDefinition;