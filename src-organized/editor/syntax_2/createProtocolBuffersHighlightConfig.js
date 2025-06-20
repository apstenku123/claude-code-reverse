/**
 * Factory function that creates a syntax highlighting configuration object for Protocol Buffers (protobuf) language.
 * This configuration is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} syntaxHelpers - An object containing syntax highlighting helper modes and utilities.
 *   Expected properties:
 *     - QUOTE_STRING_MODE: Mode for quoted strings
 *     - NUMBER_MODE: Mode for numbers
 *     - C_LINE_COMMENT_MODE: Mode for C-style line comments
 *     - C_BLOCK_COMMENT_MODE: Mode for C-style block comments
 *     - TITLE_MODE: Mode for titles (used for class names)
 *     - inherit: Function to inherit and extend modes
 * @returns {object} Highlight.js language definition for Protocol Buffers
 */
function createProtocolBuffersHighlightConfig(syntaxHelpers) {
  return {
    name: "Protocol Buffers",
    keywords: {
      keyword: "package import option optional required repeated group oneof",
      built_in: "double float int32 int64 uint32 uint64 sint32 sint64 fixed32 fixed64 sfixed32 sfixed64 bool string bytes",
      literal: "true false"
    },
    contains: [
      // String literals
      syntaxHelpers.QUOTE_STRING_MODE,
      // Numeric literals
      syntaxHelpers.NUMBER_MODE,
      // Single-line comments
      syntaxHelpers.C_LINE_COMMENT_MODE,
      // Multi-line comments
      syntaxHelpers.C_BLOCK_COMMENT_MODE,
      // Class-like definitions: message, enum, service
      {
        className: "class",
        beginKeywords: "message enum service",
        end: /\{/, // Ends at opening curly brace
        illegal: /\n/, // Illegal to have a newline before the brace
        contains: [
          // Inherit title mode for the class name, and allow isBlobOrFileLikeObject to continue until parent ends
          syntaxHelpers.inherit(syntaxHelpers.TITLE_MODE, {
            starts: {
              endsWithParent: true,
              excludeEnd: true
            }
          })
        ]
      },
      // Function-like definitions: rpc
      {
        className: "function",
        beginKeywords: "rpc",
        end: /[\{;]/, // Ends at opening curly or semicolon
        excludeEnd: true, // Don'processRuleBeginHandlers include the ending character
        keywords: "rpc returns"
      },
      // Constant definitions (e.g., ENUM_VALUE = ...;)
      {
        begin: /^\s*[a-zA-Z_]+(?=\s*=[^\n]+;$)/
      }
    ]
  };
}

module.exports = createProtocolBuffersHighlightConfig;
