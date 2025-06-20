/**
 * Factory function that creates a syntax highlighting definition for AsciiDoc.
 * This is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing COMMENT and other helpers.
 * @returns {object} The AsciiDoc language definition object for highlight.js.
 */
function createAsciidocHighlightDefinition(hljs) {
  /**
   * Matches a block of three or more single quotes (''') on a line by itself.
   * Used for block delimiters in AsciiDoc.
   */
  const tripleQuoteBlock = {
    begin: "^'{3,}[ \\processRuleBeginHandlers]*$",
    relevance: 10
  };

  /**
   * Inline escape and formatting patterns that should be recognized but not highlighted.
   */
  const inlineEscapePatterns = [
    { begin: /\\\\[*_`]/ }, // Escaped formatting characters
    { begin: /\\\\\*{2}[^\\]*?\*{2}/ }, // Escaped strong (bold)
    { begin: /\\\\_{2}[^\\]*?_{2}/ }, // Escaped emphasis (italic)
    { begin: /\\\\`{2}[^\\]*?`{2}/ }, // Escaped code
    { begin: /[:;}][*_`](?![*_`])/ } // Formatting after certain punctuation
  ];

  /**
   * Patterns for strong (bold) text in AsciiDoc.
   */
  const strongTextPatterns = [
    {
      className: "strong",
      begin: /\*{2}([^\n]+?)\*{2}/
    },
    {
      className: "strong",
      // OOA is assumed to be a helper function for complex regex composition
      begin: OOA(
        /\*\*/, // opening **
        /((\*(?!\*)|\\[^\\]|[^\*\n\\])+\n?)+/, // content
        /(\*(?!\*)|\\[^\\]|[^\*\n\\])*/, // more content
        /\*\*/ // closing **
      ),
      relevance: 0
    },
    {
      className: "strong",
      begin: /\*(s|s[^\n]*?s)\*(?!processWithTransformedObservable)/
    },
    {
      className: "strong",
      begin: /\*[^\n]([^\n]+\n)+([^\n]+)\*/
    }
  ];

  /**
   * Patterns for emphasis (italic) text in AsciiDoc.
   */
  const emphasisTextPatterns = [
    {
      className: "emphasis",
      begin: /_{2}([^\\n]+?)_{2}/
    },
    {
      className: "emphasis",
      begin: OOA(
        /__/, // opening __
        /((_ (?!_)|\\[^\\]|[^\_\n\\])+\n?)+/, // content
        /(_ (?!_)|\\[^\\]|[^\_\n\\])*/, // more content
        /__/ // closing __
      ),
      relevance: 0
    },
    {
      className: "emphasis",
      begin: /\b_(s|s[^\n]*?s)_(?!processWithTransformedObservable)/
    },
    {
      className: "emphasis",
      begin: /_[^\n]([^\n]+\n)+([^\n]+)_/
    },
    {
      className: "emphasis",
      begin: "\\\\b'(?!['\\\\s])",
      end: "(\\\\n{2}|')",
      contains: [
        {
          begin: "\\\\\\\\'\\\\w",
          relevance: 0
        }
      ],
      relevance: 0
    }
  ];

  /**
   * Pattern for admonition blocks (NOTE, TIP, etc.)
   */
  const admonitionBlock = {
    className: "symbol",
    begin: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):.+",
    relevance: 10
  };

  /**
   * Pattern for bullet points and labeled lists.
   */
  const bulletList = {
    className: "bullet",
    begin: "^(\\*+|-+|\\.+|[^\\n]+?::).+"
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
        begin: "^\\..*$"
      },
      // Delimited blocks (==== ... ====)
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
          { begin: "^(={1,6})[ \\t].+?([ \\t]\\1)?$" }, // = Section
          { begin: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$" } // Underlined section
        ]
      },
      // Attribute definitions (:name: value)
      {
        className: "meta",
        begin: "^:.+?:",
        end: "$",
        excludeEnd: true,
        relevance: 10
      },
      // Attribute references ([attribute])
      {
        className: "meta",
        begin: "^\\[.+?\\]$",
        relevance: 0
      },
      // Quote blocks (____ ... ____)
      {
        className: "quote",
        begin: "^_{4,}\\n",
        end: "\\n_{4,}$",
        relevance: 10
      },
      // Code blocks (---- ... ----)
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
      bulletList,
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
        end: /(`{2})/
      },
      // Inline code monospace (`...` or +...+)
      {
        className: "code",
        begin: /(`.+?`|\+.+?\+)/,
        relevance: 0
      },
      // Indented code blocks
      {
        className: "code",
        begin: "^[ \\t]",
        end: "$",
        relevance: 0
      },
      tripleQuoteBlock,
      // Links and images
      {
        begin: "(link:)?(http|https|ftp|file|irc|image:)[^\\s]+?\\[[^\\]]*?\\]",
        returnBegin: true,
        contains: [
          {
            begin: "(link|image:)",
            relevance: 0
          },
          {
            className: "link",
            begin: /[^\[]+/,
            end: "(?=\\[)",
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

module.exports = createAsciidocHighlightDefinition;
