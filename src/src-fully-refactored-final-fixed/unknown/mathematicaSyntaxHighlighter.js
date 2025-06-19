/**
 * @function mathematicaSyntaxHighlighter
 * @description
 *   Defines syntax highlighting rules for the Mathematica (Wolfram Language) programming language.
 *   Returns a configuration object compatible with a syntax highlighting engine (e.g., highlight.js).
 *   Includes rules for comments, patterns, slots, message names, symbols, named characters, strings, numbers, operators, and braces.
 *
 * @param {object} hljs - The syntax highlighting engine instance, expected to provide COMMENT and QUOTE_STRING_MODE.
 * @returns {object} Syntax highlighting configuration for Mathematica.
 */
function mathematicaSyntaxHighlighter(hljs) {
  // Regex for numbers with double caret (e.g., 2^^1010)
  const baseNumberRegex = /([2-9]|[1-2]\d|[3][0-5])\^\^/;
  // Regex for qualified symbol names (e.g., System.Map)
  const qualifiedSymbolRegex = /(\w*\.\w+|\w+\.\w*|\w+)/;
  // Regex for decimal or integer numbers
  const numberRegex = /(\d*\.\d+|\d+\.\d*|\d+)/;

  // Compose regex for Mathematica numbers (including base numbers)
  const mathematicaNumberRegex = W_A(k51(baseNumberRegex, qualifiedSymbolRegex), numberRegex);

  // Regex for numbers with backticks (e.g., ``1.23)
  const backtickNumberRegex = W_A(/``[+-]?(\d*\.\d+|\d+\.\d*)/, /`([+-]?(\d*\.\d+|\d+\.\d*))?/);

  // Regex for exponent notation (e.g., *^2)
  const exponentRegex = /\*\^[+-]?\d+/;

  // Number highlighting rule
  const numberRule = {
    className: "number",
    relevance: 0,
    begin: k51(mathematicaNumberRegex, Y_A(backtickNumberRegex), Y_A(exponentRegex))
  };

  // Regex for valid Mathematica symbol names
  const symbolNameRegex = /[a-zA$][a-zA-Z0-9$]*/;

  // Set of built-in symbols (assumed to be imported from Zl9)
  const builtInSymbolsSet = new Set(Zl9);

  // Symbol highlighting rules (built-in and user-defined)
  const symbolRule = {
    variants: [
      {
        className: "builtin-symbol",
        begin: symbolNameRegex,
        "on:begin": (match, context) => {
          // Only highlight as built-in if in the set; otherwise, ignore
          if (!builtInSymbolsSet.has(match[0])) context.ignoreMatch();
        }
      },
      {
        className: "symbol",
        relevance: 0,
        begin: symbolNameRegex
      }
    ]
  };

  // Named character rule (e.g., \\[Alpha])
  const namedCharacterRule = {
    className: "named-character",
    begin: /\\\[[$a-zA-zA][$a-zA-Z0-9]+\]/
  };

  // Operator rule (e.g., +, -, *, /, etc.)
  const operatorRule = {
    className: "operator",
    relevance: 0,
    begin: /[+\-*/,;.:@~=><&|_`'^?!%]+/
  };

  // Pattern rule (e.g., x_, _y, x__)
  const patternRule = {
    className: "pattern",
    relevance: 0,
    begin: /([a-zA$][a-zA-Z0-9$]*)?_+([a-zA$][a-zA-Z0-9$]*)?/
  };

  // Slot rule (e.g., #, #1, #name)
  const slotRule = {
    className: "slot",
    relevance: 0,
    begin: /#[a-zA$][a-zA-Z0-9$]*|#+[0-9]?/
  };

  // Brace rule (punctuation for grouping)
  const braceRule = {
    className: "brace",
    relevance: 0,
    begin: /[[\](){}]/
  };

  // Message name rule (e.g., ::foo)
  const messageNameRule = {
    className: "message-name",
    relevance: 0,
    begin: k51("::", symbolNameRegex)
  };

  return {
    name: "Mathematica",
    aliases: ["mma", "wl"],
    classNameAliases: {
      brace: "punctuation",
      pattern: "type",
      slot: "type",
      symbol: "variable",
      "named-character": "variable",
      "builtin-symbol": "built_in",
      "message-name": "string"
    },
    contains: [
      // Block comments (nested allowed)
      hljs.COMMENT(/\(\*/, /\*\)/, { contains: ["self"] }),
      patternRule,
      slotRule,
      messageNameRule,
      symbolRule,
      namedCharacterRule,
      hljs.QUOTE_STRING_MODE,
      numberRule,
      operatorRule,
      braceRule
    ]
  };
}

module.exports = mathematicaSyntaxHighlighter;