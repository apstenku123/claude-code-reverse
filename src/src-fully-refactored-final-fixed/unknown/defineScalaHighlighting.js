/**
 * Defines syntax highlighting rules for the Scala programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common language modes and utilities.
 * @returns {object} An object describing Scala language highlighting configuration for highlight.js.
 */
function defineScalaHighlighting(hljs) {
  // Meta annotations (e.g., @Annotation)
  const metaAnnotation = {
    className: "meta",
    begin: "@[a-z]+"
  };

  // Substitution patterns for string interpolation (e.g., $var, ${expr})
  const substitution = {
    className: "subst",
    variants: [
      {
        begin: "\\$[a-z0-9_]+"
      },
      {
        begin: /\$\{/,
        end: /\}/
      }
    ]
  };

  // String patterns, including triple-quoted and interpolated strings
  const stringModes = {
    className: "string",
    variants: [
      {
        begin: '"""',
        end: '"""'
      },
      {
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '[a-z]+"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE, substitution]
      },
      {
        className: "string",
        begin: '[a-z]+"""',
        end: '"""',
        contains: [substitution],
        relevance: 10
      }
    ]
  };

  // Symbol literals (e.g., 'symbol)
  const symbolLiteral = {
    className: "symbol",
    begin: "'\\w[\\w\\d_]*(?!')"
  };

  // Type names (e.g., MyType)
  const typeName = {
    className: "type",
    begin: "\\b[a-zA][a-z0-9_]*",
    relevance: 0
  };

  // Title (identifier) for classes, traits, objects, etc.
  const titleIdentifier = {
    className: "title",
    begin: /[^0-9\n\processRuleBeginHandlers "'(),.\`{}\[\]:;][^\n\processRuleBeginHandlers "'(),.\`{}\[\]:;]+|[^0-9\n\processRuleBeginHandlers "'(),.\`{}\[\]:;=]/,
    relevance: 0
  };

  // Class, trait, object, type definitions
  const classDefinition = {
    className: "class",
    beginKeywords: "class object trait type",
    end: /[:={\[\n;]/,
    excludeEnd: true,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        beginKeywords: "extends with",
        relevance: 10
      },
      {
        // Type parameter list (e.g., [a, createPropertyAccessor])
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0,
        contains: [typeName]
      },
      {
        // Constructor parameter list (e.g., (x: Int))
        className: "params",
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0,
        contains: [typeName]
      },
      titleIdentifier
    ]
  };

  // Function definitions (e.g., def foo)
  const functionDefinition = {
    className: "function",
    beginKeywords: "def",
    end: /[:={\[(\n;]/,
    excludeEnd: true,
    contains: [titleIdentifier]
  };

  return {
    name: "Scala",
    keywords: {
      literal: "true false null",
      keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      stringModes,
      symbolLiteral,
      typeName,
      functionDefinition,
      classDefinition,
      hljs.C_NUMBER_MODE,
      metaAnnotation
    ]
  };
}

module.exports = defineScalaHighlighting;