/**
 * Factory function to create a Handlebars syntax highlighter configuration for a highlighting library.
 *
 * @param {object} hljs - The highlighting library instance (provides utility methods and modes).
 * @returns {object} Handlebars syntax highlighting configuration object.
 */
function createHandlebarsHighlighter(hljs) {
  // List of Handlebars built-in helpers and keywords
  const handlebarsBuiltins = {
    "builtin-name": [
      "action", "bindattr", "collection", "component", "concat", "debugger", "each", "each-in", "get", "hash", "if", "in", "input", "link-to", "loc", "log", "lookup", "mut", "outlet", "partial", "query-params", "render", "template", "textarea", "unbound", "unless", "view", "with", "yield"
    ]
  };

  // Handlebars literal values
  const handlebarsLiterals = {
    literal: ["true", "false", "undefined", "null"]
  };

  // Regular expressions for different Handlebars tokens
  const doubleQuotedString = /""|"[^"]+"/;
  const singleQuotedString = /''|'[^']+'/;
  const bracketedExpression = /\[\]|\[[^\]]+\]/;
  const identifier = /[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/;
  const pathSeparator = /(\.|\/)/;

  // Compose regex for Handlebars expressions
  const handlebarsExpression = ap9(doubleQuotedString, singleQuotedString, bracketedExpression, identifier);
  const handlebarsPath = Ii(np9(/\.|\.\/|\//), handlebarsExpression, ip9(Ii(pathSeparator, handlebarsExpression)));
  const attributeAssignment = Ii("(", bracketedExpression, "|", identifier, ")(?==)");

  // Base mode for Handlebars expressions
  const baseExpressionMode = {
    begin: handlebarsPath,
    lexemes: /[\w.\/]+/
  };

  // Mode for expressions with literals as keywords
  const literalExpressionMode = hljs.inherit(baseExpressionMode, {
    keywords: handlebarsLiterals
  });

  // Mode for parenthesized expressions
  const parenthesisMode = {
    begin: /\(/,
    end: /\)/
  };

  // Mode for attribute assignments (e.g., foo="bar")
  const attributeMode = {
    className: "attr",
    begin: attributeAssignment,
    relevance: 0,
    starts: {
      begin: /=/,
      end: /=/,
      starts: {
        contains: [
          hljs.NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          literalExpressionMode,
          parenthesisMode
        ]
      }
    }
  };

  // Mode for block params (e.g., as |foo|)
  const blockParamsMode = {
    begin: /as\s+\|/,
    keywords: { keyword: "as" },
    end: /\|/,
    contains: [{ begin: /\\w+/ }]
  };

  // Mode for the content inside Handlebars expressions
  const handlebarsContentMode = {
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      blockParamsMode,
      attributeMode,
      literalExpressionMode,
      parenthesisMode
    ],
    returnEnd: true
  };

  // Mode for Handlebars helper/function names inside parentheses
  const helperNameInParenthesisMode = hljs.inherit(baseExpressionMode, {
    className: "name",
    keywords: handlebarsBuiltins,
    starts: hljs.inherit(handlebarsContentMode, {
      end: /\)/
    })
  });
  parenthesisMode.contains = [helperNameInParenthesisMode];

  // Mode for Handlebars helper/function names inside triple mustaches
  const tripleMustacheHelperNameMode = hljs.inherit(baseExpressionMode, {
    keywords: handlebarsBuiltins,
    className: "name",
    starts: hljs.inherit(handlebarsContentMode, {
      end: /\}\}/
    })
  });

  // Mode for Handlebars helper/function names (no content)
  const helperNameMode = hljs.inherit(baseExpressionMode, {
    keywords: handlebarsBuiltins,
    className: "name"
  });

  // Mode for Handlebars helper/function names inside double mustaches
  const doubleMustacheHelperNameMode = hljs.inherit(baseExpressionMode, {
    className: "name",
    keywords: handlebarsBuiltins,
    starts: hljs.inherit(handlebarsContentMode, {
      end: /\}\}/
    })
  });

  return {
    name: "Handlebars",
    aliases: ["hbs", "html.hbs", "html.handlebars", "htmlbars"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      // Escaped opening mustaches
      {
        begin: /\\\{\{/,
        skip: true
      },
      // Double-escaped opening mustaches
      {
        begin: /\\\\(?=\{\{)/,
        skip: true
      },
      // Handlebars comments
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      // Raw block (triple mustache block)
      {
        className: "template-tag",
        begin: /\{\{\{\{(?!\/)/,
        end: /\}\}\}\}/,
        contains: [tripleMustacheHelperNameMode],
        starts: {
          end: /\{\{\{\{\//,
          returnEnd: true,
          subLanguage: "xml"
        }
      },
      // Raw block close
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
        contains: [tripleMustacheHelperNameMode]
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
      // Block close
      {
        className: "template-tag",
        begin: /\{\{\//,
        end: /\}\}/,
        contains: [helperNameMode]
      },
      // Triple mustache variable
      {
        className: "template-variable",
        begin: /\{\{\{/,
        end: /\}\}\}/,
        contains: [doubleMustacheHelperNameMode]
      },
      // Double mustache variable
      {
        className: "template-variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: [doubleMustacheHelperNameMode]
      }
    ]
  };
}

module.exports = createHandlebarsHighlighter;