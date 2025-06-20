/**
 * Factory function that generates a highlight.js language definition for AsciiDoc syntax highlighting.
 *
 * @param {object} hljs - The highlight.js instance, providing COMMENT and other helpers.
 * @returns {object} Highlight.js language definition object for AsciiDoc.
 */
function createAsciiDocHighlightConfig(hljs) {
  /**
   * Matches lines with three or more single quotes (''') as a delimiter.
   * Used for block delimiters in AsciiDoc.
   */
  const blockQuoteDelimiter = {
    begin: "^'{3,}[ \processRuleBeginHandlers]*$",
    relevance: 10
  };

  /**
   * Inline escape and formatting patterns that should be recognized but not highlighted.
   */
  const escapePatterns = [
    { begin: /\[*_`]/ }, // Escaped formatting characters
    { begin: /\\\*{2}[^\n]*?\*{2}/ }, // Escaped strong (**...**)
    { begin: /\\_{2}[^\n]*_{2}/ }, // Escaped emphasis (__...__)
    { begin: /\\`{2}[^\n]*`{2}/ }, // Escaped code (``...``)
    { begin: /[:;}][*_`](?![*_`])/ } // Formatting after punctuation
  ];

  /**
   * Patterns for strong (bold) text in AsciiDoc.
   */
  const strongPatterns = [
    {
      className: "strong",
      begin: /\*{2}([^\n]+?)\*{2}/
    },
    {
      className: "strong",
      // OOA is a helper for multi-line strong blocks (external dependency)
      begin: OOA(/\*\*/, /((\*(?!\*)|\\[^\n]|[^*\n\\])+\n)+/, /(\*(?!\*)|\\[^\n]|[^*\n\\])*/, /\*\*/),
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
   * Patterns for emphasis (italic) text in AsciiDoc.
   */
  const emphasisPatterns = [
    {
      className: "emphasis",
      begin: /_{2}([^\n]+?)_{2}/
    },
    {
      className: "emphasis",
      // OOA is a helper for multi-line emphasis blocks (external dependency)
      begin: OOA(/__/, /((_(?!_)|\\[^\n]|[^_\n\\])+\n)+/, /(_(?!_)|\\[^\n]|[^_\n\\])*/, /__/),
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
   * Pattern for admonition blocks (NOTE, TIP, etc.)
   */
  const admonitionPattern = {
    className: "symbol",
    begin: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
    relevance: 10
  };

  /**
   * Pattern for bullet lists and labeled lists.
   */
  const bulletPattern = {
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
      // Titles (lines starting with a dot)
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
      // Section headers (== Section ==, or underlined style)
      {
        className: "section",
        relevance: 10,
        variants: [
          {
            begin: "^(={1,6})[ \processRuleBeginHandlers].+?([ \processRuleBeginHandlers]\\1)?$"
          },
          {
            begin: "^[^\\[\\]\\n]+?\\n[=\-~\^\+]{2,}$"
          }
        ]
      },
      // Attribute definitions (:name: value)
      {
        className: "meta",
        begin: "^:.+?:",
        end: "\\s",
        excludeEnd: true,
        relevance: 10
      },
      // Attribute references ([name])
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
      // Passthrough blocks (+++ ... +++)
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
      bulletPattern,
      admonitionPattern,
      ...escapePatterns,
      ...strongPatterns,
      ...emphasisPatterns,
      // Quoted strings
      {
        className: "string",
        variants: [
          { begin: "``.+?''" },
          { begin: "`.+?'" }
        ]
      },
      // Inline code (`` ... ``)
      {
        className: "code",
        begin: /`{2}/,
        end: /(\n{2}|`{2})/
      },
      // Inline code (`...` or +...+)
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

module.exports = createAsciiDocHighlightConfig;