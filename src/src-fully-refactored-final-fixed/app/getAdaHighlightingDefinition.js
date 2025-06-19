/**
 * Returns the syntax highlighting definition object for the Ada programming language.
 *
 * @param {object} hljs - The highlight.js core object, used to define comments and other language features.
 * @returns {object} The Ada language definition for highlight.js, including keywords, number/string patterns, and parsing rules.
 */
function getAdaHighlightingDefinition(hljs) {
  // Regular expression for Ada exponent part (e.g., createDebouncedFunction+10, e-5)
  const EXPONENT_PATTERN = "[eE][-+]?\\d(_|\\d)*";

  // Regular expression for Ada numeric literals (integer and floating point)
  const NUMBER_PATTERN = "\\d(_|\\d)*(\\.\\d(_|\\d)*)?(" + EXPONENT_PATTERN + ")?";

  // Regular expression for Ada based numeric literals (e.g., 16#FF#)
  const BASED_NUMBER_PATTERN = "\\d(_|\\d)*#\\w+(\\.\\w+)?#(" + EXPONENT_PATTERN + ")?";

  // Combined number regex (either based or normal number)
  const NUMBER_REGEX = "\\b(" + BASED_NUMBER_PATTERN + "|" + NUMBER_PATTERN + ")";

  // Regular expression for Ada identifiers
  const IDENTIFIER_PATTERN = "[a-z](_?[a-z0-9.])*";

  // Characters that are illegal in certain Ada contexts
  const ILLEGAL_CHARS = "[]\\{\\}%#'\"";

  // Ada single-line comment definition (starts with --)
  const adaComment = hljs.COMMENT("--", "$", {
    relevance: 0
  });

  // Ada parameter type annotation (e.g., : Integer)
  const parameterTypeAnnotation = {
    begin: "\\s+:\\s+",
    end: "\\s*(:=|;|\\)|=>|$)",
    illegal: ILLEGAL_CHARS,
    contains: [
      {
        beginKeywords: "loop for declare others",
        endsParent: true
      },
      {
        className: "keyword",
        beginKeywords: "not null constant access function procedure in out aliased exception"
      },
      {
        className: "type",
        begin: IDENTIFIER_PATTERN,
        endsParent: true,
        relevance: 0
      }
    ]
  };

  return {
    name: "Ada",
    case_insensitive: true,
    keywords: {
      keyword:
        "abort else new return abs elsif not reverse abstract end accept entry select access exception of separate aliased exit or some all others subtype and for out synchronized array function overriding at tagged generic package task begin goto pragma terminate body private then if procedure type case in protected constant interface is raise use declare range delay limited record when delta loop rem while digits renames with do mod requeue xor",
      literal: "True False"
    },
    contains: [
      adaComment,
      {
        // Double-quoted string literal
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [
          {
            // Escaped double quote
            begin: /""/,
            relevance: 0
          }
        ]
      },
      {
        // Single-quoted character literal
        className: "string",
        begin: /'.'/
      },
      {
        // Numeric literals (integer, float, based)
        className: "number",
        begin: NUMBER_REGEX,
        relevance: 0
      },
      {
        // Ada symbol (e.g., 'Identifier)
        className: "symbol",
        begin: "'[a-z](_?[a-z0-9.])*"
      },
      {
        // Ada package declaration title
        className: "title",
        begin: "(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?",
        end: "(is|$)",
        keywords: "package body",
        excludeBegin: true,
        excludeEnd: true,
        illegal: ILLEGAL_CHARS
      },
      {
        // Ada function/procedure declaration
        begin: "(\\b(with|overriding)\\s+)?\\b(function|procedure)\\s+",
        end: "(\\bis|\\bwith|\\brenames|\\)\\s*;)",
        keywords: "overriding function procedure with is renames return",
        returnBegin: true,
        contains: [
          adaComment,
          {
            // Function/procedure name
            className: "title",
            begin: "(\\bwith\\s+)?\\b(function|procedure)\\s+",
            end: "(\\(|\\s+|$)",
            excludeBegin: true,
            excludeEnd: true,
            illegal: ILLEGAL_CHARS
          },
          parameterTypeAnnotation,
          {
            // Return type annotation
            className: "type",
            begin: "\\breturn\\s+",
            end: "(\\s+|;|$)",
            keywords: "return",
            excludeBegin: true,
            excludeEnd: true,
            endsParent: true,
            illegal: ILLEGAL_CHARS
          }
        ]
      },
      {
        // Ada type or subtype declaration
        className: "type",
        begin: "\\b(sub)?type\\s+",
        end: "\\s+",
        keywords: "type",
        excludeBegin: true,
        illegal: ILLEGAL_CHARS
      },
      parameterTypeAnnotation
    ]
  };
}

module.exports = getAdaHighlightingDefinition;