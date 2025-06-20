/**
 * Defines syntax highlighting rules for the Ada programming language for use in a syntax highlighter (e.g., highlight.js).
 *
 * @param {object} hljs - The highlight.js instance, used to define comments and other language constructs.
 * @returns {object} Language definition object for Ada, including keywords, literals, and syntax rules.
 */
function defineAdaHighlighting(hljs) {
  // Regular expression for Ada exponent part (e.g., createDebouncedFunction+10, e-2)
  const EXPONENT_PATTERN = "[eE][-+]?\\d(_|\\d)*";

  // Regular expression for Ada numeric literals (integer and float)
  const NUMBER_PATTERN = "\\d(_|\\d)*(\\.\\d(_|\\d)*)?(" + EXPONENT_PATTERN + ")?";

  // Regular expression for Ada based numeric literals (e.g., 16#FF#)
  const BASED_NUMBER_PATTERN = "\\d(_|\\d)*#\\w+(\\.\\w+)?#(" + EXPONENT_PATTERN + ")?";

  // Combined regex for all Ada number formats
  const NUMBER_REGEX = "\\b(" + BASED_NUMBER_PATTERN + "|" + NUMBER_PATTERN + ")";

  // Regular expression for Ada identifiers (types, variables, etc.)
  const IDENTIFIER_PATTERN = "[a-z](_?[a-z0-9.])*";

  // Characters considered illegal in certain contexts
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
        // Keywords that may end a parameter declaration
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
      keyword: "abort else new return abs elsif not reverse abstract end accept entry select access exception of separate aliased exit or some all others subtype and for out synchronized array function overriding at tagged generic package task begin goto pragma terminate body private then if procedure type case in protected constant interface is raise use declare range delay limited record when delta loop rem while digits renames with do mod requeue xor",
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
            // Escaped double quote inside string
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
        // Ada attribute or symbol (e.g., 'First)
        className: "symbol",
        begin: "'[a-z](_?[a-z0-9.])*"
      },
      {
        // Package declaration (with/without body)
        className: "title",
        begin: "(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?",
        end: "(is|$)",
        keywords: "package body",
        excludeBegin: true,
        excludeEnd: true,
        illegal: ILLEGAL_CHARS
      },
      {
        // Function/procedure declaration
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
            // Return type annotation (e.g., return Integer)
            className: "type",
            begin: "\\breturn\\s+",
            end: "(\\s+|;|$)",
            keywords: "return",
            excludeBegin: true,
            excludeEnd: false,
            endsParent: true,
            illegal: ILLEGAL_CHARS
          }
        ]
      },
      {
        // Type or subtype declaration
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

module.exports = defineAdaHighlighting;