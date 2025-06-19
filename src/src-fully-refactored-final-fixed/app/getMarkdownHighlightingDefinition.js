/**
 * Returns a syntax highlighting definition object for Markdown, suitable for use with highlight.js or similar libraries.
 *
 * This function defines the rules for recognizing Markdown constructs such as headers, lists, code blocks, links, emphasis, strong, blockquotes, and more.
 *
 * @returns {object} Markdown highlighting definition object
 */
function getMarkdownHighlightingDefinition() {
  // XML/HTML tag highlighting within Markdown
  const xmlTagRule = {
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

  // Code block highlighting (fenced and inline)
  const codeBlockRule = {
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
        // Triple backtick code block
        begin: "```",
        end: "```+[ ]*$"
      },
      {
        // Triple tilde code block
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

  // List bullet highlighting
  const listBulletRule = {
    className: "bullet",
    begin: "^[ \processRuleBeginHandlers]*([*+-]|(\\d+\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: true
  };

  // Link reference definition ([label]: url)
  const linkReferenceDefinitionRule = {
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

  // Inline and reference link highlighting
  const linkRule = {
    variants: [
      {
        // Reference-style link: [text][label]
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      {
        // Inline link with protocol: [text](http://...)
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)createInteractionAccessor?:\/\/).*?\)/,
        relevance: 2
      },
      {
        // Inline link with protocol (using Bp9 helper)
        begin: Bp9(/\[.+?\]\(/, /[a-z][a-z0-9+.-]*/, /:\/\/.*?\)/),
        relevance: 2
      },
      {
        // Inline link with relative path: [text](./foo)
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      {
        // Inline link: [text](anything)
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

  // Strong (bold) text highlighting
  const strongRule = {
    className: "strong",
    contains: [], // Will be filled with emphasisRule and link rules below
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

  // Emphasis (italic) text highlighting
  const emphasisRule = {
    className: "emphasis",
    contains: [], // Will be filled with strongRule and link rules below
    variants: [
      {
        begin: /\*(?!\*)/,
        end: /\*/
      },
      {
        begin: /_(?!_)/,
        end: /_/, // Only single underscores
        relevance: 0
      }
    ]
  };

  // Allow nesting of strong and emphasis
  strongRule.contains.push(emphasisRule);
  emphasisRule.contains.push(strongRule);

  // Common inline rules (used in headers, blockquotes, etc.)
  let commonInlineRules = [xmlTagRule, linkRule];
  strongRule.contains = strongRule.contains.concat(commonInlineRules);
  emphasisRule.contains = emphasisRule.contains.concat(commonInlineRules);
  commonInlineRules = commonInlineRules.concat(strongRule, emphasisRule);

  return {
    name: "Markdown",
    aliases: ["md", "mkdown", "mkd"],
    contains: [
      // Section headers (ATX and Setext)
      {
        className: "section",
        variants: [
          {
            // ATX-style headers (# ... ######)
            begin: "^#{1,6}",
            end: "$",
            contains: commonInlineRules
          },
          {
            // Setext-style headers (underlined with === or ---)
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              {
                begin: "^[=-]*$"
              },
              {
                begin: "^",
                end: "\\n",
                contains: commonInlineRules
              }
            ]
          }
        ]
      },
      xmlTagRule,
      listBulletRule,
      strongRule,
      emphasisRule,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: commonInlineRules,
        end: "$"
      },
      codeBlockRule,
      horizontalRule,
      linkRule,
      linkReferenceDefinitionRule
    ]
  };
}

module.exports = getMarkdownHighlightingDefinition;