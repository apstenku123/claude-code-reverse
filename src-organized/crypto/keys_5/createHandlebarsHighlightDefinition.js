/**
 * Factory function that defines the syntax highlighting rules for Handlebars templates.
 * This function is intended for use with syntax highlighters like highlight.js.
 * It configures keywords, literals, regex patterns, and nested highlighting rules for Handlebars expressions.
 *
 * @param {object} hljs - The highlight.js instance or similar API providing utility methods and modes.
 * @returns {object} The Handlebars language definition object for the syntax highlighter.
 */
function createHandlebarsHighlightDefinition(hljs) {
  // List of built-in Handlebars helpers and keywords
  const handlebarsBuiltins = {
    "builtin-name": [
      "action", "bindattr", "collection", "component", "concat", "debugger", "each", "each-in", "get", "hash", "if", "in", "input", "link-to", "loc", "log", "lookup", "mut", "outlet", "partial", "query-params", "render", "template", "textarea", "unbound", "unless", "view", "with", "yield"
    ]
  };

  // List of literal values in Handlebars
  const handlebarsLiterals = {
    literal: ["true", "false", "undefined", "null"]
  };

  // Regex patterns for different Handlebars value types
  const doubleQuotedString = /""|"[^"]+"/;
  const singleQuotedString = /''|'[^']+'/;
  const bracketedExpression = /\[\]|\[[^\]]+\]/;
  const identifier = /[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/;
  const pathSeparator = /(\.|\/)/;

  // Compose regex for Handlebars expressions
  const valuePattern = ap9(doubleQuotedString, singleQuotedString, bracketedExpression, identifier);
  const pathPattern = Ii(np9(/\.|\.\/|\//), valuePattern, ip9(Ii(pathSeparator, valuePattern)));
  const attributePattern = Ii("(", bracketedExpression, "|", identifier, ")(?==)");

  // Base mode for Handlebars expressions
  const baseExpressionMode = {
    begin: pathPattern,
    lexemes: /[\w.\/]+/
  };

  // Mode for literal values
  const literalMode = hljs.inherit(baseExpressionMode, {
    keywords: handlebarsLiterals
  });

  // Mode for sub-expressions (parentheses)
  const subExpressionMode = {
    begin: /\(/,
    end: /\)/
  };

  // Mode for attribute assignments (e.g., foo=bar)
  const attributeAssignmentMode = {
    className: "attr",
    begin: attributePattern,
    relevance: 0,
    starts: {
      begin: /=/,
      end: /=/,
      starts: {
        contains: [
          hljs.NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          literalMode,
          subExpressionMode
        ]
      }
    }
  };

  // Mode for block parameters (e.g., as |foo|)
  const blockParamsMode = {
    begin: /as\s+\|/,
    keywords: {
      keyword: "as"
    },
    end: /\|/,
    contains: [{
      begin: /\\w+/
    }]
  };

  // Mode for the contents of Handlebars expressions
  const expressionContentsMode = {
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      blockParamsMode,
      attributeAssignmentMode,
      literalMode,
      subExpressionMode
    ],
    returnEnd: true
  };

  // Mode for Handlebars helper or block name with arguments (inside parentheses)
  const helperWithArgsMode = hljs.inherit(baseExpressionMode, {
    className: "name",
    keywords: handlebarsBuiltins,
    starts: hljs.inherit(expressionContentsMode, {
      end: /\)/
    })
  });
  subExpressionMode.contains = [helperWithArgsMode];

  // Mode for Handlebars helper or block name with arguments (inside triple or double curly braces)
  const helperBlockMode = hljs.inherit(baseExpressionMode, {
    keywords: handlebarsBuiltins,
    className: "name",
    starts: hljs.inherit(expressionContentsMode, {
      end: /\}\}/
    })
  });

  // Mode for Handlebars helper or block name (no arguments)
  const helperNameMode = hljs.inherit(baseExpressionMode, {
    keywords: handlebarsBuiltins,
    className: "name"
  });

  // Mode for Handlebars variable or helper in variable context
  const variableMode = hljs.inherit(baseExpressionMode, {
    className: "name",
    keywords: handlebarsBuiltins,
    starts: hljs.inherit(expressionContentsMode, {
      end: /\}\}/
    })
  });

  return {
    name: "Handlebars",
    aliases: ["hbs", "html.hbs", "html.handlebars", "htmlbars"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      // Escaped opening curly braces
      {
        begin: /\\\{\{/,
        skip: true
      },
      // Double-escaped opening curly braces
      {
        begin: /\\\\(?=\{\{)/,
        skip: true
      },
      // Handlebars comments
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      // Raw block (triple curly braces, not closing)
      {
        className: "template-tag",
        begin: /\{\{\{\{(?!\/)/,
        end: /\}\}\}\}/,
        contains: [helperBlockMode],
        starts: {
          end: /\{\{\{\{\//,
          returnEnd: true,
          subLanguage: "xml"
        }
      },
      // Raw block closing
      {
        className: "template-tag",
        begin: /\{\{\{\{\//,
        end: /\}\}\}\}/,
        contains: [helperNameMode]
      },
      // Block helper
      {
        className: "template-tag",
        begin: /\{\{#/,
        end: /\}\}/,
        contains: [helperBlockMode]
      },
      // else block
      {
        className: "template-tag",
        begin: /\{\{(?=else\}\})/,
        end: /\}\}/,
        keywords: "else"
      },
      // else if block
      {
        className: "template-tag",
        begin: /\{\{(?=else if)/,
        end: /\}\}/,
        keywords: "else if"
      },
      // Closing block helper
      {
        className: "template-tag",
        begin: /\{\{\//,
        end: /\}\}/,
        contains: [helperNameMode]
      },
      // Triple curly variable
      {
        className: "template-variable",
        begin: /\{\{\{/,
        end: /\}\}\}/,
        contains: [variableMode]
      },
      // Double curly variable
      {
        className: "template-variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: [variableMode]
      }
    ]
  };
}

module.exports = createHandlebarsHighlightDefinition;