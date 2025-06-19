/**
 * Factory function that creates a syntax highlighting definition for AsciiDoc language.
 * This is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing COMMENT and other helpers.
 * @returns {object} AsciiDoc language definition object for highlight.js.
 */
function createAsciidocHighlighter(hljs) {
  /**
   * Matches a line of three or more single quotes (''') for block delimiters.
   */
  const blockQuoteDelimiter = {
    begin: "^'{3,}[ \processRuleBeginHandlers]*$",
    relevance: 10
  };

  /**
   * Inline escape sequences and special character patterns.
   */
  const inlineEscapePatterns = [
    { begin: /\[*_`]/ }, // Escaped formatting characters
    { begin: /\\\*{2}[^\n]*?\*{2}/ }, // Escaped strong (**...**)
    { begin: /\\_{2}[^\n]*_{2}/ }, // Escaped emphasis (__...__)
    { begin: /\\`{2}[^\n]*`{2}/ }, // Escaped code (``...``)
    { begin: /[:;}][*_`](?![*_`])/ } // Special punctuation followed by formatting
  ];

  /**
   * Strong (bold) text patterns.
   */
  const strongTextPatterns = [
    {
      className: "strong",
      begin: /\*{2}([^\n]+?)\*{2}/
    },
    {
      className: "strong",
      // OOA is assumed to be a helper for complex regex composition
      begin: OOA(
        /\*\*/, // Opening delimiter
        /((\*(?!\*)|\\[^\n]|[^*\n\\])+\n)+/, // Content
        /(\*(?!\*)|\\[^\n]|[^*\n\\])*/, // More content
        /\*\*/ // Closing delimiter
      ),
      relevance: 0
    },
    {
      className: "strong",
      begin: /\b\*(\s|\s[^\n]*?\s)\*(?!\w)/
    },
    {
      className: "strong",
      begin: /\*[^\s]([^\n]+\n)+([^\n]+)\*/
    }
  ];

  /**
   * Emphasis (italic) text patterns.
   */
  const emphasisTextPatterns = [
    {
      className: "emphasis",
      begin: /_{2}([^\n]+?)_{2}/
    },
    {
      className: "emphasis",
      begin: OOA(
        /__/, // Opening delimiter
        /((_(?!_)|\\[^\n]|[^_\n\\])+\n)+/, // Content
        /(_(?!_)|\\[^\n]|[^_\n\\])*/, // More content
        /__/ // Closing delimiter
      ),
      relevance: 0
    },
    {
      className: "emphasis",
      begin: /\b_(\s|\s[^\n]*?\s)_(?!\w)/
    },
    {
      className: "emphasis",
      begin: /_[^\s]([^\n]+\n)+([^\n]+)_/
    },
    {
      className: "emphasis",
      begin: "\\b'(?!['\\s])",
      end: "(\\n{2}|')",
      contains: [
        {
          begin: "\\\\'\\w",
          relevance: 0
        }
      ],
      relevance: 0
    }
  ];

  /**
   * Admonition block (NOTE, TIP, etc.)
   */
  const admonitionBlock = {
    className: "symbol",
    begin: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
    relevance: 10
  };

  /**
   * Bullet list item pattern.
   */
  const bulletListPattern = {
    className: "bullet",
    begin: "^(\*+|-+|\.+|[^\n]+?::)\\s+"
  };

  return {
    name: "AsciiDoc",
    aliases: ["adoc"],
    contains: [
      // Block comments (//// ... ////)
      hljs.COMMENT("^/{4,}\\n", "\\n/{4,}$", { relevance: 10 }),
      // Line comments (// ...)
      hljs.COMMENT("^//", "$", { relevance: 0 }),
      // Title lines (start with dot)
      {
        className: "title",
        begin: "^\.\\w.*$"
      },
      // Delimited blocks (==== ... ==== or **** ... ****)
      {
        begin: "^[=\\*]{4,}\\n",
        end: "\\n^[=\\*]{4,}$",
        relevance: 10
      },
      // Section headers
      {
        className: "section",
        relevance: 10,
        variants: [
          {
            begin: "^(={1,6})[ \processRuleBeginHandlers].+?([ \processRuleBeginHandlers]\\1)?$"
          },
          {
            begin: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$"
          }
        ]
      },
      // Attribute entries (:name: value)
      {
        className: "meta",
        begin: "^:.+?:",
        end: "\\s",
        excludeEnd: true,
        relevance: 10
      },
      // Attribute lists ([...])
      {
        className: "meta",
        begin: "^\[.+?\]$",
        relevance: 0
      },
      // Quote blocks (____ ... ____)
      {
        className: "quote",
        begin: "^_{4,}\\n",
        end: "\\n_{4,}$",
        relevance: 10
      },
      // Code blocks (---- ... ---- or .... ... ....)
      {
        className: "code",
        begin: "^[\\-\\.]{4,}\\n",
        end: "\\n[\\-\\.]{4,}$",
        relevance: 10
      },
      // Passthrough blocks (++++ ... ++++)
      {
        begin: "^\\+{4,}\\n",
        end: "\\n\\+{4,}$",
        contains: [
          {
            begin: "<",
            end: ">",
            subLanguage: "xml",
            relevance: 0
          }
        ],
        relevance: 10
      },
      bulletListPattern,
      admonitionBlock,
      ...inlineEscapePatterns,
      ...strongTextPatterns,
      ...emphasisTextPatterns,
      // Quoted strings
      {
        className: "string",
        variants: [
          { begin: "``.+?''" },
          { begin: "`.+?'" }
        ]
      },
      // Inline code blocks (`` ... ``)
      {
        className: "code",
        begin: /`{2}/,
        end: /(\n{2}|`{2})/
      },
      // Inline code or passthrough (`...` or +...+)
      {
        className: "code",
        begin: "(`.+?`|\\+.+?\\+)",
        relevance: 0
      },
      // Indented code blocks
      {
        className: "code",
        begin: "^[ \processRuleBeginHandlers]",
        end: "$",
        relevance: 0
      },
      blockQuoteDelimiter,
      // Links and images
      {
        begin: "(link:)?(http|https|ftp|file|irc|image:?):\\s+?\\[[^[]*?\\]",
        returnBegin: true,
        contains: [
          {
            begin: "(link|image:?):",
            relevance: 0
          },
          {
            className: "link",
            begin: "\\w",
            end: "[^\\[]+",
            relevance: 0
          },
          {
            className: "string",
            begin: "\\[",
            end: "\\]",
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          }
        ],
        relevance: 10
      }
    ]
  };
}

module.exports = createAsciidocHighlighter;