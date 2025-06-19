/**
 * Factory function to create a JavaScript syntax highlighting definition for highlight.js.
 *
 * @param {object} hljs - The highlight.js core library instance, providing language helpers and modes.
 * @returns {object} Highlight.js language definition for JavaScript, including keywords, modes, and parsing rules.
 */
function createJavascriptHighlighter(hljs) {
  /**
   * Checks if a truly closing tag exists after a given position in the input string.
   * Used for JSX/XML tag parsing.
   * @param {Array} match - The regex match array.
   * @param {object} context - Parsing context, expects 'after' property.
   * @returns {boolean} True if closing tag exists, false otherwise.
   */
  const hasClosingTag = (match, { after }) => {
    const closingTag = '</' + match[0].slice(1);
    return match.input.indexOf(closingTag, after) !== -1;
  };

  // Identifier pattern for JavaScript variables, functions, etc.
  const IDENTIFIER_PATTERN = '[a-z$_][0-9A-zA-z$_]*';

  // JSX fragment open/close patterns
  const JSX_FRAGMENT = {
    begin: '<>',
    end: '</>'
  };

  // JSX tag open/close patterns and logic
  const JSX_TAG = {
    begin: /<[a-z0-9\._:-]+/,
    end: /\/[a-z0-9\._:-]+>|\/>/,
    isTrulyOpeningTag: (match, context) => {
      const nextIndex = match[0].length + match.index;
      const nextChar = match.input[nextIndex];
      // If next character is '<', this is not a valid opening tag
      if (nextChar === '<') {
        context.ignoreMatch();
        return;
      }
      // If next character is '>', check for a closing tag
      if (nextChar === '>') {
        if (!hasClosingTag(match, { after: nextIndex })) {
          context.ignoreMatch();
        }
      }
    }
  };

  // JavaScript keywords, literals, and built-ins
  const KEYWORDS = {
    $pattern: IDENTIFIER_PATTERN,
    keyword: wc9, // external: list of JS keywords
    literal: Ec9, // external: list of JS literals
    built_in: Mc9 // external: list of JS built-ins
  };

  // Numeric patterns for JavaScript numbers
  const NUMBER_PATTERNS = {
    className: 'number',
    variants: [
      {
        // Exponential notation
        begin: '(\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)((\\.([0-9](_?[0-9])*))|\\.)?|(\\.([0-9](_?[0-9])*)))[eE][+-]?([0-9](_?[0-9])*)\\b'
      },
      {
        // Decimal numbers
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

  // Substitution inside template strings: ${ ... }
  const TEMPLATE_SUBSTITUTION = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS,
    contains: [] // Will be filled later
  };

  // Tagged template literal: html`
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

  // Tagged template literal: css`
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

  // JavaScript comments, including JSDoc
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

  // String, template, number, regex, etc. modes
  const BASIC_CONTAINS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE_LITERAL,
    CSS_TEMPLATE_LITERAL,
    TEMPLATE_STRING,
    NUMBER_PATTERNS,
    hljs.REGEXP_MODE
  ];

  // Fill in the recursive contains for template substitutions
  TEMPLATE_SUBSTITUTION.contains = BASIC_CONTAINS.concat({
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: ['self'].concat(BASIC_CONTAINS)
  });

  // All basic modes plus comments and template substitutions
  const ALL_CONTAINS = [].concat(COMMENT_MODES, TEMPLATE_SUBSTITUTION.contains);

  // For function parameters: allow nesting of comments, strings, etc.
  const PARAMS_CONTAINS = ALL_CONTAINS.concat([
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS,
      contains: ['self'].concat(ALL_CONTAINS)
    }
  ]);

  // Function parameter mode
  const FUNCTION_PARAMS = {
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
      PARAMS_CONTAINS: PARAMS_CONTAINS
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
      HTML_TEMPLATE_LITERAL,
      CSS_TEMPLATE_LITERAL,
      TEMPLATE_STRING,
      COMMENT_MODES,
      NUMBER_PATTERNS,
      // Object property (attr) highlighting
      {
        begin: MO1(/[,{\n]\s*/, qSA(MO1(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, '[a-z$_][0-9A-zA-z$_]*\s*:'))),
        relevance: 0,
        contains: [
          {
            className: 'attr',
            begin: '[a-z$_][0-9A-zA-z$_]*' + qSA('\s*:'),
            relevance: 0
          }
        ]
      },
      // Return/throw/case with possible regex
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
          // JSX/React support
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
            begin: '[a-z$_][0-9A-zA-z$_]*'
          }),
          FUNCTION_PARAMS
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
          FUNCTION_PARAMS,
          hljs.inherit(hljs.TITLE_MODE, {
            begin: '[a-z$_][0-9A-zA-z$_]*'
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
            begin: '[a-z$_][0-9A-zA-z$_]*'
          }),
          'self',
          FUNCTION_PARAMS
        ]
      },
      // Getter/setter methods
      {
        begin: '(get|set)\\s+(?=[a-z$_][0-9A-zA-z$_]*\\()',
        end: /\{/,
        keywords: 'get set',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: '[a-z$_][0-9A-zA-z$_]*'
          }),
          {
            begin: /\(\)/
          },
          FUNCTION_PARAMS
        ]
      },
      // $() and $.
      {
        begin: /\$[(.]/
      }
    ]
  };
}

module.exports = createJavascriptHighlighter;