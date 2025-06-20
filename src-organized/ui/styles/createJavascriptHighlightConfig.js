/**
 * Factory function that creates a configuration object for JavaScript syntax highlighting.
 * This configuration is intended for use with a syntax highlighter such as highlight.js.
 * It defines keywords, literals, built-ins, comment and string modes, number patterns,
 * template literal handling, JSX/TSX support, and other JavaScript language constructs.
 *
 * @param {object} hljs - The highlight.js core library object, providing language modes and helpers.
 * @returns {object} The configuration object for JavaScript syntax highlighting.
 */
function createJavascriptHighlightConfig(hljs) {
  /**
   * Determines if a truly opening JSX tag exists after a given position.
   * @param {Array} match - The regex match array.
   * @param {object} context - The context object with 'after' property.
   * @returns {boolean}
   */
  const hasTrulyOpeningJsxTag = (match, { after }) => {
    const closingTag = '</' + match[0].slice(1);
    return match.input.indexOf(closingTag, after) !== -1;
  };

  // JavaScript identifier pattern
  const IDENTIFIER_PATTERN = '[a-z$_][0-9A-zA-z$_]*';

  // JSX fragment syntax
  const JSX_FRAGMENT = {
    begin: '<>',
    end: '</>'
  };

  // JSX tag pattern
  const JSX_TAG = {
    begin: /<[a-z0-9\._:-]+/,
    end: /\/[a-z0-9\._:-]+>|\/>/,
    isTrulyOpeningTag: (match, context) => {
      const afterPos = match[0].length + match.index;
      const nextChar = match.input[afterPos];
      if (nextChar === '<') {
        context.ignoreMatch();
        return;
      }
      if (nextChar === '>') {
        if (!hasTrulyOpeningJsxTag(match, { after: afterPos })) {
          context.ignoreMatch();
        }
      }
    }
  };

  // Keywords, literals, and built-ins (external constants)
  const KEYWORDS = {
    $pattern: IDENTIFIER_PATTERN,
    keyword: DyA,
    literal: YyA,
    built_in: WyA
  };

  // Number patterns
  const NUMBER_DECIMAL = '[0-9](_?[0-9])*';
  const NUMBER_FRACTION = '\\.([0-9](_?[0-9])*)';
  const NUMBER_INVALID_OCTAL = '0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*';

  // Number mode
  const NUMBER_MODE = {
    className: 'number',
    variants: [
      {
        // Exponential notation
        begin: '(\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)((\\.([0-9](_?[0-9])*))|\\.)?|(\\.([0-9](_?[0-9])*)))[eE][+-]?([0-9](_?[0-9])*)\\b'
      },
      {
        // Decimal and float
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
  const TEMPLATE_SUBST_MODE = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS,
    contains: [] // Will be filled later
  };

  // Tagged template literals for html and css
  const HTML_TEMPLATE_LITERAL = {
    begin: 'html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST_MODE],
      subLanguage: 'xml'
    }
  };

  const CSS_TEMPLATE_LITERAL = {
    begin: 'css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST_MODE],
      subLanguage: 'css'
    }
  };

  // Standard template literal mode
  const TEMPLATE_STRING_MODE = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST_MODE]
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

  // All string/number/regexp/comment/template modes
  const BASIC_MODES = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE_LITERAL,
    CSS_TEMPLATE_LITERAL,
    TEMPLATE_STRING_MODE,
    NUMBER_MODE,
    hljs.REGEXP_MODE
  ];

  // Fill in the template substitution mode'createInteractionAccessor contains
  TEMPLATE_SUBST_MODE.contains = BASIC_MODES.concat({
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: ['self'].concat(BASIC_MODES)
  });

  // All comment and basic modes
  const ALL_MODES = [].concat(COMMENT_MODES, TEMPLATE_SUBST_MODE.contains);

  // Modes for function parameters (allowing nested parentheses and comments)
  const PARAMS_CONTAINS = ALL_MODES.concat([
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS,
      contains: ['self'].concat(ALL_MODES)
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
      // Node shebang
      hljs.SHEBANG({
        label: 'shebang',
        binary: 'node',
        relevance: 5
      }),
      // 'use strict' and 'use asm' meta
      {
        label: 'use_strict',
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE_LITERAL,
      CSS_TEMPLATE_LITERAL,
      TEMPLATE_STRING_MODE,
      COMMENT_MODES,
      NUMBER_MODE,
      // Object property mode
      {
        begin: jO1(/[\{,\n]\s*/, ZyA(jO1(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, IDENTIFIER_PATTERN + '\\s*:'))),
        relevance: 0,
        contains: [
          {
            className: 'attr',
            begin: IDENTIFIER_PATTERN + ZyA('\\s*:'),
            relevance: 0
          }
        ]
      },
      // Arrow function and return/case/throw with regex
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
          {
            // JSX/TSX support
            variants: [
              JSX_FRAGMENT,
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
        end: /[\{;]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENTIFIER_PATTERN
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
            begin: IDENTIFIER_PATTERN
          })
        ]
      },
      // Property access and jQuery-like variables
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
        end: /[\{;=]/,
        excludeEnd: true,
        illegal: /[:"[\]]/,
        contains: [
          {
            beginKeywords: 'extends'
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // Constructor
      {
        begin: /\b(?=constructor)/,
        end: /[\{;]/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENTIFIER_PATTERN
          }),
          'self',
          PARAMS_MODE
        ]
      },
      // Getter/setter
      {
        begin: '(get|set)\\s+(?=[a-z$_][0-9A-zA-z$_]*\\()',
        end: /\{/,
        keywords: 'get set',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: IDENTIFIER_PATTERN
          }),
          {
            begin: /\(\)/
          },
          PARAMS_MODE
        ]
      },
      // Dollar sign for template literals or jQuery
      {
        begin: /\$[(.]/
      }
    ]
  };
}

module.exports = createJavascriptHighlightConfig;