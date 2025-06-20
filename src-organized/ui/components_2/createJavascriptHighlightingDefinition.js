/**
 * Factory function that returns a comprehensive syntax highlighting definition for JavaScript and related dialects (JSX, mjs, cjs).
 * This definition is intended for use with a syntax highlighter such as highlight.js, providing rules for keywords, literals, built-ins,
 * comments, strings, template literals, numbers, regular expressions, functions, classes, and embedded languages (HTML, CSS in template literals).
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and helpers.
 * @returns {object} The language definition object for JavaScript highlighting.
 */
function createJavascriptHighlightingDefinition(hljs) {
  /**
   * Checks if a truly closing tag exists after a given position in the input string.
   * Used for JSX tag balancing.
   * @param {Array} match - The regex match array.
   * @param {object} context - The context object with an 'after' property.
   * @returns {boolean}
   */
  const hasClosingTagAfter = (match, { after }) => {
    const closingTag = '</' + match[0].slice(1);
    return match.input.indexOf(closingTag, after) !== -1;
  };

  // Identifier pattern for JS
  const IDENTIFIER_PATTERN = '[a-z$_][0-9A-zA-z$_]*';

  // JSX fragment syntax
  const JSX_FRAGMENT = {
    begin: '<>',
    end: '</>'
  };

  // JSX tag syntax
  const JSX_TAG = {
    begin: /<[a-z0-9\._:-]+/,
    end: /\/[a-z0-9\._:-]+>|\/>/,
    /**
     * Determines if the tag is truly an opening tag (not a nested one).
     * @param {Array} match
     * @param {object} context
     */
    isTrulyOpeningTag: (match, context) => {
      const afterTagIndex = match[0].length + match.index;
      const nextChar = match.input[afterTagIndex];
      if (nextChar === '<') {
        // Nested tag, ignore this match
        context.ignoreMatch();
        return;
      }
      if (nextChar === '>') {
        // Only allow if a closing tag exists after
        if (!hasClosingTagAfter(match, { after: afterTagIndex })) {
          context.ignoreMatch();
        }
      }
    }
  };

  // Keywords, literals, built-ins for JS
  const JS_KEYWORDS = {
    $pattern: IDENTIFIER_PATTERN,
    keyword: wc9, // external: list of JS keywords
    literal: Ec9, // external: list of JS literals
    built_in: Mc9 // external: list of JS built-ins
  };

  // Number patterns
  const NUMBER_PART = '[0-9](_?[0-9])*';
  const FRACTIONAL_PART = '\\.([0-9](_?[0-9])*)';
  const INVALID_OCTAL = '0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*';

  // Number highlighting definition
  const NUMBER_MODE = {
    className: 'number',
    variants: [
      {
        // Decimal, float, scientific
        begin: '(\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)((\\.([0-9](_?[0-9])*))|\\.)?|(\\.([0-9](_?[0-9])*)))[eE][+-]?([0-9](_?[0-9])*)\\b'
      },
      {
        // Decimal, float
        begin: '\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)\\b((\\.([0-9](_?[0-9])*))\\b|\\.)?|(\\.([0-9](_?[0-9])*))\\b'
      },
      {
        // BigInt decimal
        begin: '\\b(0|[1-9](_?[0-9])*)n\\b'
      },
      {
        // Hexadecimal (optionally BigInt)
        begin: '\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b'
      },
      {
        // Binary (optionally BigInt)
        begin: '\\b0[bB][0-1](_?[0-1])*n?\\b'
      },
      {
        // Octal (optionally BigInt)
        begin: '\\b0[oO][0-7](_?[0-7])*n?\\b'
      },
      {
        // Legacy octal (optionally BigInt)
        begin: '\\b0[0-7]+n?\\b'
      }
    ],
    relevance: 0
  };

  // Template literal substitution mode
  const TEMPLATE_SUBSTITUTION = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: JS_KEYWORDS,
    contains: [] // Will be filled later
  };

  // Tagged template literals for html and css
  const HTML_TEMPLATE_LITERAL = {
    begin: 'html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBSTITUTION],
      subLanguage: 'xml'
    }
  };
  const CSS_TEMPLATE_LITERAL = {
    begin: 'css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBSTITUTION],
      subLanguage: 'css'
    }
  };

  // Standard template literal
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBSTITUTION]
  };

  // Comment modes (JSDoc, block, line)
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

  // All basic value modes (strings, template literals, numbers, regex)
  const BASIC_VALUE_MODES = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE_LITERAL,
    CSS_TEMPLATE_LITERAL,
    TEMPLATE_STRING,
    NUMBER_MODE,
    hljs.REGEXP_MODE
  ];

  // Fill TEMPLATE_SUBSTITUTION contains recursively
  TEMPLATE_SUBSTITUTION.contains = BASIC_VALUE_MODES.concat({
    begin: /\{/,
    end: /\}/,
    keywords: JS_KEYWORDS,
    contains: ['self'].concat(BASIC_VALUE_MODES)
  });

  // All expressions (comments + values + substitutions)
  const EXPRESSION_MODES = [].concat(COMMENT_MODES, TEMPLATE_SUBSTITUTION.contains);

  // Expression modes with parenthesis support
  const EXPRESSION_WITH_PARENS = EXPRESSION_MODES.concat([
    {
      begin: /\(/,
      end: /\)/,
      keywords: JS_KEYWORDS,
      contains: ['self'].concat(EXPRESSION_MODES)
    }
  ]);

  // Function parameter list mode
  const PARAMS_MODE = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: JS_KEYWORDS,
    contains: EXPRESSION_WITH_PARENS
  };

  return {
    name: 'Javascript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: JS_KEYWORDS,
    exports: {
      PARAMS_CONTAINS: EXPRESSION_WITH_PARENS
    },
    illegal: /#(?![$_A-z])/, // Disallow preprocessor directives
    contains: [
      // Node.js shebang
      hljs.SHEBANG({
        label: 'shebang',
        binary: 'node',
        relevance: 5
      }),
      // 'use strict' or 'use asm' meta
      {
        label: 'use_strict',
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      },
      // Strings, template literals, comments, numbers
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE_LITERAL,
      CSS_TEMPLATE_LITERAL,
      TEMPLATE_STRING,
      COMMENT_MODES,
      NUMBER_MODE,
      // Object property highlighting
      {
        begin: MO1(/[,{\n]\s*/, qSA(MO1(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, IDENTIFIER_PATTERN + '\\s*:'))),
        relevance: 0,
        contains: [
          {
            className: 'attr',
            begin: IDENTIFIER_PATTERN + qSA('\\s*:'),
            relevance: 0
          }
        ]
      },
      // Return/throw/case with possible regex/function/JSX
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
                    keywords: JS_KEYWORDS,
                    contains: EXPRESSION_WITH_PARENS
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
          {
            // JSX fragment or tag
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
      // Function declarations
      {
        className: 'function',
        beginKeywords: 'function',
        end: /[{;]/,
        excludeEnd: true,
        keywords: JS_KEYWORDS,
        contains: [
          'self',
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENTIFIER_PATTERN }),
          PARAMS_MODE
        ],
        illegal: /%/
      },
      // Control flow keywords
      {
        beginKeywords: 'while if switch catch for'
      },
      // Function expressions
      {
        className: 'function',
        begin: hljs.UNDERSCORE_IDENT_RE + '\\([^()]*((\\([^()]*((\\([^()]*\\)[^()]*)*)*\\)[^()]*)*)*\\)\\s*\\{',
        returnBegin: true,
        contains: [
          PARAMS_MODE,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENTIFIER_PATTERN })
        ]
      },
      // Property access and dollar-prefixed identifiers
      {
        variants: [
          { begin: '\\.[a-z$_][0-9A-zA-z$_]*' },
          { begin: '\\$[a-z$_][0-9A-zA-z$_]*' }
        ],
        relevance: 0
      },
      // Class declarations
      {
        className: 'class',
        beginKeywords: 'class',
        end: /[{;=]/,
        excludeEnd: true,
        illegal: /[:"[\]]/,
        contains: [
          { beginKeywords: 'extends' },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // Constructor
      {
        begin: /\b(?=constructor)/,
        end: /[{;]/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENTIFIER_PATTERN }),
          'self',
          PARAMS_MODE
        ]
      },
      // Getters/setters
      {
        begin: '(get|set)\\s+(?=[a-z$_][0-9A-zA-z$_]*\\()',
        end: /\{/,
        keywords: 'get set',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENTIFIER_PATTERN }),
          { begin: /\(\)/ },
          PARAMS_MODE
        ]
      },
      // $() or $.
      {
        begin: /\$[(.]/
      }
    ]
  };
}

module.exports = createJavascriptHighlightingDefinition;