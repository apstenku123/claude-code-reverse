/**
 * Factory function that returns a syntax highlighting definition object for JavaScript and related languages (JSX, MJS, CJS).
 * This definition is intended for use with a syntax highlighting engine (such as highlight.js) and includes rules for keywords,
 * literals, built-ins, comments, strings, template literals, numbers, regular expressions, functions, classes, and embedded XML (JSX).
 *
 * @param {object} hljs - The highlight.js core object, providing common modes and utilities.
 * @returns {object} Highlight.js language definition for JavaScript.
 */
function createJavascriptHighlightDefinition(hljs) {
  /**
   * Checks if a truly closing tag exists after a given position in the input string.
   * Used for JSX/XML tag matching.
   * @param {Array} match - The regex match array.
   * @param {object} context - The context object, expects 'after' property.
   * @returns {boolean}
   */
  const hasClosingTag = (match, { after }) => {
    const closingTag = '</' + match[0].slice(1);
    return match.input.indexOf(closingTag, after) !== -1;
  };

  // Regex for valid JavaScript identifiers
  const IDENTIFIER_RE = '[a-z$_][0-9A-zA-z$_]*';

  // JSX fragment delimiters
  const JSX_FRAGMENT = {
    begin: '<>',
    end: '</>'
  };

  // JSX tag matching configuration
  const JSX_TAG = {
    begin: /<[a-z0-9\._:-]+/,
    end: /\/[a-z0-9\._:-]+>|\/>/,
    isTrulyOpeningTag: (match, context) => {
      const afterTag = match[0].length + match.index;
      const nextChar = match.input[afterTag];
      if (nextChar === '<') {
        context.ignoreMatch();
        return;
      }
      if (nextChar === '>') {
        if (!hasClosingTag(match, { after: afterTag })) {
          context.ignoreMatch();
        }
      }
    }
  };

  // Keywords, literals, and built-ins for JavaScript
  const KEYWORDS = {
    $pattern: IDENTIFIER_RE,
    keyword: wc9, // external: list of JS keywords
    literal: Ec9, // external: list of JS literals
    built_in: Mc9 // external: list of JS built-ins
  };

  // Numeric literal regexes
  const NUMBER_INTEGER = '[0-9](_?[0-9])*';
  const NUMBER_FRACTION = '\\.([0-9](_?[0-9])*)';
  const NUMBER_INVALID_OCTAL = '0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*';

  // Number highlighting mode
  const NUMBER_MODE = {
    className: 'number',
    variants: [
      {
        // Decimal, float, scientific notation
        begin: '(\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)((\\.([0-9](_?[0-9])*))|\\.)?|(\\.([0-9](_?[0-9])*)))[eE][+-]?([0-9](_?[0-9])*)\\b'
      },
      {
        // Decimal, float
        begin: '\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)\\b((\\.([0-9](_?[0-9])*))\\b|\\.)?|(\\.([0-9](_?[0-9])*))\\b'
      },
      {
        // BigInt
        begin: '\\b(0|[1-9](_?[0-9])*)n\\b'
      },
      {
        // Hexadecimal
        begin: '\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b'
      },
      {
        // Binary
        begin: '\\b0[bB][0-1](_?[0-1])*n?\\b'
      },
      {
        // Octal (ES6)
        begin: '\\b0[oO][0-7](_?[0-7])*n?\\b'
      },
      {
        // Legacy octal
        begin: '\\b0[0-7]+n?\\b'
      }
    ],
    relevance: 0
  };

  // Template string substitution mode
  const TEMPLATE_SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS,
    contains: [] // Will be filled later
  };

  // Tagged template literal for html (e.g., html`<div></div>`)
  const HTML_TEMPLATE = {
    begin: 'html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST],
      subLanguage: 'xml'
    }
  };

  // Tagged template literal for css (e.g., css`...`)
  const CSS_TEMPLATE = {
    begin: 'css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST],
      subLanguage: 'css'
    }
  };

  // Regular template string
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST]
  };

  // JSDoc and other comment modes
  const COMMENT_MODES = {
    className: 'comment',
    variants: [
      hljs.COMMENT(/\/\*\*(?!\/)/, '\*/', {
        relevance: 0,
        contains: [
          {
            className: 'doctag',
            begin: '@[a-z]+',
            contains: [
              {
                className: 'type',
                begin: '\{',
                end: '\}',
                relevance: 0
              },
              {
                className: 'variable',
                begin: '[a-z$_][0-9A-zA-z$_]*(?=\\s*(-)|$)',
                endsParent: true,
                relevance: 0
              },
              {
                begin: /(?=[^\n])\s/,
                relevance: 0
              }
            ]
          }
        ]
      }),
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };

  // All string/number/regexp modes
  const BASIC_MODES = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    TEMPLATE_STRING,
    NUMBER_MODE,
    hljs.REGEXP_MODE
  ];

  // Fill TEMPLATE_SUBST.contains recursively
  TEMPLATE_SUBST.contains = BASIC_MODES.concat({
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: ['self'].concat(BASIC_MODES)
  });

  // All basic modes plus comments and substitutions
  const ALL_CONTAINS = [].concat(COMMENT_MODES, TEMPLATE_SUBST.contains);

  // Modes for function parameters (allowing nesting)
  const PARAMS_CONTAINS = ALL_CONTAINS.concat([
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS,
      contains: ['self'].concat(ALL_CONTAINS)
    }
  ]);

  // Function parameter mode
  const PARAMS_MODE = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS,
    contains: PARAMS_CONTAINS
  };

  return {
    name: 'Javascript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS,
    exports: {
      PARAMS_CONTAINS
    },
    illegal: /#(?![$_A-z])/, // Disallow # except for private fields
    contains: [
      // Node.js shebang
      hljs.SHEBANG({
        label: 'shebang',
        binary: 'node',
        relevance: 5
      }),
      // 'use strict' and 'use asm' directives
      {
        label: 'use_strict',
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT_MODES,
      NUMBER_MODE,
      // Object property highlighting
      {
        begin: MO1(/[,{\n]\s*/, qSA(MO1(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, IDENTIFIER_RE + '\\s*:'))),
        relevance: 0,
        contains: [
          {
            className: 'attr',
            begin: IDENTIFIER_RE + qSA('\\s*:'),
            relevance: 0
          }
        ]
      },
      // Arrow function highlighting
      {
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          COMMENT_MODES,
          hljs.REGEXP_MODE,
          {
            className: 'function',
            begin: '(\\([^()]*((\\([^()]*((\\([^()]*\\)[^()]*)*)*\\)[^()]*)*)*\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>',
            returnBegin: true,
            end: '\\s*=>',
            contains: [
              {
                className: 'params',
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            begin: /,/,
            relevance: 0
          },
          {
            className: '',
            begin: /\\s/,
            end: /\\s*/,
            skip: true
          },
          // JSX/embedded XML
          {
            variants: [
              {
                begin: JSX_FRAGMENT.begin,
                end: JSX_FRAGMENT.end
              },
              {
                begin: JSX_TAG.begin,
                'on:begin': JSX_TAG.isTrulyOpeningTag,
                end: JSX_TAG.end
              }
            ],
            subLanguage: 'xml',
            contains: [
              {
                begin: JSX_TAG.begin,
                end: JSX_TAG.end,
                skip: true,
                contains: ['self']
              }
            ]
          }
        ],
        relevance: 0
      },
      // Function declaration
      {
        className: 'function',
        beginKeywords: 'function',
        end: /[{;]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENTIFIER_RE
          }),
          PARAMS_MODE
        ],
        illegal: /%/
      },
      // Control flow keywords
      {
        beginKeywords: 'while if switch catch for'
      },
      // Function expression
      {
        className: 'function',
        begin: hljs.UNDERSCORE_IDENT_RE + '\\([^()]*((\\([^()]*((\\([^()]*\\)[^()]*)*)*\\)[^()]*)*)*\\)\\s*\\{',
        returnBegin: true,
        contains: [
          PARAMS_MODE,
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENTIFIER_RE
          })
        ]
      },
      // Property access and $-prefixed identifiers
      {
        variants: [
          {
            begin: '\\.[a-z$_][0-9A-zA-z$_]*'
          },
          {
            begin: '\\$[a-z$_][0-9A-zA-z$_]*'
          }
        ],
        relevance: 0
      },
      // Class declaration
      {
        className: 'class',
        beginKeywords: 'class',
        end: /[{;=]/,
        excludeEnd: true,
        illegal: /[:"[\]]/,
        contains: [
          {
            beginKeywords: 'extends'
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // Constructor method
      {
        begin: /\b(?=constructor)/,
        end: /[{;]/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENTIFIER_RE
          }),
          'self',
          PARAMS_MODE
        ]
      },
      // Getter/setter methods
      {
        begin: '(get|set)\\s+(?=[a-z$_][0-9A-zA-z$_]*\\()',
        end: /\{/,
        keywords: 'get set',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENTIFIER_RE
          }),
          {
            begin: /\(\)/
          },
          PARAMS_MODE
        ]
      },
      // Dollar sign property access or function call
      {
        begin: /\$[(.]/
      }
    ]
  };
}

module.exports = createJavascriptHighlightDefinition;
