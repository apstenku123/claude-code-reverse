/**
 * Returns the syntax highlighting definition for the Vala programming language.
 *
 * @param {object} hljs - The highlight.js core library object, which provides language modes and utilities.
 * @returns {object} The language definition object for Vala, including keywords, built-ins, literals, and syntax highlighting rules.
 */
function getValaLanguageDefinition(hljs) {
  return {
    name: "Vala",
    keywords: {
      keyword:
        "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override virtual delegate if while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
      built_in: "DBus GLib CCode Gee Object Gtk Posix",
      literal: "false true null"
    },
    contains: [
      {
        className: "class",
        // Matches class, interface, or namespace declarations
        beginKeywords: "class interface namespace",
        end: /\{/, // Ends at the opening curly brace
        excludeEnd: true, // Exclude the curly brace from the match
        illegal: "[^,:\n\s\.]", // Illegal characters in class declarations
        contains: [hljs.UNDERSCORE_TITLE_MODE] // Highlights the class/interface/namespace name
      },
      hljs.C_LINE_COMMENT_MODE, // Single-line comments (// ...)
      hljs.C_BLOCK_COMMENT_MODE, // Block comments (/* ... */)
      {
        className: "string",
        begin: '"""', // Triple-quoted string start
        end: '"""', // Triple-quoted string end
        relevance: 5 // High relevance for triple-quoted strings
      },
      hljs.APOS_STRING_MODE, // Single-quoted strings
      hljs.QUOTE_STRING_MODE, // Double-quoted strings
      hljs.C_NUMBER_MODE, // Numeric literals
      {
        className: "meta",
        begin: "^#", // Preprocessor directives (e.g., #if, #define)
        end: "$",
        relevance: 2
      }
    ]
  };
}

module.exports = getValaLanguageDefinition;
