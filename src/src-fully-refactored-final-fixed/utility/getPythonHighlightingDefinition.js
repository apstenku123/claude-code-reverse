/**
 * Returns the syntax highlighting definition for Python language for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing common modes and utilities.
 * @returns {object} The Python language definition object for the highlighting engine.
 */
function getPythonHighlightingDefinition(hljs) {
  // Define Python keywords, built-ins, literals, and types
  const pythonKeywords = {
    $pattern: /[a-z]\w+|__\w+__/, // Matches Python identifiers and dunder names
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

  // Python REPL meta prompt (>>> or ...)
  const metaPrompt = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  };

  // Substitution inside f-strings: { ... }
  const fStringSubstitution = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: pythonKeywords,
    illegal: /#/
  };

  // Escaped curly braces inside f-strings: {{ or }}
  const fStringEscapedBraces = {
    begin: /\{\{/,
    relevance: 0
  };

  // String modes, including f-strings, triple-quoted, raw, byte, etc.
  const stringModes = {
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
        contains: [hljs.BACKSLASH_ESCAPE, metaPrompt, fStringEscapedBraces, fStringSubstitution]
      },
      {
        begin: /([fF][handleHttpRequest]|[handleHttpRequest][fF]|[fF])"""/,
        end: /"""/,
        contains: [hljs.BACKSLASH_ESCAPE, metaPrompt, fStringEscapedBraces, fStringSubstitution]
      },
      // Raw/unicode single-quoted
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
      // f-string single-quoted
      {
        begin: /([fF][handleHttpRequest]|[handleHttpRequest][fF]|[fF])'/,
        end: /'/,
        contains: [hljs.BACKSLASH_ESCAPE, fStringEscapedBraces, fStringSubstitution]
      },
      {
        begin: /([fF][handleHttpRequest]|[handleHttpRequest][fF]|[fF])"/,
        end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE, fStringEscapedBraces, fStringSubstitution]
      },
      // Standard string modes
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // Number patterns
  const decimalInteger = "[0-9](_?[0-9])*";
  const floatNumber = "(\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.";

  // Number highlighting
  const numberModes = {
    className: "number",
    relevance: 0,
    variants: [
      // Exponent notation, possibly with imaginary/j suffix
      {
        begin: "(\\b([0-9](_?[0-9])*)|((\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.))[eE][+-]?([0-9](_?[0-9])*)[jJ]?\\b"
      },
      // Floating point and imaginary numbers
      {
        begin: "((\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.)[jJ]?"
      },
      // Integer, long, imaginary
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
      // Imaginary only
      {
        begin: "\\b([0-9](_?[0-9])*)[jJ]\\b"
      }
    ]
  };

  // Type comment highlighting (e.g., # type: ...)
  const typeCommentMode = {
    className: "comment",
    begin: createPositiveLookaheadPattern(/# type:/), // createPositiveLookaheadPattern is an external dependency for comment matching
    end: /$/,
    keywords: pythonKeywords,
    contains: [
      { begin: /# type:/ },
      {
        begin: /#/,
        end: /\b\b/,
        endsWithParent: true
      }
    ]
  };

  // Function/class parameter list highlighting
  const paramsMode = {
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
        contains: ["self", metaPrompt, numberModes, stringModes, hljs.HASH_COMMENT_MODE]
      }
    ]
  };

  // Allow f-string substitutions to contain strings, numbers, meta prompts
  fStringSubstitution.contains = [stringModes, numberModes, metaPrompt];

  return {
    name: "Python",
    aliases: ["py", "gyp", "ipython"],
    keywords: pythonKeywords,
    illegal: /(<\/|->|\?)|=>/, // Illegal patterns for Python
    contains: [
      metaPrompt,
      numberModes,
      { begin: /\bself\b/ },
      { beginKeywords: "if", relevance: 0 },
      stringModes,
      typeCommentMode,
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
          paramsMode,
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
        contains: [numberModes, paramsMode, stringModes]
      }
    ]
  };
}

module.exports = getPythonHighlightingDefinition;