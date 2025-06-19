/**
 * Factory function to create a syntax highlighting definition for JavaScript and related dialects (JSX, mjs, cjs).
 * This definition is intended for use with highlight.js or similar syntax highlighters.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and utilities.
 * @returns {object} Syntax highlighting definition object for JavaScript.
 */
function createJavascriptSyntaxDefinition(hljs) {
  /**
   * Checks if a truly closing tag exists after a given position in the input string.
   *
   * @param {Array} match - The regex match array.
   * @param {object} context - The context object, expects 'after' property.
   * @returns {boolean} True if a closing tag exists after the given position.
   */
  const hasClosingTagAfter = (match, { after }) => {
    const closingTag = '</' + match[0].slice(1);
    return match.input.indexOf(closingTag, after) !== -1;
  };

  // Identifier regex for JS variables, functions, etc.
  const IDENTIFIER_RE = '[a-z$_][0-9A-zA-z$_]*';

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
     * Determines if a tag is truly an opening tag in JSX context.
     *
     * @param {Array} match - The regex match array.
     * @param {object} context - The context object, expects 'ignoreMatch' method.
     */
    isTrulyOpeningTag: (match, context) => {
      const afterTagIndex = match[0].length + match.index;
      const nextChar = match.input[afterTagIndex];
      if (nextChar === '<') {
        // Nested tag, not a valid opening
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

  // JavaScript keywords, literals, and built-ins
  const KEYWORDS = {
    $pattern: IDENTIFIER_RE,
    keyword: wc9, // Provided externally
    literal: Ec9, // Provided externally
    built_in: Mc9 // Provided externally
  };

  // Numeric patterns
  const NUMBER_INTEGER = '[0-9](_?[0-9])*';
  const NUMBER_FRACTION = '\\.([0-9](_?[0-9])*)';
  const NUMBER_INVALID_OCTAL = '0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*';

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
        // Octal
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

  // Tagged template literal for html
  const HTML_TEMPLATE_MODE = {
    begin: 'html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST_MODE],
      subLanguage: 'xml'
    }
  };

  // Tagged template literal for css
  const CSS_TEMPLATE_MODE = {
    begin: 'css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST_MODE],
      subLanguage: 'css'
    }
  };

  // Un-tagged template string
  const TEMPLATE_STRING_MODE = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_SUBST_MODE]
  };

  // JSDoc and comment modes
  const COMMENT_MODES = {
    className: 'comment',
    variants: [
      // JSDoc
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

  // Common string/number/regexp/template modes
  const COMMON_MODES = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE_MODE,
    CSS_TEMPLATE_MODE,
    TEMPLATE_STRING_MODE,
    NUMBER_MODE,
    hljs.REGEXP_MODE
  ];

  // Fill in the recursive contains for template substitutions
  TEMPLATE_SUBST_MODE.contains = COMMON_MODES.concat({
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: ['self'].concat(COMMON_MODES)
  });

  // All modes that can appear in an expression
  const EXPRESSION_MODES = [].concat(COMMENT_MODES, TEMPLATE_SUBST_MODE.contains);

  // Modes for function parameters (allowing nested expressions)
  const PARAMS_CONTAINS = EXPRESSION_MODES.concat([
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS,
      contains: ['self'].concat(EXPRESSION_MODES)
    }
  ]);

  // Function parameters mode
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
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE_MODE,
      CSS_TEMPLATE_MODE,
      TEMPLATE_STRING_MODE,
      COMMENT_MODES,
      NUMBER_MODE,
      // Object property key (with optional comment)
      {
        begin: MO1(/[\{,\n]\s*/, qSA(MO1(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, IDENTIFIER_RE + '\\s*:'))),
        relevance: 0,
        contains: [
          {
            className: 'attr',
            begin: IDENTIFIER_RE + qSA('\\s*:'),
            relevance: 0
          }
        ]
      },
      // Expression context (return, throw, case, etc.)
      {
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          COMMENT_MODES,
          hljs.REGEXP_MODE,
          // Arrow function
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
          // JSX/React fragments and tags
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
        end: /[\{;]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENTIFIER_RE }),
          PARAMS_MODE
        ],
        illegal: /%/
      },
      // Control flow
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
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENTIFIER_RE })
        ]
      },
      // Property access and variable interpolation
      {
        variants: [
          { begin: '\\.[a-z$_][0-9A-zA-z$_]*' },
          { begin: '\\$[a-z$_][0-9A-zA-z$_]*' }
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
          { beginKeywords: 'extends' },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // Constructor
      {
        begin: /\b(?=constructor)/,
        end: /[\{;]/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENTIFIER_RE }),
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
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENTIFIER_RE }),
          { begin: /\(\)/ },
          PARAMS_MODE
        ]
      },
      // Dollar sign property access
      {
        begin: /\$[(.]/
      }
    ]
  };
}

module.exports = createJavascriptSyntaxDefinition;