/**
 * Generates a syntax highlighting definition for the Swift programming language.
 *
 * @param {object} hljs - The highlight.js core object, providing utility methods and regexes.
 * @returns {object} The syntax definition object for Swift, suitable for highlight.js registration.
 */
function createSwiftSyntaxDefinition(hljs) {
  // Whitespace matcher for separating tokens
  const whitespaceMatcher = {
    match: /\s+/,
    relevance: 0
  };

  // Block comment definition (/* ... */)
  const blockComment = hljs.COMMENT("/\*", "\\*/", {
    contains: ["self"]
  });

  // All comment modes (line and block)
  const commentModes = [hljs.C_LINE_COMMENT_MODE, blockComment];

  // Keyword after dot (e.g., .someKeyword)
  const dotKeyword = {
    className: "keyword",
    begin: y8(/\./, mf(ED(...fkA, ...OO1))),
    end: ED(...fkA, ...OO1),
    excludeBegin: true
  };

  // Dot operator (e.g., .someOperator)
  const dotOperator = {
    match: y8(/\./, ED(...TO1)),
    relevance: 0
  };

  // List of keywords (strings only)
  const keywordList = TO1.filter(token => typeof token === "string").concat(["_|0"]);

  // List of non-string keywords, built-ins, and mapped
  const builtInList = TO1.filter(token => typeof token !== "string").concat(bi9).map(_O1);

  // Keyword variants (for built-ins, etc.)
  const keywordVariants = {
    variants: [{
      className: "keyword",
      match: ED(...builtInList, ...OO1)
    }]
  };

  // Swift keywords and literals
  const swiftKeywords = {
    $pattern: ED(/\b\w+/, /#\w+/),
    keyword: keywordList.concat(hi9),
    literal: vkA
  };

  // Keyword-related matchers
  const keywordMatchers = [dotKeyword, dotOperator, keywordVariants];

  // Dot built-in matcher
  const dotBuiltIn = {
    match: y8(/\./, ED(...bkA)),
    relevance: 0
  };

  // Built-in function matcher
  const builtInFunction = {
    className: "built_in",
    match: y8(/\b/, ED(...bkA), /(?=\()/)
  };

  // Built-in matchers
  const builtInMatchers = [dotBuiltIn, builtInFunction];

  // Arrow operator matcher (->)
  const arrowOperator = {
    match: /->/,
    relevance: 0
  };

  // Operator matcher (including dot-dot and custom operators)
  const operatorMatcher = {
    className: "operator",
    relevance: 0,
    variants: [
      { match: PO1 },
      { match: `\\.(\\.|${mkA})+` }
    ]
  };

  // Operator matchers
  const operatorMatchers = [arrowOperator, operatorMatcher];

  // Numeric patterns
  const decimalPattern = "([0-9]_*)+";
  const hexPattern = "([0-9a-fA-F]_*)+";

  // Number matcher (decimal, hex, octal, binary)
  const numberMatcher = {
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

  // String interpolation substitution (e.g., \n, \processRuleBeginHandlers, etc.)
  const stringSubstitution = (prefix = "") => ({
    className: "subst",
    variants: [
      { match: y8(/\\/, prefix, /[0\\tnr"']/) },
      { match: y8(/\\/, prefix, /u\{[0-9a-fA-F]{1,8}\}/) }
    ]
  });

  // Multiline string interpolation (e.g., \\ followed by newline)
  const multilineStringSubstitution = (prefix = "") => ({
    className: "subst",
    match: y8(/\\/, prefix, /[\processRuleBeginHandlers ]*(?:[\r\n]|\r\n)/)
  });

  // Parenthesized interpolation (e.g., \( ... ))
  const parenthesizedInterpolation = (prefix = "") => ({
    className: "subst",
    label: "interpol",
    begin: y8(/\\/, prefix, /\(/),
    end: /\)/
  });

  // Multiline string variant (""" ... """)
  const multilineStringVariant = (prefix = "") => ({
    begin: y8(prefix, /"""/),
    end: y8(/"""/, prefix),
    contains: [stringSubstitution(prefix), multilineStringSubstitution(prefix), parenthesizedInterpolation(prefix)]
  });

  // Single-line string variant (" ... ")
  const singleLineStringVariant = (prefix = "") => ({
    begin: y8(prefix, /"/),
    end: y8(/"/, prefix),
    contains: [stringSubstitution(prefix), parenthesizedInterpolation(prefix)]
  });

  // String matcher (handles all string literal forms)
  const stringMatcher = {
    className: "string",
    variants: [
      multilineStringVariant(),
      multilineStringVariant("#"),
      multilineStringVariant("##"),
      multilineStringVariant("###"),
      singleLineStringVariant(),
      singleLineStringVariant("#"),
      singleLineStringVariant("##"),
      singleLineStringVariant("###")
    ]
  };

  // Backtick identifier matcher (e.g., `identifier`)
  const backtickIdentifier = {
    match: y8(/`/, OU, /`/)
  };

  // Positional variable matcher (e.g., $1, $2)
  const positionalVariable = {
    className: "variable",
    match: /\$\d+/
  };

  // Named variable matcher (e.g., $foo)
  const namedVariable = {
    className: "variable",
    match: `\\$${y51}+`
  };

  // Variable matchers
  const variableMatchers = [backtickIdentifier, positionalVariable, namedVariable];

  // @available and #available attribute matcher
  const availableAttribute = {
    match: /(@|#)available/,
    className: "keyword",
    starts: {
      contains: [{
        begin: /\(/,
        end: /\)/,
        keywords: di9,
        contains: [
          ...operatorMatchers,
          numberMatcher,
          stringMatcher
        ]
      }]
    }
  };

  // @attribute matcher
  const atAttribute = {
    className: "keyword",
    match: y8(/@/, ED(...mi9))
  };

  // @meta matcher
  const atMeta = {
    className: "meta",
    match: y8(/@/, OU)
  };

  // Attribute matchers
  const attributeMatchers = [availableAttribute, atAttribute, atMeta];

  // Type name matcher (for types, generics, etc.)
  const typeNameMatcher = {
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

  // Generic type parameter matcher (e.g., <BugReportForm, UL>)
  const genericTypeParameter = {
    begin: /</,
    end: />/,
    keywords: swiftKeywords,
    contains: [
      ...commentModes,
      ...keywordMatchers,
      ...attributeMatchers,
      arrowOperator,
      typeNameMatcher
    ]
  };

  // Add genericTypeParameter as a possible child of typeNameMatcher
  typeNameMatcher.contains.push(genericTypeParameter);

  // Function parameter label matcher
  const functionParameterLabel = {
    match: y8(OU, /\s*:/),
    keywords: "_|0",
    relevance: 0
  };

  // Function parameter list matcher
  const functionParameterList = {
    begin: /\(/,
    end: /\)/,
    relevance: 0,
    keywords: swiftKeywords,
    contains: [
      "self",
      functionParameterLabel,
      ...commentModes,
      ...keywordMatchers,
      ...builtInMatchers,
      ...operatorMatchers,
      numberMatcher,
      stringMatcher,
      ...variableMatchers,
      ...attributeMatchers,
      typeNameMatcher
    ]
  };

  // Function title matcher (for 'func' keyword)
  const functionTitle = {
    beginKeywords: "func",
    contains: [
      {
        className: "title",
        match: ED(backtickIdentifier.match, OU, PO1),
        endsParent: true,
        relevance: 0
      },
      whitespaceMatcher
    ]
  };

  // Function generic parameter matcher (e.g., <BugReportForm, UL>)
  const functionGenericParameter = {
    begin: /</,
    end: />/,
    contains: [
      ...commentModes,
      typeNameMatcher
    ]
  };

  // Function parameter label (for parameter name before colon)
  const functionParameterName = {
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

  // Function parameter group matcher
  const functionParameterGroup = {
    begin: /\(/,
    end: /\)/,
    keywords: swiftKeywords,
    contains: [
      functionParameterName,
      ...commentModes,
      ...keywordMatchers,
      ...operatorMatchers,
      numberMatcher,
      stringMatcher,
      ...attributeMatchers,
      typeNameMatcher,
      functionParameterList
    ],
    endsParent: true,
    illegal: /["']/
  };

  // Function definition matcher
  const functionDefinition = {
    className: "function",
    match: mf(/\bfunc\b/),
    contains: [
      functionTitle,
      functionGenericParameter,
      functionParameterGroup,
      whitespaceMatcher
    ],
    illegal: [/\[/, /%/]
  };

  // Subscript/init function matcher
  const subscriptOrInitFunction = {
    className: "function",
    match: /\b(subscript|init[?!]?)\s*(?=[<(])/,
    keywords: {
      keyword: "subscript init init? init!",
      $pattern: /\w+[?!]?/
    },
    contains: [
      functionGenericParameter,
      functionParameterGroup,
      whitespaceMatcher
    ],
    illegal: /\[|%/
  };

  // Operator definition matcher
  const operatorDefinition = {
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

  // Precedence group matcher
  const precedenceGroup = {
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
        contains: [typeNameMatcher]
      }
    ]
  };

  // Enhance string interpolation: add keywords and nested contains
  for (const stringVariant of stringMatcher.variants) {
    // Find the interpolation substitution object
    const interpolation = stringVariant.contains.find(
      subst => subst.label === "interpol"
    );
    // Add Swift keywords to interpolation
    interpolation.keywords = swiftKeywords;
    // Allow nested expressions and all relevant matchers inside interpolation
    const interpolationContains = [
      ...keywordMatchers,
      ...builtInMatchers,
      ...operatorMatchers,
      numberMatcher,
      stringMatcher,
      ...variableMatchers
    ];
    interpolation.contains = [
      ...interpolationContains,
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self", ...interpolationContains]
      }
    ];
  }

  // Return the full Swift language definition object
  return {
    name: "Swift",
    keywords: swiftKeywords,
    contains: [
      ...commentModes,
      functionDefinition,
      subscriptOrInitFunction,
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
          ...keywordMatchers
        ]
      },
      operatorDefinition,
      precedenceGroup,
      {
        beginKeywords: "import",
        end: /$/,
        contains: [...commentModes],
        relevance: 0
      },
      ...keywordMatchers,
      ...builtInMatchers,
      ...operatorMatchers,
      numberMatcher,
      stringMatcher,
      ...variableMatchers,
      ...attributeMatchers,
      typeNameMatcher,
      functionParameterList
    ]
  };
}

module.exports = createSwiftSyntaxDefinition;