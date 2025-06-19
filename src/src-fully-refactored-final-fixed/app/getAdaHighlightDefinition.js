/**
 * Returns the syntax highlighting definition for the Ada programming language for highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, used to define comments and other language features.
 * @returns {object} The Ada language definition object for highlight.js.
 */
function getAdaHighlightDefinition(hljs) {
  // Regular expression for Ada exponent part (e.g., createDebouncedFunction+10)
  const exponentPattern = "[eE][-+]?\\d(_|\\d)*";

  // Regular expression for Ada numeric literals (integer and floating point)
  const numberPattern = "\\d(_|\\d)*(\\.\\d(_|\\d)*)?(" + exponentPattern + ")?";

  // Regular expression for Ada based numeric literals (e.g., 16#FF#)
  const basedNumberPattern = "\\d(_|\\d)*#\\w+(\\.\\w+)?#(" + exponentPattern + ")?";

  // Complete number regex (either based or regular number)
  const adaNumberRegex = "\\b(" + basedNumberPattern + "|" + numberPattern + ")";

  // Regular expression for Ada identifiers
  const identifierPattern = "[a-z](_?[a-z0-9.])*";

  // Characters considered illegal in some contexts
  const illegalChars = "[]\\{\\}%#'\"";

  // Ada single-line comment definition
  const adaComment = hljs.COMMENT("--", "$", {
    relevance: 0
  });

  // Ada parameter mode/type definition (for function/procedure signatures)
  const parameterMode = {
    begin: "\\s+:\\s+",
    end: "\\s*(:=|;|\\)|=>|$)",
    illegal: illegalChars,
    contains: [
      {
        // Keywords that end the parent context
        beginKeywords: "loop for declare others",
        endsParent: true
      },
      {
        className: "keyword",
        beginKeywords: "not null constant access function procedure in out aliased exception"
      },
      {
        className: "type",
        begin: identifierPattern,
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
        // Character literal
        className: "string",
        begin: /'.'/
      },
      {
        // Number literal (integer, float, or based)
        className: "number",
        begin: adaNumberRegex,
        relevance: 0
      },
      {
        // Symbol (e.g., 'Some_Symbol)
        className: "symbol",
        begin: "'[a-z](_?[a-z0-9.])*"
      },
      {
        // Package declaration (with optional body)
        className: "title",
        begin: "(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?",
        end: "(is|$)",
        keywords: "package body",
        excludeBegin: true,
        excludeEnd: true,
        illegal: illegalChars
      },
      {
        // Function or procedure declaration
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
            illegal: illegalChars
          },
          parameterMode,
          {
            // Return type
            className: "type",
            begin: "\\breturn\\s+",
            end: "(\\s+|;|$)",
            keywords: "return",
            excludeBegin: true,
            excludeEnd: false,
            endsParent: true,
            illegal: illegalChars
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
        illegal: illegalChars
      },
      parameterMode
    ]
  };
}

module.exports = getAdaHighlightDefinition;
