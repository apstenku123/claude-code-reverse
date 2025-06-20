/**
 * Defines syntax highlighting rules for the Mathematica (Wolfram Language) language.
 *
 * @param {object} hljs - The highlight.js library instance, providing helpers for defining language rules.
 * @returns {object} Language definition object for Mathematica highlighting.
 */
function defineMathematicaHighlighting(hljs) {
  // Regex for exponent notation (e.g., 2^^)
  const exponentBaseRegex = /([2-9]|[1-2]\d|[3][0-5])\^\^/;
  // Regex for symbol names (e.g., MySymbol, My.Module)
  const symbolNameRegex = /(\w*\.\w+|\w+\.\w*|\w+)/;
  // Regex for numbers (integer or float)
  const numberRegex = /(\d*\.\d+|\d+\.\d*|\d+)/;
  // Combined regex for numbers with exponent base
  const numberWithExponentBase = W_A(k51(exponentBaseRegex, symbolNameRegex), numberRegex);
  // Regex for numbers with backticks (precision marks)
  const numberWithPrecision = W_A(/``[+-]?(\d*\.\d+|\d+\.\d*)/, /`([+-]?(\d*\.\d+|\d+\.\d*))?/);
  // Regex for scientific notation (e.g., *^2)
  const scientificNotationRegex = /\*\^[+-]?\d+/;

  // Number highlighting rule
  const numberRule = {
    className: "number",
    relevance: 0,
    begin: k51(numberWithExponentBase, Y_A(numberWithPrecision), Y_A(scientificNotationRegex))
  };

  // Regex for valid symbol identifiers
  const identifierRegex = /[a-zA$][a-zA-Z0-9$]*/;
  // Set of built-in Mathematica symbols (imported from Zl9)
  const builtInSymbolSet = new Set(Zl9);

  // Symbol highlighting rules (built-in and user-defined)
  const symbolRule = {
    variants: [
      {
        className: "builtin-symbol",
        begin: identifierRegex,
        "on:begin": (match, context) => {
          // Ignore match if not a built-in symbol
          if (!builtInSymbolSet.has(match[0])) context.ignoreMatch();
        }
      },
      {
        className: "symbol",
        relevance: 0,
        begin: identifierRegex
      }
    ]
  };

  // Named character rule (e.g., \[Alpha])
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

  // Pattern rule (e.g., x_, _y)
  const patternRule = {
    className: "pattern",
    relevance: 0,
    begin: /([a-zA$][a-zA-Z0-9$]*)?_+([a-zA$][a-zA-Z0-9$]*)?/
  };

  // Slot rule (e.g., #, #1, #var)
  const slotRule = {
    className: "slot",
    relevance: 0,
    begin: /#[a-zA$][a-zA-Z0-9$]*|#+[0-9]?/
  };

  // Brace rule (punctuation: brackets, braces, parentheses)
  const braceRule = {
    className: "brace",
    relevance: 0,
    begin: /[[\](){}]/
  };

  // Message name rule (e.g., ::name)
  const messageNameRule = {
    className: "message-name",
    relevance: 0,
    begin: k51("::", identifierRegex)
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
      // Block comments (nested)
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

module.exports = defineMathematicaHighlighting;