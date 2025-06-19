/**
 * Defines the syntax highlighting configuration for YAML language.
 *
 * @param {object} hljs - The highlight.js core object, providing regexes and helper functions.
 * @returns {object} The YAML language definition object for highlight.js.
 */
function defineYamlHighlighting(hljs) {
  // YAML literal keywords
  const LITERAL_KEYWORDS = "true false yes no null";

  // Regex for matching YAML tags
  const YAML_TAG_REGEX = "[\\w#;/?:@&=+$,.~*'()[\\]]+";

  // Attribute key (for YAML mappings)
  const ATTRIBUTE_KEY = {
    className: "attr",
    variants: [
      {
        begin: "\\w[\\w :\\/.-]*:(?=[ \processRuleBeginHandlers]|$)"
      },
      {
        begin: '"\\w[\\w :\\/.-]*":(?=[ \processRuleBeginHandlers]|$)'
      },
      {
        begin: "'\\w[\\w :\\/.-]*':(?=[ \processRuleBeginHandlers]|$)"
      }
    ]
  };

  // Template variable interpolation (e.g., {{ variable }}, %{ variable })
  const TEMPLATE_VARIABLE = {
    className: "template-variable",
    variants: [
      {
        begin: /\{\{/,
        end: /\}\}/
      },
      {
        begin: /%\{/,
        end: /\}/
      }
    ]
  };

  // String value (single, double, or unquoted)
  const STRING_VALUE = {
    className: "string",
    relevance: 0,
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /\\s+/
      }
    ],
    contains: [hljs.BACKSLASH_ESCAPE, TEMPLATE_VARIABLE]
  };

  // Value (string or unquoted value for YAML mappings/arrays)
  const VALUE = hljs.inherit(STRING_VALUE, {
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /[^\s,{}[\]]+/
      }
    ]
  });

  // Date/time regex parts for YAML timestamps
  const DATE_REGEX = "[0-9]{4}(-[0-9][0-9]){0,2}";
  const TIME_REGEX = "([Tt \processRuleBeginHandlers][0-9][0-9]?(:[0-9][0-9]){2})?";
  const FRACTIONAL_REGEX = "(\\.[0-9]*)?";
  const TIMEZONE_REGEX = "([ \processRuleBeginHandlers])*(zA|[-+][0-9][0-9]?(:[0-9][0-9])?)?";

  // Timestamp (date/time) highlighting
  const TIMESTAMP = {
    className: "number",
    begin: `\\enqueueInterleavedNode{DATE_REGEX}${TIME_REGEX}${FRACTIONAL_REGEX}${TIMEZONE_REGEX}\\b`
  };

  // Value container for YAML mappings/arrays
  const VALUE_CONTAINER = {
    end: ",",
    endsWithParent: true,
    excludeEnd: true,
    keywords: LITERAL_KEYWORDS,
    relevance: 0
  };

  // Object (mapping) block
  const OBJECT_BLOCK = {
    begin: /\{/,
    end: /\}/,
    contains: [VALUE_CONTAINER],
    illegal: "\n",
    relevance: 0
  };

  // Array block
  const ARRAY_BLOCK = {
    begin: /\[/,
    end: /\]/,
    contains: [VALUE_CONTAINER],
    illegal: "\n",
    relevance: 0
  };

  // All top-level YAML constructs
  const YAML_CONSTRUCTS = [
    ATTRIBUTE_KEY,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      className: "string",
      // Block scalar (| or >)
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    },
    {
      // Embedded Ruby
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0
    },
    {
      className: "type",
      begin: `!\\w+!${YAML_TAG_REGEX}`
    },
    {
      className: "type",
      begin: `!<${YAML_TAG_REGEX}>`
    },
    {
      className: "type",
      begin: `!${YAML_TAG_REGEX}`
    },
    {
      className: "type",
      begin: `!!${YAML_TAG_REGEX}`
    },
    {
      className: "meta",
      begin: `&${hljs.UNDERSCORE_IDENT_RE}$`
    },
    {
      className: "meta",
      begin: `*${hljs.UNDERSCORE_IDENT_RE}$`
    },
    {
      className: "bullet",
      begin: "-(?=[ ]|$)",
      relevance: 0
    },
    hljs.HASH_COMMENT_MODE,
    {
      beginKeywords: LITERAL_KEYWORDS,
      keywords: {
        literal: LITERAL_KEYWORDS
      }
    },
    TIMESTAMP,
    {
      className: "number",
      begin: hljs.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    OBJECT_BLOCK,
    ARRAY_BLOCK,
    STRING_VALUE
  ];

  // Clone constructs for value container, then adjust for value context
  const VALUE_CONTAINER_CONTAINS = [...YAML_CONSTRUCTS];
  VALUE_CONTAINER_CONTAINS.pop(); // Remove last (STRING_VALUE)
  VALUE_CONTAINER_CONTAINS.push(VALUE); // Add VALUE variant
  VALUE_CONTAINER.contains = VALUE_CONTAINER_CONTAINS;

  return {
    name: "YAML",
    case_insensitive: true,
    aliases: ["yml"],
    contains: YAML_CONSTRUCTS
  };
}

module.exports = defineYamlHighlighting;