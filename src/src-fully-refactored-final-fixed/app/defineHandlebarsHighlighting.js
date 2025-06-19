/**
 * Defines syntax highlighting rules for Handlebars templates for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing utility methods and modes.
 * @returns {object} Handlebars language definition object for the highlighting engine.
 */
function defineHandlebarsHighlighting(hljs) {
  // List of built-in Handlebars helpers and keywords
  const BUILTIN_HELPERS = {
    "builtin-name": [
      "action", "bindattr", "collection", "component", "concat", "debugger", "each", "each-in", "get", "hash", "if", "in", "input", "link-to", "loc", "log", "lookup", "mut", "outlet", "partial", "query-params", "render", "template", "textarea", "unbound", "unless", "view", "with", "yield"
    ]
  };

  // Literal keywords
  const LITERAL_KEYWORDS = {
    literal: ["true", "false", "undefined", "null"]
  };

  // Regular expressions for various string and array patterns
  const DOUBLE_QUOTED_STRING = /""|"[^"]+"/;
  const SINGLE_QUOTED_STRING = /''|'[^']+'/;
  const ARRAY_LITERAL = /\[\]|\[[^\]]+\]/;
  const IDENTIFIER = /[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/;
  const DOT_OR_SLASH = /(\.|\/)/;

  // Compose complex patterns using external utility functions
  const PATH_PATTERN = Bc9(DOUBLE_QUOTED_STRING, SINGLE_QUOTED_STRING, ARRAY_LITERAL, IDENTIFIER);
  const EXPRESSION_PATTERN = Gi(Ac9(/\.|\.\/|\//), PATH_PATTERN, ep9(Gi(DOT_OR_SLASH, PATH_PATTERN)));
  const ATTRIBUTE_PATTERN = Gi("(", ARRAY_LITERAL, "|", IDENTIFIER, ")(?==)");

  // Base mode for Handlebars expressions
  const BASE_EXPRESSION_MODE = {
    begin: EXPRESSION_PATTERN,
    lexemes: /[\w.\/]+/
  };

  // Inherit base mode and add literal keywords
  const EXPRESSION_WITH_KEYWORDS = hljs.inherit(BASE_EXPRESSION_MODE, {
    keywords: LITERAL_KEYWORDS
  });

  // Mode for parenthesis expressions
  const PAREN_EXPRESSION_MODE = {
    begin: /\(/,
    end: /\)/
  };

  // Attribute assignment mode (e.g., foo=bar)
  const ATTRIBUTE_ASSIGNMENT_MODE = {
    className: "attr",
    begin: ATTRIBUTE_PATTERN,
    relevance: 0,
    starts: {
      begin: /=/,
      end: /=/,
      starts: {
        contains: [
          hljs.NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          EXPRESSION_WITH_KEYWORDS,
          PAREN_EXPRESSION_MODE
        ]
      }
    }
  };

  // Mode for block parameters (e.g., as |foo|)
  const BLOCK_PARAMS_MODE = {
    begin: /as\s+\|/,
    keywords: { keyword: "as" },
    end: /\|/,
    contains: [{ begin: /\\w+/ }]
  };

  // Mode for the content inside Handlebars expressions
  const EXPRESSION_CONTENT_MODE = {
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      BLOCK_PARAMS_MODE,
      ATTRIBUTE_ASSIGNMENT_MODE,
      EXPRESSION_WITH_KEYWORDS,
      PAREN_EXPRESSION_MODE
    ],
    returnEnd: true
  };

  // Mode for block helper names (e.g., {{#each ...}})
  const BLOCK_HELPER_NAME_MODE = hljs.inherit(BASE_EXPRESSION_MODE, {
    className: "name",
    keywords: BUILTIN_HELPERS,
    starts: hljs.inherit(EXPRESSION_CONTENT_MODE, {
      end: /\)/
    })
  });
  PAREN_EXPRESSION_MODE.contains = [BLOCK_HELPER_NAME_MODE];

  // Mode for template tag names (e.g., {{{foo}}})
  const TEMPLATE_TAG_NAME_MODE = hljs.inherit(BASE_EXPRESSION_MODE, {
    keywords: BUILTIN_HELPERS,
    className: "name",
    starts: hljs.inherit(EXPRESSION_CONTENT_MODE, {
      end: /\}\}/
    })
  });

  // Mode for closing tag names (e.g., {{{/foo}}})
  const CLOSING_TAG_NAME_MODE = hljs.inherit(BASE_EXPRESSION_MODE, {
    keywords: BUILTIN_HELPERS,
    className: "name"
  });

  // Mode for template variable names (e.g., {{foo}})
  const TEMPLATE_VARIABLE_NAME_MODE = hljs.inherit(BASE_EXPRESSION_MODE, {
    className: "name",
    keywords: BUILTIN_HELPERS,
    starts: hljs.inherit(EXPRESSION_CONTENT_MODE, {
      end: /\}\}/
    })
  });

  return {
    name: "Handlebars",
    aliases: ["hbs", "html.hbs", "html.handlebars", "htmlbars"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      // Escaped opening braces
      {
        begin: /\\\{\{/,
        skip: true
      },
      // Double-escaped opening braces
      {
        begin: /\\\\(?=\{\{)/,
        skip: true
      },
      // Handlebars comments
      hljs.COMMENT(/\{\{!--/, /--\}\}/),
      hljs.COMMENT(/\{\{!/, /\}\}/),
      // Raw block start (e.g., {{{{foo}}}})
      {
        className: "template-tag",
        begin: /\{\{\{\{(?!\/)/,
        end: /\}\}\}\}/,
        contains: [TEMPLATE_TAG_NAME_MODE],
        starts: {
          end: /\{\{\{\{\//,
          returnEnd: true,
          subLanguage: "xml"
        }
      },
      // Raw block end (e.g., {{{{/foo}}}})
      {
        className: "template-tag",
        begin: /\{\{\{\{\//,
        end: /\}\}\}\}/,
        contains: [CLOSING_TAG_NAME_MODE]
      },
      // Block helper start (e.g., {{#each ...}})
      {
        className: "template-tag",
        begin: /\{\{#/,
        end: /\}\}/,
        contains: [TEMPLATE_TAG_NAME_MODE]
      },
      // Else block (e.g., {{else}})
      {
        className: "template-tag",
        begin: /\{\{(?=else\}\})/,
        end: /\}\}/,
        keywords: "else"
      },
      // Else if block (e.g., {{else if ...}})
      {
        className: "template-tag",
        begin: /\{\{(?=else if)/,
        end: /\}\}/,
        keywords: "else if"
      },
      // Block helper end (e.g., {{/each}})
      {
        className: "template-tag",
        begin: /\{\{\//,
        end: /\}\}/,
        contains: [CLOSING_TAG_NAME_MODE]
      },
      // Unescaped variable (e.g., {{{foo}}})
      {
        className: "template-variable",
        begin: /\{\{\{/,
        end: /\}\}\}/,
        contains: [TEMPLATE_VARIABLE_NAME_MODE]
      },
      // Escaped variable (e.g., {{foo}})
      {
        className: "template-variable",
        begin: /\{\{/, 
        end: /\}\}/,
        contains: [TEMPLATE_VARIABLE_NAME_MODE]
      }
    ]
  };
}

module.exports = defineHandlebarsHighlighting;