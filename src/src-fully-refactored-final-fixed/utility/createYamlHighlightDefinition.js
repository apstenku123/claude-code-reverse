/**
 * Generates a syntax highlighting definition object for YAML, suitable for use with highlight.js or similar libraries.
 *
 * @param {object} hljs - The highlight.js library instance, providing utility regexes and modes.
 * @returns {object} Highlighting definition object for YAML.
 */
function createYamlHighlightDefinition(hljs) {
  // YAML literal keywords
  const yamlLiterals = "true false yes no null";

  // Regex for matching tag URIs
  const tagUriRegex = "[\\w#;/?:@&=+$,.~*'()[\\]]+";

  // Attribute key (before colon) highlighting
  const attributeKey = {
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

  // Template variable highlighting (e.g. {{variable}} or %{variable})
  const templateVariable = {
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

  // String highlighting (single, double, or unquoted)
  const stringMode = {
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
    contains: [hljs.BACKSLASH_ESCAPE, templateVariable]
  };

  // More permissive string mode for value context (allows more characters)
  const valueStringMode = hljs.inherit(stringMode, {
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

  // Date/time regex components for YAML timestamps
  const dateRegex = "[0-9]{4}(-[0-9][0-9]){0,2}";
  const timeRegex = "([Tt \processRuleBeginHandlers][0-9][0-9]?(:[0-9][0-9]){2})?";
  const fractionRegex = "(\.[0-9]*)?";
  const timezoneRegex = "([ \processRuleBeginHandlers])*(zA|[-+][0-9][0-9]?(:[0-9][0-9])?)?";

  // Timestamp highlighting
  const timestampMode = {
    className: "number",
    begin: `\\enqueueInterleavedNode{dateRegex}${timeRegex}${fractionRegex}${timezoneRegex}\\b`
  };

  // Value context: ends at comma, inherits parent'createInteractionAccessor ending, excludes comma
  const valueContext = {
    end: ",",
    endsWithParent: true,
    excludeEnd: true,
    keywords: yamlLiterals,
    relevance: 0
  };

  // Object (mapping) context
  const objectMode = {
    begin: /\{/,
    end: /\}/,
    contains: [valueContext],
    illegal: "\\n",
    relevance: 0
  };

  // Array context
  const arrayMode = {
    begin: /\[/,
    end: /\]/,
    contains: [valueContext],
    illegal: "\\n",
    relevance: 0
  };

  // Main YAML highlighting rules array
  const yamlContains = [
    attributeKey,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      className: "string",
      // Block style literal/folded (| or >)
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
      begin: `!\\w+!${tagUriRegex}`
    },
    {
      className: "type",
      begin: `!<${tagUriRegex}>`
    },
    {
      className: "type",
      begin: `!${tagUriRegex}`
    },
    {
      className: "type",
      begin: `!!${tagUriRegex}`
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
      beginKeywords: yamlLiterals,
      keywords: {
        literal: yamlLiterals
      }
    },
    timestampMode,
    {
      className: "number",
      begin: hljs.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    objectMode,
    arrayMode,
    stringMode
  ];

  // Clone the main rules array for value context
  const valueContextContains = [...yamlContains];
  // Remove last element (stringMode) and replace with valueStringMode
  valueContextContains.pop();
  valueContextContains.push(valueStringMode);
  // Assign expanded rules to valueContext
  valueContext.contains = valueContextContains;

  // Return the YAML highlighting definition
  return {
    name: "YAML",
    case_insensitive: true,
    aliases: ["yml"],
    contains: yamlContains
  };
}

module.exports = createYamlHighlightDefinition;