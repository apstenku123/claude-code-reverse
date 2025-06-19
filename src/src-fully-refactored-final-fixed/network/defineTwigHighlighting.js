/**
 * Defines syntax highlighting rules for Twig templates, suitable for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing utility functions for defining highlighting rules.
 * @returns {object} Highlight.js language definition object for Twig.
 */
function defineTwigHighlighting(hljs) {
  // Define a parameter group for function calls (e.g., foo(bar))
  const paramsGroup = {
    className: "params",
    begin: "\\(",
    end: "\\)"
  };

  // List of Twig function names that can be used as filters or expressions
  const twigFunctionNames = "attribute block constant cycle date dump include max min parent random range source template_from_string";

  // Highlighting rule for Twig functions, e.g., {{ date(foo) }}
  const twigFunctionRule = {
    beginKeywords: twigFunctionNames,
    keywords: {
      name: twigFunctionNames
    },
    relevance: 0,
    contains: [paramsGroup]
  };

  // Highlighting rule for Twig filters, e.g., {{ foo|date }}
  const twigFilterRule = {
    begin: /\|[a-z_]+:?/,
    keywords: "abs batch capitalize column convert_encoding date date_modify default escape filter first format inky_to_html inline_css join json_encode keys last length lower map markdown merge nl2br number_format raw reduce replace reverse round slice sort spaceless split striptags title trim upper url_encode",
    contains: [twigFunctionRule]
  };

  // List of Twig block keywords
  let twigBlockKeywords = "apply autoescape block deprecated do embed extends filter flush for from if import include macro sandbox set use verbatim with";

  // Add corresponding 'end' keywords for each block keyword (e.g., 'endblock', 'endfor')
  twigBlockKeywords = twigBlockKeywords + " " + twigBlockKeywords.split(" ").map(keyword => `end${keyword}`).join(" ");

  return {
    name: "Twig",
    aliases: ["craftcms"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      // Twig comments: {# ... #}
      hljs.COMMENT(/\{#/, /#\}/),
      {
        // Twig template tags: {% ... %}
        className: "template-tag",
        begin: /\{%/,
        end: /%\}/,
        contains: [
          {
            className: "name",
            begin: /\\w+/,
            keywords: twigBlockKeywords,
            starts: {
              endsWithParent: true,
              contains: [twigFilterRule, twigFunctionRule],
              relevance: 0
            }
          }
        ]
      },
      {
        // Twig template variables: {{ ... }}
        className: "template-variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: ["self", twigFilterRule, twigFunctionRule]
      }
    ]
  };
}

module.exports = defineTwigHighlighting;