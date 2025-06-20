/**
 * Returns a syntax highlighting definition object for Markdown, suitable for use with highlight.js or similar libraries.
 * This definition includes rules for headers, code blocks, emphasis, strong, links, blockquotes, lists, and more.
 *
 * @returns {object} Markdown highlighting definition object
 */
function getMarkdownHighlightDefinition() {
  // XML-like tags (for embedded HTML in Markdown)
  const xmlSubLanguage = {
    begin: /<\/?[a-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  };

  // Horizontal rule (---, ***, etc.)
  const horizontalRule = {
    begin: "^[-\\*]{3,}",
    end: "$"
  };

  // Code blocks and inline code
  const codeBlock = {
    className: "code",
    variants: [
      {
        // Fenced code block with backticks
        begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
      },
      {
        // Fenced code block with tildes
        begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
      },
      {
        // Fenced code block (backticks, explicit end)
        begin: "```",
        end: "```+[ ]*$"
      },
      {
        // Fenced code block (tildes, explicit end)
        begin: "~~~",
        end: "~~~+[ ]*$"
      },
      {
        // Inline code
        begin: "`.+?`"
      },
      {
        // Indented code block
        begin: "(?=^( {4}|\\processRuleBeginHandlers))",
        contains: [
          {
            begin: "^( {4}|\\processRuleBeginHandlers)",
            end: "(\\n)$"
          }
        ],
        relevance: 0
      }
    ]
  };

  // List bullets (unordered and ordered)
  const listBullet = {
    className: "bullet",
    begin: "^[ \processRuleBeginHandlers]*([*+-]|(\\d+\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: true
  };

  // Link reference definitions ([id]: ...)
  const linkReferenceDefinition = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: true,
    contains: [
      {
        className: "symbol",
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: "link",
        begin: /:\s*/,
        end: /$/,
        excludeBegin: true
      }
    ]
  };

  // Markdown links (inline, reference, autolink, etc.)
  const markdownLink = {
    variants: [
      {
        // Reference-style link: [text][id]
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      {
        // Inline link with protocol
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)createInteractionAccessor?:\/\/).*?\)/,
        relevance: 2
      },
      {
        // Inline link with protocol (using Bp9 helper)
        begin: Bp9(/\[.+?\]\(/, /[a-z][a-z0-9+.-]*/, /:\/\/.*?\)/),
        relevance: 2
      },
      {
        // Inline link with relative/absolute path
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      {
        // Inline link (fallback)
        begin: /\[.+?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: true,
    contains: [
      {
        className: "string",
        relevance: 0,
        begin: "\\[",
        end: "\\]",
        excludeBegin: true,
        returnEnd: true
      },
      {
        className: "link",
        relevance: 0,
        begin: "\\]\\(",
        end: "\\)",
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: "symbol",
        relevance: 0,
        begin: "\\]\\[",
        end: "\\]",
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };

  // Strong emphasis (bold)
  const strongEmphasis = {
    className: "strong",
    contains: [], // Will be filled later
    variants: [
      {
        begin: /_{2}/,
        end: /_{2}/
      },
      {
        begin: /\*{2}/,
        end: /\*{2}/
      }
    ]
  };

  // Emphasis (italic)
  const emphasis = {
    className: "emphasis",
    contains: [], // Will be filled later
    variants: [
      {
        begin: /\*(?!\*)/,
        end: /\*/
      },
      {
        begin: /_(?!_)/,
        end: /_/, // Single underscore
        relevance: 0
      }
    ]
  };

  // Allow strong and emphasis to nest within each other
  strongEmphasis.contains.push(emphasis);
  emphasis.contains.push(strongEmphasis);

  // Inline elements that can appear inside headers, quotes, etc.
  let inlineElements = [xmlSubLanguage, markdownLink];
  strongEmphasis.contains = strongEmphasis.contains.concat(inlineElements);
  emphasis.contains = emphasis.contains.concat(inlineElements);
  inlineElements = inlineElements.concat(strongEmphasis, emphasis);

  return {
    name: "Markdown",
    aliases: ["md", "mkdown", "mkd"],
    contains: [
      {
        // ATX and Setext headers
        className: "section",
        variants: [
          {
            // ATX headers: #, ##, ###, etc.
            begin: "^#{1,6}",
            end: "$",
            contains: inlineElements
          },
          {
            // Setext headers: underlined with === or ---
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              {
                begin: "^[=-]*$"
              },
              {
                begin: "^",
                end: "\\n",
                contains: inlineElements
              }
            ]
          }
        ]
      },
      xmlSubLanguage,
      listBullet,
      strongEmphasis,
      emphasis,
      {
        // Blockquote
        className: "quote",
        begin: "^>\\s+",
        contains: inlineElements,
        end: "$"
      },
      codeBlock,
      horizontalRule,
      markdownLink,
      linkReferenceDefinition
    ]
  };
}

module.exports = getMarkdownHighlightDefinition;