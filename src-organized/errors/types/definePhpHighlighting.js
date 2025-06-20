/**
 * Defines PHP syntax highlighting rules for a syntax highlighter engine.
 *
 * @param {object} hljs - The syntax highlighting engine instance, expected to provide helper modes and methods.
 * @returns {object} Highlight.js language definition object for PHP.
 */
function definePhpHighlighting(hljs) {
  // Variable pattern: PHP variables start with $ and follow specific naming rules
  const variablePattern = {
    className: "variable",
    begin: "\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*" + "(?![a-9])(?![$])"
  };

  // Meta pattern: PHP opening/closing tags (<?php, <?, ?>)
  const metaPattern = {
    className: "meta",
    variants: [
      {
        begin: /<\?php/,
        relevance: 10
      },
      {
        begin: /<\?[=]?/
      },
      {
        begin: /\?>/
      }
    ]
  };

  // Substitution/interpolation inside strings (e.g., $var, {$var})
  const substitutionPattern = {
    className: "subst",
    variants: [
      {
        begin: /\$\w+/
      },
      {
        begin: /\{\$/,
        end: /\}/
      }
    ]
  };

  // Single-quoted string mode, allowing all content
  const singleQuotedString = hljs.inherit(hljs.APOS_STRING_MODE, {
    illegal: null
  });

  // Double-quoted string mode, allowing interpolation
  const doubleQuotedString = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(substitutionPattern)
  });

  // Heredoc/Nowdoc string mode
  const heredocString = hljs.END_SAME_AS_BEGIN({
    begin: /<<<[ \processRuleBeginHandlers]*(\w+)\n/,
    end: /[ \processRuleBeginHandlers]*(\w+)\b/,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(substitutionPattern)
  });

  // String variants: b'...', b"...", normal strings, heredoc/nowdoc
  const stringPattern = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, metaPattern],
    variants: [
      hljs.inherit(singleQuotedString, {
        begin: "b'",
        end: "'"
      }),
      hljs.inherit(doubleQuotedString, {
        begin: 'b"',
        end: '"'
      }),
      doubleQuotedString,
      singleQuotedString,
      heredocString
    ]
  };

  // Number patterns: binary, octal, hex, decimal, floats
  const numberPattern = {
    className: "number",
    variants: [
      {
        begin: "\\b0b[01]+(?:_[01]+)*\\b"
      },
      {
        begin: "\\b0o[0-7]+(?:_[0-7]+)*\\b"
      },
      {
        begin: "\\b0x[\\da-f]+(?:_[\\da-f]+)*\\b"
      },
      {
        begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\b\\.\\d+)(?:e[+-]?\\d+)?"
      }
    ],
    relevance: 0
  };

  // PHP keywords, literals, and built-ins
  const phpKeywords = {
    keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 mixed new object or private protected public real return string switch throw trait try unset use var void while xor yield",
    literal: "false null true",
    built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException UnhandledMatchError ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Stringable Throwable Traversable WeakReference WeakMap Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
  };

  return {
    aliases: ["php3", "php4", "php5", "php6", "php7", "php8"],
    case_insensitive: true,
    keywords: phpKeywords,
    contains: [
      // Single-line hash comments
      hljs.HASH_COMMENT_MODE,
      // Single-line double-slash comments with meta highlighting
      hljs.COMMENT("//", "$", {
        contains: [metaPattern]
      }),
      // Multi-line comments with doctag highlighting
      hljs.COMMENT("/\*", "\\*/", {
        contains: [
          {
            className: "doctag",
            begin: "@[a-z]+"
          }
        ]
      }),
      // Special __halt_compiler comment
      hljs.COMMENT("__halt_compiler.+?;", false, {
        endsWithParent: true,
        keywords: "__halt_compiler"
      }),
      // PHP meta tags
      metaPattern,
      // $this keyword
      {
        className: "keyword",
        begin: /\$this\b/
      },
      // PHP variable
      variablePattern,
      // Class member access (:: or ->)
      {
        begin: /(::|->)+[A-Za-z_\x7f-\xff][A-Za-z0-9_\x7f-\xff]*/
      },
      // Function definitions
      {
        className: "function",
        relevance: 0,
        beginKeywords: "fn function",
        end: /[;{]/,
        excludeEnd: true,
        illegal: "[$%\\[]",
        contains: [
          { beginKeywords: "use" },
          hljs.UNDERSCORE_TITLE_MODE,
          { begin: "=>", endsParent: true },
          {
            className: "params",
            begin: "\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true,
            keywords: phpKeywords,
            contains: ["self", variablePattern, hljs.C_BLOCK_COMMENT_MODE, stringPattern, numberPattern]
          }
        ]
      },
      // Class, interface, trait, enum definitions
      {
        className: "class",
        variants: [
          {
            beginKeywords: "enum",
            illegal: /[($"]/
          },
          {
            beginKeywords: "class interface trait",
            illegal: /[:($"]/
          }
        ],
        relevance: 0,
        end: /\{/, // End at opening brace
        excludeEnd: true,
        contains: [
          { beginKeywords: "extends implements" },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // Namespace declarations
      {
        beginKeywords: "namespace",
        relevance: 0,
        end: ";",
        illegal: /[.']/, // Disallow . and '
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      // Use statements
      {
        beginKeywords: "use",
        relevance: 0,
        end: ";",
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      // Strings
      stringPattern,
      // Numbers
      numberPattern
    ]
  };
}

module.exports = definePhpHighlighting;
