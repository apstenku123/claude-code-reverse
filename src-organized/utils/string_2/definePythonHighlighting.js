/**
 * Defines the syntax highlighting rules for Python language for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing common modes and utilities.
 * @returns {object} The language definition object for Python highlighting.
 */
function definePythonHighlighting(hljs) {
  // Define Python keywords, built-ins, literals, and types
  const pythonKeywords = {
    $pattern: /[a-z]\w+|__\w+__/, // Matches valid Python identifiers and dunder names
    keyword: [
      "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"
    ],
    built_in: [
      "__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"
    ],
    literal: [
      "__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"
    ],
    type: [
      "Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union"
    ]
  };

  // Matches Python REPL prompts (>>> or ...)
  const metaPrompt = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  };

  // Handles substitutions in f-strings (e.g., {value})
  const fStringSubstitution = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: pythonKeywords,
    illegal: /#/
  };

  // Handles escaped curly braces in f-strings (e.g., {{ or }})
  const fStringEscapedBrace = {
    begin: /\{\{/,
    relevance: 0
  };

  // Handles all Python string literal variants
  const pythonString = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      // Triple-quoted strings (single and double)
      {
        begin: /([ensureESModuleDefaultExport]|[bB]|[handleHttpRequest]|[bB][handleHttpRequest]|[handleHttpRequest][bB])?'''/,
        end: /'''/,
        contains: [hljs.BACKSLASH_ESCAPE, metaPrompt],
        relevance: 10
      },
      {
        begin: /([ensureESModuleDefaultExport]|[bB]|[handleHttpRequest]|[bB][handleHttpRequest]|[handleHttpRequest][bB])?"""/,
        end: /"""/,
        contains: [hljs.BACKSLASH_ESCAPE, metaPrompt],
        relevance: 10
      },
      // f-string triple-quoted
      {
        begin: /([fF][handleHttpRequest]|[handleHttpRequest][fF]|[fF])'''/,
        end: /'''/,
        contains: [hljs.BACKSLASH_ESCAPE, metaPrompt, fStringEscapedBrace, fStringSubstitution]
      },
      {
        begin: /([fF][handleHttpRequest]|[handleHttpRequest][fF]|[fF])"""/,
        end: /"""/,
        contains: [hljs.BACKSLASH_ESCAPE, metaPrompt, fStringEscapedBrace, fStringSubstitution]
      },
      // Unicode/raw single and double quoted
      {
        begin: /([ensureESModuleDefaultExport]|[handleHttpRequest])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([ensureESModuleDefaultExport]|[handleHttpRequest])"/,
        end: /"/,
        relevance: 10
      },
      // Byte strings
      {
        begin: /([bB]|[bB][handleHttpRequest]|[handleHttpRequest][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][handleHttpRequest]|[handleHttpRequest][bB])"/,
        end: /"/
      },
      // f-string single and double quoted
      {
        begin: /([fF][handleHttpRequest]|[handleHttpRequest][fF]|[fF])'/,
        end: /'/,
        contains: [hljs.BACKSLASH_ESCAPE, fStringEscapedBrace, fStringSubstitution]
      },
      {
        begin: /([fF][handleHttpRequest]|[handleHttpRequest][fF]|[fF])"/,
        end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE, fStringEscapedBrace, fStringSubstitution]
      },
      // Standard string modes
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // Numeric patterns for Python numbers
  const decimalInteger = "[0-9](_?[0-9])*";
  const floatNumber = "(\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.";

  // Handles all Python number literal variants
  const pythonNumber = {
    className: "number",
    relevance: 0,
    variants: [
      // Exponential floats
      {
        begin: "(\\b([0-9](_?[0-9])*)|((\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.))[eE][+-]?([0-9](_?[0-9])*)[jJ]?\\b"
      },
      // Floats
      {
        begin: "((\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.)[jJ]?"
      },
      // Integers
      {
        begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"
      },
      // Binary
      {
        begin: "\\b0[bB](_?[01])+[lL]?\\b"
      },
      // Octal
      {
        begin: "\\b0[oO](_?[0-7])+[lL]?\\b"
      },
      // Hexadecimal
      {
        begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"
      },
      // Complex numbers
      {
        begin: "\\b([0-9](_?[0-9])*)[jJ]\\b"
      }
    ]
  };

  // Handles type annotation comments (e.g., # type: ...)
  const typeComment = {
    className: "comment",
    begin: createPositiveLookaheadPattern(/# type:/), // createPositiveLookaheadPattern is assumed to be a utility for comment matching
    end: /$/,
    keywords: pythonKeywords,
    contains: [
      {
        begin: /# type:/
      },
      {
        begin: /#/,
        end: /\b\b/,
        endsWithParent: true
      }
    ]
  };

  // Handles function/method parameter lists
  const functionParameters = {
    className: "params",
    variants: [
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: pythonKeywords,
        contains: ["self", metaPrompt, pythonNumber, pythonString, hljs.HASH_COMMENT_MODE]
      }
    ]
  };

  // Allow f-string substitutions to contain strings, numbers, and meta prompts
  fStringSubstitution.contains = [pythonString, pythonNumber, metaPrompt];

  return {
    name: "Python",
    aliases: ["py", "gyp", "ipython"],
    keywords: pythonKeywords,
    illegal: /(<\/|->|\?)|=>/, // Illegal patterns for Python
    contains: [
      metaPrompt,
      pythonNumber,
      { begin: /\bself\b/ },
      { beginKeywords: "if", relevance: 0 },
      pythonString,
      typeComment,
      hljs.HASH_COMMENT_MODE,
      {
        // Function and class definitions
        variants: [
          {
            className: "function",
            beginKeywords: "def"
          },
          {
            className: "class",
            beginKeywords: "class"
          }
        ],
        end: /:/,
        illegal: /[${=;\n,]/,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          functionParameters,
          {
            begin: /->/,
            endsWithParent: true,
            keywords: pythonKeywords
          }
        ]
      },
      {
        className: "meta",
        begin: /^[\processRuleBeginHandlers ]*@/,
        end: /(?=#)|$/,
        contains: [pythonNumber, functionParameters, pythonString]
      }
    ]
  };
}

module.exports = definePythonHighlighting;