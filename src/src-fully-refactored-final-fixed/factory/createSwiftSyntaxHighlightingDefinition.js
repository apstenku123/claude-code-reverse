/**
 * Creates a syntax highlighting definition for the Swift programming language.
 * This function is intended for use with syntax highlighting libraries (e.g., highlight.js).
 * It defines keywords, operators, literals, number formats, string interpolation, function/class definitions, and more.
 *
 * @param {object} hljs - The syntax highlighting library instance, providing utility methods and constants.
 * @returns {object} The Swift language definition object for the syntax highlighter.
 */
function createSwiftSyntaxHighlightingDefinition(hljs) {
  // Whitespace matcher (used as a fallback or low-relevance match)
  const whitespaceMode = {
    match: /\s+/,
    relevance: 0
  };

  // Block comment mode (/* ... */)
  const blockCommentMode = hljs.COMMENT("/\*", "\\*/", {
    contains: ["self"]
  });

  // All comment modes (line and block)
  const commentModes = [hljs.C_LINE_COMMENT_MODE, blockCommentMode];

  // Keyword highlighting for dot-prefixed keywords (e.g., .public)
  const dotKeywordMode = {
    className: "keyword",
    begin: y8(/\./, mf(ED(...fkA, ...OO1))),
    end: ED(...fkA, ...OO1),
    excludeBegin: true
  };

  // Dot-prefixed identifiers with zero relevance
  const dotIdentifierMode = {
    match: y8(/\./, ED(...TO1)),
    relevance: 0
  };

  // List of keyword strings
  const keywordStrings = TO1.filter(item => typeof item === "string").concat(["_|0"]);

  // List of non-string keywords, built-ins, and mapped forms
  const keywordObjects = TO1.filter(item => typeof item !== "string").concat(bi9).map(_O1);

  // Keyword variants (for highlighting built-ins and other forms)
  const keywordVariants = {
    variants: [{
      className: "keyword",
      match: ED(...keywordObjects, ...OO1)
    }]
  };

  // Keyword/literal definition for the language
  const swiftKeywords = {
    $pattern: ED(/\b\w+/, /#\w+/),
    keyword: keywordStrings.concat(hi9),
    literal: vkA
  };

  // All keyword-related modes
  const keywordModes = [dotKeywordMode, dotIdentifierMode, keywordVariants];

  // Dot-prefixed built-in types with zero relevance
  const dotBuiltInTypeMode = {
    match: y8(/\./, ED(...bkA)),
    relevance: 0
  };

  // Built-in type mode (e.g., Int, String, etc.)
  const builtInTypeMode = {
    className: "built_in",
    match: y8(/\b/, ED(...bkA), /(?=\()/)
  };

  // All built-in type modes
  const builtInTypeModes = [dotBuiltInTypeMode, builtInTypeMode];

  // Arrow operator (->) with zero relevance
  const arrowOperatorMode = {
    match: /->/,
    relevance: 0
  };

  // Operator highlighting (including custom operators)
  const operatorMode = {
    className: "operator",
    relevance: 0,
    variants: [
      { match: PO1 },
      { match: `\\.(\\.|${mkA})+` }
    ]
  };

  // All operator-related modes
  const operatorModes = [arrowOperatorMode, operatorMode];

  // Number format regexes
  const decimalDigits = "([0-9]_*)+";
  const hexDigits = "([0-9a-fA-F]_*)+";

  // Number literal highlighting (decimal, hex, octal, binary)
  const numberMode = {
    className: "number",
    relevance: 0,
    variants: [
      {
        match: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
      },
      {
        match: "\\b0x(([0-9a-fA-F]_*)+)(\\.(([0-9a-fA-F]_*)+))?([pP][+-]?(([0-9]_*)+))?\\b"
      },
      {
        match: /\b0o([0-7]_*)+\b/
      },
      {
        match: /\b0b([01]_*)+\b/
      }
    ]
  };

  // String interpolation substitution (e.g., \n, \processRuleBeginHandlers, Unicode, etc.)
  const createStringSubstitution = (prefix = "") => ({
    className: "subst",
    variants: [
      { match: y8(/\\/, prefix, /[0\\tnr"']/) },
      { match: y8(/\\/, prefix, /u\{[0-9a-fA-F]{1,8}\}/) }
    ]
  });

  // String interpolation for line continuation
  const createLineContinuationSubstitution = (prefix = "") => ({
    className: "subst",
    match: y8(/\\/, prefix, /[\processRuleBeginHandlers ]*(?:[\r\n]|\r\n)/)
  });

  // String interpolation for embedded expressions (e.g., \( ... ))
  const createInterpolatedExpression = (prefix = "") => ({
    className: "subst",
    label: "interpol",
    begin: y8(/\\/, prefix, /\(/),
    end: /\)/
  });

  // Triple-quoted string mode (""" ... """)
  const createTripleQuotedString = (prefix = "") => ({
    begin: y8(prefix, /"""/),
    end: y8(/"""/, prefix),
    contains: [
      createStringSubstitution(prefix),
      createLineContinuationSubstitution(prefix),
      createInterpolatedExpression(prefix)
    ]
  });

  // Standard string mode (" ... ")
  const createStandardString = (prefix = "") => ({
    begin: y8(prefix, /"/),
    end: y8(/"/, prefix),
    contains: [
      createStringSubstitution(prefix),
      createInterpolatedExpression(prefix)
    ]
  });

  // All string modes (triple-quoted and standard, with optional prefixes)
  const stringMode = {
    className: "string",
    variants: [
      createTripleQuotedString(),
      createTripleQuotedString("#"),
      createTripleQuotedString("##"),
      createTripleQuotedString("###"),
      createStandardString(),
      createStandardString("#"),
      createStandardString("##"),
      createStandardString("###")
    ]
  };

  // Backtick identifier mode (for identifiers in backticks)
  const backtickIdentifierMode = {
    match: y8(/`/, OU, /`/)
  };

  // Variable modes (e.g., $1, $variable)
  const numberedVariableMode = {
    className: "variable",
    match: /\$\d+/
  };
  const namedVariableMode = {
    className: "variable",
    match: `\$${y51}+`
  };
  const variableModes = [backtickIdentifierMode, numberedVariableMode, namedVariableMode];

  // @available and similar attributes
  const attributeAvailableMode = {
    match: /(@|#)available/,
    className: "keyword",
    starts: {
      contains: [{
        begin: /\(/,
        end: /\)/,
        keywords: di9,
        contains: [
          ...operatorModes,
          numberMode,
          stringMode
        ]
      }]
    }
  };

  // @-prefixed keywords
  const atPrefixedKeywordMode = {
    className: "keyword",
    match: y8(/@/, ED(...mi9))
  };

  // @-prefixed meta identifiers
  const atPrefixedMetaMode = {
    className: "meta",
    match: y8(/@/, OU)
  };

  // All attribute/meta modes
  const attributeMetaModes = [attributeAvailableMode, atPrefixedKeywordMode, atPrefixedMetaMode];

  // Type identifier mode (for types starting with uppercase)
  const typeIdentifierMode = {
    match: mf(/\b[a-zA]/),
    relevance: 0,
    contains: [
      {
        className: "type",
        match: y8(/(AV|prependStackTraceIndentation|setShellCurrentWorkingDirectory|CG|CI|CL|CM|CN|CT|isLatinCapitalLetter|getProcessedObservableOrConfig|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, y51, "+")
      },
      {
        className: "type",
        match: SO1,
        relevance: 0
      },
      {
        match: /[?!]+/,
        relevance: 0
      },
      {
        match: /\.\.\./,
        relevance: 0
      },
      {
        match: y8(/\s+&\s+/, mf(SO1)),
        relevance: 0
      }
    ]
  };

  // Generic type parameter mode (e.g., <BugReportForm>)
  const genericParameterMode = {
    begin: /</,
    end: />/,
    keywords: swiftKeywords,
    contains: [
      ...commentModes,
      ...keywordModes,
      ...attributeMetaModes,
      arrowOperatorMode,
      typeIdentifierMode
    ]
  };
  // Add generic parameter mode to typeIdentifierMode'createInteractionAccessor contains
  typeIdentifierMode.contains.push(genericParameterMode);

  // Parameter label mode (e.g., foo:)
  const parameterLabelMode = {
    match: y8(OU, /\s*:/),
    keywords: "_|0",
    relevance: 0
  };

  // Function parameter list mode
  const functionParameterListMode = {
    begin: /\(/,
    end: /\)/,
    relevance: 0,
    keywords: swiftKeywords,
    contains: [
      "self",
      parameterLabelMode,
      ...commentModes,
      ...keywordModes,
      ...builtInTypeModes,
      ...operatorModes,
      numberMode,
      stringMode,
      ...variableModes,
      ...attributeMetaModes,
      typeIdentifierMode
    ]
  };

  // Function name/title mode
  const functionTitleMode = {
    beginKeywords: "func",
    contains: [
      {
        className: "title",
        match: ED(backtickIdentifierMode.match, OU, PO1),
        endsParent: true,
        relevance: 0
      },
      whitespaceMode
    ]
  };

  // Function generic parameter mode
  const functionGenericParameterMode = {
    begin: /</,
    end: />/,
    contains: [
      ...commentModes,
      typeIdentifierMode
    ]
  };

  // Function parameter label mode (for parameter names)
  const functionParameterLabelMode = {
    begin: ED(mf(y8(OU, /\s*:/)), mf(y8(OU, /\s+/, OU, /\s*:/))),
    end: /:/,
    relevance: 0,
    contains: [
      {
        className: "keyword",
        match: /\b_\b/
      },
      {
        className: "params",
        match: OU
      }
    ]
  };

  // Function parameter mode (for parameters inside parentheses)
  const functionParameterMode = {
    begin: /\(/,
    end: /\)/,
    keywords: swiftKeywords,
    contains: [
      functionParameterLabelMode,
      ...commentModes,
      ...keywordModes,
      ...operatorModes,
      numberMode,
      stringMode,
      ...attributeMetaModes,
      typeIdentifierMode,
      functionParameterListMode
    ],
    endsParent: true,
    illegal: /["']/
  };

  // Function definition mode
  const functionDefinitionMode = {
    className: "function",
    match: mf(/\bfunc\b/),
    contains: [
      functionTitleMode,
      functionGenericParameterMode,
      functionParameterMode,
      whitespaceMode
    ],
    illegal: [/\[/, /%/]
  };

  // Subscript/init function mode
  const subscriptInitFunctionMode = {
    className: "function",
    match: /\b(subscript|init[?!]?)\s*(?=[<(])/,
    keywords: {
      keyword: "subscript init init? init!",
      $pattern: /\w+[?!]?/
    },
    contains: [
      functionGenericParameterMode,
      functionParameterMode,
      whitespaceMode
    ],
    illegal: /\[|%/
  };

  // Operator definition mode
  const operatorDefinitionMode = {
    beginKeywords: "operator",
    end: hljs.MATCH_NOTHING_RE,
    contains: [
      {
        className: "title",
        match: PO1,
        endsParent: true,
        relevance: 0
      }
    ]
  };

  // Precedence group definition mode
  const precedenceGroupDefinitionMode = {
    beginKeywords: "precedencegroup",
    end: hljs.MATCH_NOTHING_RE,
    contains: [
      {
        className: "title",
        match: SO1,
        relevance: 0
      },
      {
        begin: /{/,
        end: /}/,
        relevance: 0,
        endsParent: true,
        keywords: [...gi9, ...vkA],
        contains: [typeIdentifierMode]
      }
    ]
  };

  // Add string interpolation support for all string variants
  for (const stringVariant of stringMode.variants) {
    // Find the interpolated expression mode (label === 'interpol')
    const interpolated = stringVariant.contains.find(mode => mode.label === "interpol");
    // Add keywords to interpolated expressions
    interpolated.keywords = swiftKeywords;
    // Compose the set of modes that can appear inside interpolated expressions
    const interpolatedContains = [
      ...keywordModes,
      ...builtInTypeModes,
      ...operatorModes,
      numberMode,
      stringMode,
      ...variableModes
    ];
    // Allow nested parentheses and all relevant modes inside interpolation
    interpolated.contains = [
      ...interpolatedContains,
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self", ...interpolatedContains]
      }
    ];
  }

  // Return the full Swift language definition
  return {
    name: "Swift",
    keywords: swiftKeywords,
    contains: [
      ...commentModes,
      functionDefinitionMode,
      subscriptInitFunctionMode,
      {
        className: "class",
        beginKeywords: "struct protocol class extension enum",
        end: "\\{",
        excludeEnd: true,
        keywords: swiftKeywords,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[a-z$_][\u00C0-\u02B80-9A-zA-z$_]*/
          }),
          ...keywordModes
        ]
      },
      operatorDefinitionMode,
      precedenceGroupDefinitionMode,
      {
        beginKeywords: "import",
        end: /$/,
        contains: [...commentModes],
        relevance: 0
      },
      ...keywordModes,
      ...builtInTypeModes,
      ...operatorModes,
      numberMode,
      stringMode,
      ...variableModes,
      ...attributeMetaModes,
      typeIdentifierMode,
      functionParameterListMode
    ]
  };
}

module.exports = createSwiftSyntaxHighlightingDefinition;