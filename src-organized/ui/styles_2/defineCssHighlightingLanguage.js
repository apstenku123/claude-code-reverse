/**
 * Defines the syntax highlighting configuration for CSS language.
 *
 * @param {object} hljs - The highlight.js instance or language definition utilities.
 * @returns {object} CSS language definition object for syntax highlighting.
 *
 * This function sets up rules for CSS syntax highlighting, including selectors, properties,
 * pseudo-classes, at-rules, comments, numbers, strings, and more. It leverages helper modes
 * and lists of keywords, attributes, and pseudo-selectors to build a comprehensive highlighting schema.
 */
function defineCssHighlightingLanguage(hljs) {
  // Get common CSS highlight modes (e.g., !important, hex colors, attribute selectors)
  const cssHighlightModes = getCssHighlightModes(hljs);

  // Mode for built-in CSS functions (e.g., rgb(), url())
  const builtInFunctionMode = {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  };

  // Mode for vendor-prefixed properties (e.g., -webkit-, -moz-)
  const vendorPrefixMode = {
    begin: /-(webkit|moz|ms|processSubLanguageHighlighting)-(?=[a-z])/ // Matches vendor prefixes
  };

  // List of CSS media query keywords
  const mediaQueryKeywords = "and or not only";

  // Regex for matching at-rules (e.g., @media, @keyframes)
  const atRulePattern = /@-?\w[\w]*(-\w+)*/;

  // Regex for valid CSS identifiers (e.g., class, id, tag names)
  const cssIdentifierPattern = "[a-zA-][a-zA-Z0-9_-]*";

  // String modes (single and double quotes)
  const stringModes = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];

  return {
    name: "CSS",
    case_insensitive: true,
    illegal: /[=|'\$]/, // Illegal characters in CSS outside of strings
    keywords: {
      keyframePosition: "from to"
    },
    classNameAliases: {
      keyframePosition: "selector-tag"
    },
    contains: [
      // Block comments (/* ... */)
      hljs.C_BLOCK_COMMENT_MODE,
      // Vendor prefixes
      vendorPrefixMode,
      // Numbers (e.g., 10px, 1.5em)
      hljs.CSS_NUMBER_MODE,
      // updateSnapshotAndNotify selectors (e.g., #main)
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      // Class selectors (e.g., .container)
      {
        className: "selector-class",
        begin: "\\." + cssIdentifierPattern,
        relevance: 0
      },
      // Attribute selectors ([type="text"])
      cssHighlightModes.ATTRIBUTE_SELECTOR_MODE,
      // Pseudo-selectors (:hover, ::before)
      {
        className: "selector-pseudo",
        variants: [
          {
            begin: ":(" + pseudoClassesList.join("|") + ")" // :hover, :active, etc.
          },
          {
            begin: "::(" + pseudoElementsList.join("|") + ")" // ::before, ::after, etc.
          }
        ]
      },
      // CSS property names (e.g., color, margin)
      {
        className: "attribute",
        begin: "\\b(" + cssPropertiesList.join("|") + ")\\b"
      },
      // CSS property values (e.g., color: red;)
      {
        begin: ":",
        end: "[;}]",
        contains: [
          cssHighlightModes.HEXCOLOR,
          cssHighlightModes.IMPORTANT,
          hljs.CSS_NUMBER_MODE,
          ...stringModes,
          // url() and data-uri() functions
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            keywords: {
              built_in: "url data-uri"
            },
            contains: [
              {
                className: "string",
                begin: /[^)]/,
                endsWithParent: true,
                excludeEnd: true
              }
            ]
          },
          builtInFunctionMode
        ]
      },
      // At-rules (e.g., @media, @import)
      {
        begin: buildAtRuleRegex(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        contains: [
          // At-rule keyword (e.g., @media)
          {
            className: "keyword",
            begin: atRulePattern
          },
          // Media query expressions (e.g., screen and (max-width: 600px))
          {
            begin: /\\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: mediaQueryKeywords,
              attribute: mediaAttributesList.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...stringModes,
              hljs.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      // Tag selectors (e.g., div, span)
      {
        className: "selector-tag",
        begin: "\\b(" + tagNamesList.join("|") + ")\\b"
      }
    ]
  };
}

module.exports = defineCssHighlightingLanguage;
