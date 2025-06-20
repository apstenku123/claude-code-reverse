/**
 * Creates a syntax highlighting definition for QML (Qt Modeling Language) for use with highlight.js or similar libraries.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and regexes.
 * @returns {object} The QML language definition object for highlight.js.
 */
function createQmlHighlightDefinition(hljs) {
  // QML language keywords, literals, and built-in objects/functions
  const qmlKeywords = {
    keyword: "in of on if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await import",
    literal: "true false null undefined NaN Infinity",
    built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int8Array Uint16Array Uint32Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Behavior bool color coordinate date double enumeration font geocircle georectangle geoshape int list matrix4x4 parent point quaternion real rect size string url variant vector2d vector3d vector4d Promise"
  };

  // Identifier regex for QML (allows dot notation)
  const qmlIdentifier = "[a-zA-Z_][a-zA-Z0-9\\._]*";

  // QML 'property' keyword highlighting
  const propertyKeyword = {
    className: "keyword",
    begin: "\\bproperty\\b",
    starts: {
      className: "string",
      end: "(:|=|;|,|//|/\*|$)",
      returnEnd: true
    }
  };

  // QML 'signal' keyword highlighting
  const signalKeyword = {
    className: "keyword",
    begin: "\\bsignal\\b",
    starts: {
      className: "string",
      end: "(\\(|:|=|;|,|//|/\*|$)",
      returnEnd: true
    }
  };

  // QML 'id' attribute highlighting
  const idAttribute = {
    className: "attribute",
    begin: "\\bid\\s*:",
    starts: {
      className: "string",
      end: qmlIdentifier,
      returnEnd: false
    }
  };

  // QML generic attribute highlighting (e.g., property: value)
  const genericAttribute = {
    begin: qmlIdentifier + "\\s*:",
    returnBegin: true,
    contains: [
      {
        className: "attribute",
        begin: qmlIdentifier,
        end: "\\s*:",
        excludeEnd: true,
        relevance: 0
      }
    ],
    relevance: 0
  };

  // QML object definition highlighting (e.g., Rectangle { ... })
  const objectDefinition = {
    begin: concatenatePatternSources(qmlIdentifier, /\s*\{/), // concatenatePatternSources is assumed to be a helper function for regex concatenation
    end: /\{/,
    returnBegin: true,
    relevance: 0,
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: qmlIdentifier
      })
    ]
  };

  return {
    name: "QML",
    aliases: ["qt"],
    case_insensitive: false,
    keywords: qmlKeywords,
    contains: [
      // 'use strict' or 'use asm' meta directives
      {
        className: "meta",
        begin: /^\s*['"]use (strict|asm)['"]/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      // Template strings with embedded expressions
      {
        className: "string",
        begin: "`",
        end: "`",
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: "subst",
            begin: "\\$\\{",
            end: "\\}"
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // Number literals (binary, octal, decimal)
      {
        className: "number",
        variants: [
          { begin: "\\b(0[bB][01]+)" },
          { begin: "\\b(0[oO][0-7]+)" },
          { begin: hljs.C_NUMBER_RE }
        ],
        relevance: 0
      },
      // Handling regular expressions after certain keywords or operators
      {
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE,
          {
            begin: /</,
            end: />\s*[);\]]/,
            relevance: 0,
            subLanguage: "xml"
          }
        ],
        relevance: 0
      },
      signalKeyword,
      propertyKeyword,
      // Function definitions
      {
        className: "function",
        beginKeywords: "function",
        end: /\{/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[a-z$_][0-9A-zA-z$_]*/
          }),
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
          }
        ],
        illegal: /\[|%/
      },
      // Member access (e.g., .property)
      {
        begin: "\." + hljs.IDENT_RE,
        relevance: 0
      },
      idAttribute,
      genericAttribute,
      objectDefinition
    ],
    illegal: /#/
  };
}

module.exports = createQmlHighlightDefinition;