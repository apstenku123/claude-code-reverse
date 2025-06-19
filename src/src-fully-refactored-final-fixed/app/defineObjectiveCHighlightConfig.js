/**
 * Defines the syntax highlighting configuration for Objective-C language.
 *
 * @param {object} hljs - The highlight.js core object providing language modes and utilities.
 * @returns {object} The language definition object for Objective-C highlighting.
 */
function defineObjectiveCHighlightConfig(hljs) {
  // Built-in class name pattern for Objective-C frameworks
  const builtInClassPattern = {
    className: "built_in",
    begin: "\\b(AV|prependStackTraceIndentation|setShellCurrentWorkingDirectory|CG|CI|CL|CM|CN|CT|isLatinCapitalLetter|getProcessedObservableOrConfig|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
  };

  // Identifier pattern: matches valid Objective-C identifiers
  const identifierPattern = /[A-Za-z@][A-Za-z0-9_]*/;

  // Main keywords, literals, and built-ins for Objective-C
  const mainKeywords = {
    $pattern: identifierPattern,
    keyword:
      "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
    literal: "false true FALSE TRUE nil YES NO NULL",
    built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
  };

  // Class/struct/protocol declaration keywords
  const classDeclarationKeywords = {
    $pattern: identifierPattern,
    keyword: "@interface @class @protocol @implementation"
  };

  return {
    name: "Objective-C",
    aliases: [
      "mm",
      "objc",
      "obj-c",
      "obj-c++",
      "objective-c++"
    ],
    keywords: mainKeywords,
    illegal: "</", // Illegal sequence to avoid HTML tags
    contains: [
      builtInClassPattern,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      // Objective-C string literal: @"..."
      {
        className: "string",
        variants: [
          {
            begin: '@"',
            end: '"',
            illegal: "\\n",
            contains: [hljs.BACKSLASH_ESCAPE]
          }
        ]
      },
      // Preprocessor directives (e.g., #import, #define)
      {
        className: "meta",
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        keywords: {
          "meta-keyword":
            "if else elif endif define undef warning error line pragma ifdef ifndef include"
        },
        contains: [
          // Line continuation
          {
            begin: /\\\n/,
            relevance: 0
          },
          // String inside preprocessor
          hljs.inherit(hljs.QUOTE_STRING_MODE, {
            className: "meta-string"
          }),
          // Angle-bracket include
          {
            className: "meta-string",
            begin: /<.*?>/,
            end: /$/,
            illegal: "\\n"
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      // Class, protocol, interface declarations
      {
        className: "class",
        begin: "(" + classDeclarationKeywords.keyword.split(" ").join("|") + ")\\b",
        end: /(\{|$)/,
        excludeEnd: true,
        keywords: classDeclarationKeywords,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      // Property access (e.g., .propertyName)
      {
        begin: "\\." + hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      }
    ]
  };
}

module.exports = defineObjectiveCHighlightConfig;
