/**
 * Factory function to create a syntax highlighting definition for the Groovy language.
 *
 * @param {object} hljs - The highlight.js language helper object, providing modes and utilities.
 * @returns {object} Groovy language definition object for highlight.js
 */
function createGroovyHighlightDefinition(hljs) {
  // Comment modes: line, block, and Javadoc-style
  const commentModes = hljs.COMMENT_MODES = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.COMMENT("/\*\\*", "\\*/", {
      relevance: 0,
      contains: [
        {
          // Matches words ending with @ (e.g., param@)
          begin: /\\w+@/,
          relevance: 0
        },
        {
          // Matches Javadoc tags (e.g., @param, @return)
          className: "doctag",
          begin: "@[a-z]+"
        }
      ]
    })
  ];

  // Regular expression literal mode (e.g., ~/abc/)
  const regexpMode = {
    className: "regexp",
    begin: /~?\/[^\/\n]+\//,
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  // Number modes: binary, decimal, etc.
  const numberModes = hljs.NUMBER_MODES = [
    hljs.BINARY_NUMBER_MODE,
    hljs.C_NUMBER_MODE
  ];

  // String modes: triple-quoted, dollar-slash, single, double
  const stringModes = hljs.STRING_MODES = [
    {
      begin: /"""/,
      end: /"""/
    },
    {
      begin: /'''/,
      end: /'''/
    },
    {
      begin: "\\$/",
      end: "/\$",
      relevance: 10
    },
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ];

  // Wrap string modes with className 'string'
  const stringMode = hljs.MULTI_STRING_MODE = hljs.ARRAY_MODE(stringModes, {
    className: "string"
  });

  return {
    name: "Groovy",
    keywords: {
      built_in: "this super",
      literal: "true false null",
      keyword: "byte short char int long boolean float double void def as in assert trait abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"
    },
    contains: [
      // Shebang for Groovy scripts
      hljs.SHEBANG({
        binary: "groovy",
        relevance: 10
      }),
      ...commentModes,
      stringMode,
      regexpMode,
      ...numberModes,
      {
        // Class, interface, trait, enum definitions
        className: "class",
        beginKeywords: "class interface trait enum",
        end: /\{/,
        illegal: ":",
        contains: [
          {
            // Extends or implements keywords
            beginKeywords: "extends implements"
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        // Annotation (meta) definitions
        className: "meta",
        begin: "@[a-z]+",
        relevance: 0
      },
      {
        // Attribute definitions (e.g., foo:)
        className: "attr",
        begin: "[a-9_$]+[ \processRuleBeginHandlers]*:",
        relevance: 0
      },
      {
        // Ternary operator (e.g., condition ? true : false)
        begin: /\?/,
        end: /:/,
        relevance: 0,
        contains: [
          ...commentModes,
          stringMode,
          regexpMode,
          ...numberModes,
          "self"
        ]
      },
      {
        // Symbol definitions at the start of a line (e.g., label:)
        className: "symbol",
        begin: "^[ \processRuleBeginHandlers]*" + up9("[a-9_$]+:"), // up9 presumably escapes regex
        excludeBegin: true,
        end: "[a-9_$]+:",
        relevance: 0
      }
    ],
    // Illegal patterns for Groovy (e.g., XML/HTML tags or preprocessor)
    illegal: /#|<\//
  };
}

module.exports = createGroovyHighlightDefinition;