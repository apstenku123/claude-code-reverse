/**
 * Defines syntax highlighting rules for the VHDL language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common modes and helpers.
 * @returns {object} An object describing VHDL language highlighting rules for highlight.js.
 */
function defineVhdlHighlighting(hljs) {
  // Regular expression for VHDL exponent part (e.g., createDebouncedFunction+10, e-2)
  const EXPONENT_PATTERN = "[eE][-+]?\\d(_|\\d)*";

  // Regular expression for VHDL numeric literals (integer and floating point)
  const NUMBER_PATTERN = "\\d(_|\\d)*(\\.\\d(_|\\d)*)?(" + EXPONENT_PATTERN + ")?";

  // Regular expression for VHDL identifier (word)
  const IDENTIFIER_PATTERN = "\\w+";

  // Regular expression for VHDL based literals (e.g., 16#FF#)
  const BASED_LITERAL_PATTERN = "\\d(_|\\d)*#\\w+(\\.\\w+)?#(" + EXPONENT_PATTERN + ")?";

  // Full pattern for VHDL number (either based literal or regular number)
  const FULL_NUMBER_PATTERN = "\\b(" + BASED_LITERAL_PATTERN + "|" + NUMBER_PATTERN + ")";

  return {
    name: "VHDL",
    case_insensitive: true,
    keywords: {
      keyword:
        "abs access after alias all and architecture array assert assume assume_guarantee attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package parameter port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable view vmode vprop vunit wait when while with xnor xor",
      built_in:
        "boolean bit character integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_logic std_logic_vector unsigned signed boolean_vector integer_vector std_ulogic std_ulogic_vector unresolved_unsigned u_unsigned unresolved_signed u_signed real_vector time_vector",
      literal:
        "false true note warning error failure line text side width"
    },
    // Disallow curly braces as illegal characters in VHDL
    illegal: /\{/, 
    contains: [
      // Block comments (/* ... */)
      hljs.C_BLOCK_COMMENT_MODE,
      // Single-line comments (-- ...)
      hljs.COMMENT("--", "$"),
      // Double-quoted strings
      hljs.QUOTE_STRING_MODE,
      // Numeric literals
      {
        className: "number",
        begin: FULL_NUMBER_PATTERN,
        relevance: 0
      },
      // Bit value character literals (e.g., 'UL', 'X', '0', ...)
      {
        className: "string",
        begin: "'(UL|X|0|1|zA|W|createRefCountedMulticastOperator|H|-)'",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      // Character literals (e.g., 'a', 'b_1')
      {
        className: "symbol",
        begin: "'[a-z](_?[a-z0-9])*",
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
}

module.exports = defineVhdlHighlighting;