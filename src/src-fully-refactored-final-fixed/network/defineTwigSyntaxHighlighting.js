/**
 * Defines the syntax highlighting configuration for Twig templates, including CraftCMS extensions.
 *
 * @param {object} hljs - The highlight.js library instance, providing COMMENT and other helpers.
 * @returns {object} The syntax highlighting definition object for Twig/CraftCMS.
 */
function defineTwigSyntaxHighlighting(hljs) {
  // Matches parameters inside parentheses, e.g., function calls
  const paramsConfig = {
    className: "params",
    begin: "\\(",
    end: "\\)"
  };

  // Twig functions that can be used as filters or expressions
  const twigFunctionKeywords = "attribute block constant cycle date dump include max min parent random range source template_from_string";

  // Configuration for Twig functions, used as keywords inside filters
  const twigFunctionConfig = {
    beginKeywords: twigFunctionKeywords,
    keywords: {
      name: twigFunctionKeywords
    },
    relevance: 0,
    contains: [paramsConfig]
  };

  // Configuration for Twig filters (e.g., |capitalize)
  const twigFilterConfig = {
    begin: /\|[a-z_]+:?/,
    keywords: "abs batch capitalize column convert_encoding date date_modify default escape filter first format inky_to_html inline_css join json_encode keys last length lower map markdown merge nl2br number_format raw reduce replace reverse round slice sort spaceless split striptags title trim upper url_encode",
    contains: [twigFunctionConfig]
  };

  // Twig block-level keywords (e.g., for, if, block, etc.)
  let twigBlockKeywords = "apply autoescape block deprecated do embed extends filter flush for from if import include macro sandbox set use verbatim with";

  // Add corresponding 'end' keywords for each block keyword (e.g., endfor, endif, endblock, etc.)
  twigBlockKeywords = twigBlockKeywords + " " + twigBlockKeywords.split(" ").map((keyword) => {
    return "end" + keyword;
  }).join(" ");

  return {
    name: "Twig",
    aliases: ["craftcms"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      // Twig comments: {# ... #}
      hljs.COMMENT(/\{#/, /#\}/),
      {
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
              contains: [twigFilterConfig, twigFunctionConfig],
              relevance: 0
            }
          }
        ]
      },
      {
        className: "template-variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: ["self", twigFilterConfig, twigFunctionConfig]
      }
    ]
  };
}

module.exports = defineTwigSyntaxHighlighting;