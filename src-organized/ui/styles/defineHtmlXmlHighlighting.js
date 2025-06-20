/**
 * Defines syntax highlighting rules for HTML and XML-like languages.
 *
 * This function configures a set of highlighting rules for use with a syntax highlighter, such as highlight.js.
 * It supports HTML, XML, and related formats, including embedded CSS and JavaScript.
 *
 * @param {object} hljs - The syntax highlighting library instance (e.g., highlight.js core object).
 * @returns {object} Highlighting definition object for HTML/XML and related languages.
 */
function defineHtmlXmlHighlighting(hljs) {
  // Matches tag names and attribute names (e.g., <TAG:NAME> or <TAG-NAME>)
  const TAG_NAME_PATTERN = pP(
    /[a-zA-Z_]/,
    ad9(/[a-zA-Z0-9_.-]*:/),
    /[a-zA-Z0-9_.-]*/
  );

  // Matches attribute names (letters, digits, dot, underscore, colon, hyphen)
  const ATTRIBUTE_NAME_PATTERN = /[a-zA-Z0-9._:-]+/;

  // Matches HTML/XML entities (e.g., &amp;, &#123;, &#x1A;)
  const ENTITY_PATTERN = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-fA-F0-9]+;/
  };

  // Matches meta keywords inside tags (e.g., DOCTYPE, !ELEMENT)
  const META_KEYWORD_CONTAINER = {
    begin: /\\s/,
    contains: [
      {
        className: "meta-keyword",
        begin: /#?[a-z_][a-z0-9_-]+/,
        illegal: /\n/
      }
    ]
  };

  // Matches meta sections inside parentheses (e.g., <!ELEMENT (foo)>)
  const META_PAREN_SECTION = hljs.inherit(META_KEYWORD_CONTAINER, {
    begin: /\(/,
    end: /\)/
  });

  // Single-quoted meta string (e.g., 'foo')
  const META_APOS_STRING = hljs.inherit(hljs.APOS_STRING_MODE, {
    className: "meta-string"
  });

  // Double-quoted meta string (e.g., "foo")
  const META_QUOTE_STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    className: "meta-string"
  });

  // Attribute assignment and value patterns inside tags
  const TAG_ATTRIBUTE_CONTAINER = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: ATTRIBUTE_NAME_PATTERN,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [ENTITY_PATTERN]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [ENTITY_PATTERN]
              },
              {
                begin: /[^\s"'=<>`]+/
              }
            ]
          }
        ]
      }
    ]
  };

  return {
    name: "HTML, XML",
    aliases: [
      "html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"
    ],
    case_insensitive: true,
    contains: [
      // Meta tags (e.g., <!DOCTYPE ...>)
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          META_KEYWORD_CONTAINER,
          META_QUOTE_STRING,
          META_APOS_STRING,
          META_PAREN_SECTION,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  META_KEYWORD_CONTAINER,
                  META_PAREN_SECTION,
                  META_QUOTE_STRING,
                  META_APOS_STRING
                ]
              }
            ]
          }
        ]
      },
      // HTML comments
      hljs.COMMENT(/<!--/, /-->/, { relevance: 10 }),
      // CDATA sections
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      // Entities (e.g., &amp;, &#123;, ...)
      ENTITY_PATTERN,
      // XML declaration (e.g., <?xml ... ?>)
      {
        className: "meta",
        begin: /<\?xml/,
        end: /\?>/,
        relevance: 10
      },
      // <style> tag with embedded CSS
      {
        className: "tag",
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [TAG_ATTRIBUTE_CONTAINER],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: ["css", "xml"]
        }
      },
      // <script> tag with embedded JavaScript/Handlebars
      {
        className: "tag",
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [TAG_ATTRIBUTE_CONTAINER],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: ["javascript", "handlebars", "xml"]
        }
      },
      // Empty tag (e.g., <>) or closing empty tag (e.g., </>)
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // Opening tag (e.g., <div ...>)
      {
        className: "tag",
        begin: pP(
          /</,
          qOA(pP(TAG_NAME_PATTERN, sd9(/\/>/, />/, /\s/)))
        ),
        end: /\/?\>/,
        contains: [
          {
            className: "name",
            begin: TAG_NAME_PATTERN,
            relevance: 0,
            starts: TAG_ATTRIBUTE_CONTAINER
          }
        ]
      },
      // Closing tag (e.g., </div>)
      {
        className: "tag",
        begin: pP(/<\//, qOA(pP(TAG_NAME_PATTERN, />/))),
        contains: [
          {
            className: "name",
            begin: TAG_NAME_PATTERN,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: true
          }
        ]
      }
    ]
  };
}

module.exports = defineHtmlXmlHighlighting;