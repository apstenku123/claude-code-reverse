/**
 * Returns the syntax highlighting definition for Mathematica/Wolfram Language for use with a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing utility methods (e.g., COMMENT, QUOTE_STRING_MODE).
 * @returns {object} Highlight.js language definition object for Mathematica/WL.
 */
function mathematicaHighlightDefinition(hljs) {
  // Regex for exponent notation (e.g., 2^^, 35^^)
  const baseExponentPattern = /([2-9]|[1-2]\d|[3][0-5])\^\^/;

  // Regex for qualified symbol names (e.g., Foo.Bar, Bar.Foo, Foo)
  const qualifiedSymbolPattern = /(\w*\.\w+|\w+\.\w*|\w+)/;

  // Regex for numbers (integers and floats)
  const numberPattern = /(\d*\.\d+|\d+\.\d*|\d+)/;

  // Compose regex for base-exponent numbers (e.g., 16^^FF)
  const baseExponentNumberPattern = W_A(k51(baseExponentPattern, qualifiedSymbolPattern), numberPattern);

  // Regex for numbers with backticks (precision marks)
  const precisionNumberPattern = W_A(/``[+-]?(\d*\.\d+|\d+\.\d*|\d+)/, /`([+-]?(\d*\.\d+|\d+\.\d*|\d+))?/);

  // Regex for powers (e.g., *^2, *^-10)
  const powerPattern = /\*\^[+-]?\d+/;

  // Number highlighting rule
  const numberRule = {
    className: "number",
    relevance: 0,
    begin: k51(baseExponentNumberPattern, Y_A(precisionNumberPattern), Y_A(powerPattern))
  };

  // Regex for valid Mathematica symbol names
  const symbolNamePattern = /[a-zA$][a-zA-Z0-9$]*/;

  // Set of built-in Mathematica symbols (from Zl9)
  const builtInSymbolsSet = new Set(Zl9);

  // Symbol highlighting rules (builtin and user-defined)
  const symbolRule = {
    variants: [
      {
        className: "builtin-symbol",
        begin: symbolNamePattern,
        "on:begin": (match, context) => {
          // Ignore match if not a built-in symbol
          if (!builtInSymbolsSet.has(match[0])) context.ignoreMatch();
        }
      },
      {
        className: "symbol",
        relevance: 0,
        begin: symbolNamePattern
      }
    ]
  };

  // Named character rule (e.g., \[Alpha])
  const namedCharacterRule = {
    className: "named-character",
    begin: /\\\[[$a-zA-zA][$a-zA-Z0-9]+\]/
  };

  // Operator highlighting rule
  const operatorRule = {
    className: "operator",
    relevance: 0,
    begin: /[+\-*/,;.:@~=><&|_`'^?!%]+/
  };

  // Pattern variable rule (e.g., x_, _y, x__)
  const patternRule = {
    className: "pattern",
    relevance: 0,
    begin: /([a-zA$][a-zA-Z0-9$]*)?_+([a-zA$][a-zA-Z0-9$]*)?/
  };

  // Slot rule (e.g., #, #name, ##, #1)
  const slotRule = {
    className: "slot",
    relevance: 0,
    begin: /#[a-zA$][a-zA-Z0-9$]*|#+[0-9]?/
  };

  // Braces and brackets rule
  const braceRule = {
    className: "brace",
    relevance: 0,
    begin: /[[\](){}]/
  };

  // Message name rule (e.g., ::foo)
  const messageNameRule = {
    className: "message-name",
    relevance: 0,
    begin: k51("::", symbolNamePattern)
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
      // Block comments ( (* ... *) )
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

module.exports = mathematicaHighlightDefinition;