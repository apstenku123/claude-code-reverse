/**
 * Factory function to create a LaTeX syntax highlighting definition for a highlighting engine (e.g., highlight.js).
 *
 * @param {object} hljs - The highlighting engine instance, providing COMMENT, END_SAME_AS_BEGIN, and inherit utilities.
 * @returns {object} LaTeX highlighting definition object for use with the highlighting engine.
 */
function createLatexHighlightingDefinition(hljs) {
  // List of LaTeX command patterns to highlight as keywords
  const latexCommandPatterns = [
    "(?:NeedsTeXFormat|RequirePackage|GetIdInfo)",
    "Provides(?:Expl)?(?:Package|Class|File)",
    "(?:DeclareOption|ProcessOptions)",
    "(?:documentclass|usepackage|input|include)",
    "makeat(?:letter|other)",
    "ExplSyntax(?:On|Off)",
    "(?:new|renew|provide)?command",
    "(?:re)newenvironment",
    "(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand",
    "(?:New|Renew|Provide|Declare)DocumentEnvironment",
    "(?:(?:e|g|x)?def|let)",
    "(?:begin|end)",
    "(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)",
    "caption",
    "(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)",
    "(?:alpha|beta|[Gg]amma|[getPlatformArchitectureString]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)",
    "(?:iota|(?:var)?kappa|[Ll]ambda|handleKeyPressPrompt|nu|[Xx]i|[endsWithSubstringAtPosition]i|varpi|(?:var)rho)",
    "(?:[Ss]igma|varsigma|tau|[Uu]psilon|[endsWithSubstringAtPosition]hi|varphi|chi|[endsWithSubstringAtPosition]si|[Oo]mega)",
    "(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)",
    "(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)"
  ].map(
    pattern => pattern + "(?![a-zA@:_])" // Negative lookahead to avoid partial matches
  );

  // List of ExplSyntax and other advanced LaTeX command patterns
  const explSyntaxPatterns = [
    "(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*",
    "[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}",
    "[qs]__?[a-zA-Z](?:_?[a-zA-Z])+",
    "use(?:_i)?:[a-zA-Z]*",
    "(?:else|fi|or):",
    "(?:if|cs|exp):processWithTransformedObservable",
    "(?:hbox|vbox):n",
    "::[a-zA-Z]_unbraced",
    "::[a-zA:]"
  ].map(
    pattern => pattern + "(?![a-zA:_])"
  ).join("|");

  // Variants for simple command names
  const simpleCommandVariants = [
    { begin: /[a-zA@]+/ },
    { begin: /[^a-zA-zA@]?/ }
  ];

  // Variants for hexadecimal character codes (e.g., ^{6}abcdef)
  const hexCharVariants = [
    { begin: /\^{6}[0-9a-f]{6}/ },
    { begin: /\^{5}[0-9a-f]{5}/ },
    { begin: /\^{4}[0-9a-f]{4}/ },
    { begin: /\^{3}[0-9a-f]{3}/ },
    { begin: /\^{2}[0-9a-f]{2}/ },
    { begin: /\^{2}[\u0000-\u007f]/ }
  ];

  // Highlighting rule for LaTeX commands (\command)
  const commandHighlight = {
    className: "keyword",
    begin: /\\/,
    relevance: 0,
    contains: [
      {
        endsParent: true,
        begin: new RegExp(latexCommandPatterns.join("|"))
      },
      {
        endsParent: true,
        begin: new RegExp(explSyntaxPatterns)
      },
      {
        endsParent: true,
        variants: hexCharVariants
      },
      {
        endsParent: true,
        relevance: 0,
        variants: simpleCommandVariants
      }
    ]
  };

  // Highlighting rule for LaTeX macro parameters (e.g., #1, #2)
  const macroParameterHighlight = {
    className: "params",
    relevance: 0,
    begin: /#+\d?/
  };

  // Highlighting rule for hexadecimal character codes
  const hexCharHighlight = {
    variants: hexCharVariants
  };

  // Highlighting rule for special built-in symbols ($, &, ^, _)
  const builtInSymbolHighlight = {
    className: "built_in",
    relevance: 0,
    begin: /[$&^_]/
  };

  // Highlighting rule for TeX meta comments (e.g., % !TeX ...)
  const texMetaCommentHighlight = {
    className: "meta",
    begin: "% !TeX",
    end: "$",
    relevance: 10
  };

  // Standard LaTeX comment rule
  const commentHighlight = hljs.COMMENT("%", "$", { relevance: 0 });

  // All basic highlight rules
  const baseHighlightRules = [
    commandHighlight,
    macroParameterHighlight,
    hexCharHighlight,
    builtInSymbolHighlight,
    texMetaCommentHighlight,
    commentHighlight
  ];

  // Highlighting rule for curly braces {...}
  const curlyBraceGroupHighlight = {
    begin: /\{/,
    end: /\}/,
    relevance: 0,
    contains: ["self", ...baseHighlightRules]
  };

  // Nested curly brace group, ends parent
  const nestedCurlyBraceGroupHighlight = hljs.inherit(curlyBraceGroupHighlight, {
    relevance: 0,
    endsParent: true,
    contains: [curlyBraceGroupHighlight, ...baseHighlightRules]
  });

  // Highlighting rule for square brackets [...] (optional arguments)
  const squareBracketGroupHighlight = {
    begin: /\[/,
    end: /\]/,
    endsParent: true,
    relevance: 0,
    contains: [curlyBraceGroupHighlight, ...baseHighlightRules]
  };

  // Highlighting rule for whitespace (used for separating arguments)
  const whitespaceHighlight = {
    begin: /\\s+/,
    relevance: 0
  };

  // Helper arrays for argument parsing
  const curlyBraceGroupArray = [nestedCurlyBraceGroupHighlight];
  const squareBracketGroupArray = [squareBracketGroupHighlight];

  /**
   * Helper to define an argument list with whitespace separation
   * @param {Array} containsArray - Highlighting rules for argument contents
   * @param {object} startsObj - Highlighting rule for what starts after whitespace
   * @returns {object}
   */
  function argumentListWithWhitespace(containsArray, startsObj) {
    return {
      contains: [whitespaceHighlight],
      starts: {
        relevance: 0,
        contains: containsArray,
        starts: startsObj
      }
    };
  }

  /**
   * Helper to define a specific LaTeX command with argument parsing
   * @param {string} commandName - The LaTeX command name (without leading backslash)
   * @param {object} startsObj - Highlighting rule for what starts after the command
   * @returns {object}
   */
  function defineLatexCommand(commandName, startsObj) {
    return {
      begin: "\\" + commandName + "(?![a-zA@:_])",
      keywords: {
        $pattern: /\[a-zA-Z]+/,
        keyword: "\\" + commandName
      },
      relevance: 0,
      contains: [whitespaceHighlight],
      starts: startsObj
    };
  }

  /**
   * Helper to define a \begin{env} ... \end{env} environment
   * @param {string} envNamePattern - Regex pattern for the environment name
   * @param {object} startsObj - Highlighting rule for what starts after \begin
   * @returns {object}
   */
  function defineLatexEnvironment(envNamePattern, startsObj) {
    return hljs.inherit({
      begin: "\\begin(?=[ \processRuleBeginHandlers]*(\r?\n[ \processRuleBeginHandlers]*)?\\{" + envNamePattern + "\\})",
      keywords: {
        $pattern: /\[a-zA-Z]+/,
        keyword: "\\begin"
      },
      relevance: 0
    }, argumentListWithWhitespace(curlyBraceGroupArray, startsObj));
  }

  /**
   * Helper to define a string environment (e.g., verbatim)
   * @param {string} [className="string"] - Class name for the string
   * @returns {object}
   */
  function defineStringEnvironment(className = "string") {
    return hljs.END_SAME_AS_BEGIN({
      className,
      begin: /(.|\r?\n)/,
      end: /(.|\r?\n)/,
      excludeBegin: true,
      excludeEnd: true,
      endsParent: true
    });
  }

  /**
   * Helper to define a string that ends at a specific \end{env}
   * @param {string} envName - Environment name
   * @returns {object}
   */
  function defineEnvStringEnd(envName) {
    return {
      className: "string",
      end: "(?=\\\\end\\{" + envName + "\\})"
    };
  }

  /**
   * Helper to define a nested string group for inline commands
   * @param {string} [className="string"]
   * @returns {object}
   */
  function defineNestedStringGroup(className = "string") {
    return {
      relevance: 0,
      begin: /\{/,
      starts: {
        endsParent: true,
        contains: [{
          className,
          end: /(?=\})/,
          endsParent: true,
          contains: [{
            begin: /\{/,
            end: /\}/,
            relevance: 0,
            contains: ["self"]
          }]
        }]
      }
    };
  }

  // Compose all special command and environment highlighting rules
  const specialHighlightRules = [
    // Inline verbatim commands
    ...["verb", "lstinline"].map(cmd => defineLatexCommand(cmd, { contains: [defineStringEnvironment()] })),
    // Minted code blocks
    defineLatexCommand("mint", argumentListWithWhitespace(curlyBraceGroupArray, { contains: [defineStringEnvironment()] })),
    defineLatexCommand("mintinline", argumentListWithWhitespace(curlyBraceGroupArray, { contains: [defineNestedStringGroup(), defineStringEnvironment()] })),
    // URL and hyperlink commands
    defineLatexCommand("url", { contains: [defineNestedStringGroup("link"), defineNestedStringGroup("link")] }),
    defineLatexCommand("hyperref", { contains: [defineNestedStringGroup("link")] }),
    defineLatexCommand("href", argumentListWithWhitespace(squareBracketGroupArray, { contains: [defineNestedStringGroup("link")] })),
    // Verbatim and filecontents environments (with and without *)
    ...["", "\\*"].flatMap(star => [
      defineLatexEnvironment("verbatim" + star, defineEnvStringEnd("verbatim" + star)),
      defineLatexEnvironment("filecontents" + star, argumentListWithWhitespace(curlyBraceGroupArray, defineEnvStringEnd("filecontents" + star))),
      ...["", "createPropertyAccessor", "createRefCountedMulticastOperator"].map(verbatimType =>
        defineLatexEnvironment(verbatimType + "Verbatim" + star, argumentListWithWhitespace(squareBracketGroupArray, defineEnvStringEnd(verbatimType + "Verbatim" + star)))
      )
    ]),
    // Minted environment
    defineLatexEnvironment("minted", argumentListWithWhitespace(squareBracketGroupArray, argumentListWithWhitespace(curlyBraceGroupArray, defineEnvStringEnd("minted"))))
  ];

  // Return the full highlighting definition
  return {
    name: "LaTeX",
    aliases: ["tex"],
    contains: [
      ...specialHighlightRules,
      ...baseHighlightRules
    ]
  };
}

module.exports = createLatexHighlightingDefinition;