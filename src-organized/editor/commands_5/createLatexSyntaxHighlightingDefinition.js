/**
 * Factory function to create a LaTeX syntax highlighting definition for a highlighting engine (e.g., highlight.js).
 *
 * @param {object} hljs - The highlighting engine instance (e.g., highlight.js API object).
 * @returns {object} The LaTeX language definition object for the highlighting engine.
 */
function createLatexSyntaxHighlightingDefinition(hljs) {
  // List of LaTeX keywords and commands to highlight
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
    pattern => pattern + "(?![a-zA@:_])"
  );

  // Patterns for expl3 and other advanced LaTeX commands
  const latexExpl3Patterns = [
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

  // Variants for command names
  const commandNameVariants = [
    { begin: /[a-zA@]+/ },
    { begin: /[^a-zA-zA@]?/ }
  ];

  // Variants for Unicode/hex character codes (e.g., ^{6}abcdef)
  const hexCharVariants = [
    { begin: /\^{6}[0-9a-f]{6}/ },
    { begin: /\^{5}[0-9a-f]{5}/ },
    { begin: /\^{4}[0-9a-f]{4}/ },
    { begin: /\^{3}[0-9a-f]{3}/ },
    { begin: /\^{2}[0-9a-f]{2}/ },
    { begin: /\^{2}[\u0000-\u007f]/ }
  ];

  // Main LaTeX command pattern (e.g., \command)
  const latexCommand = {
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
        begin: new RegExp(latexExpl3Patterns)
      },
      {
        endsParent: true,
        variants: hexCharVariants
      },
      {
        endsParent: true,
        relevance: 0,
        variants: commandNameVariants
      }
    ]
  };

  // Pattern for macro parameters (e.g., #1, ##2)
  const macroParameter = {
    className: "params",
    relevance: 0,
    begin: /#+\d?/
  };

  // Variant for hex character codes
  const hexCharVariant = {
    variants: hexCharVariants
  };

  // Pattern for built-in LaTeX symbols ($, &, ^, _)
  const builtInSymbols = {
    className: "built_in",
    relevance: 0,
    begin: /[$&^_]/
  };

  // Pattern for TeX meta comments (e.g., % !TeX ...)
  const texMetaComment = {
    className: "meta",
    begin: "% !TeX",
    end: "$",
    relevance: 10
  };

  // Pattern for regular comments
  const latexComment = hljs.COMMENT("%", "$", { relevance: 0 });

  // All top-level patterns
  const topLevelContains = [latexCommand, macroParameter, hexCharVariant, builtInSymbols, texMetaComment, latexComment];

  // Pattern for curly braces blocks
  const curlyBracesBlock = {
    begin: /\{/,
    end: /\}/,
    relevance: 0,
    contains: ["self", ...topLevelContains]
  };

  // Pattern for nested curly braces blocks (for recursive parsing)
  const nestedCurlyBracesBlock = hljs.inherit(curlyBracesBlock, {
    relevance: 0,
    endsParent: true,
    contains: [curlyBracesBlock, ...topLevelContains]
  });

  // Pattern for square brackets blocks
  const squareBracketsBlock = {
    begin: /\[/,
    end: /\]/,
    endsParent: true,
    relevance: 0,
    contains: [curlyBracesBlock, ...topLevelContains]
  };

  // Pattern for whitespace (used for splitting arguments)
  const whitespace = {
    begin: /\\s+/,
    relevance: 0
  };

  // Helper arrays for argument patterns
  const curlyArgArray = [nestedCurlyBracesBlock];
  const squareArgArray = [squareBracketsBlock];

  /**
   * Helper to create a pattern for commands that take arguments.
   * @param {Array} containsArray - Patterns for arguments.
   * @param {object} startsObj - Pattern for what starts after the command.
   * @returns {object}
   */
  function createArgumentPattern(containsArray, startsObj) {
    return {
      contains: [whitespace],
      starts: {
        relevance: 0,
        contains: containsArray,
        starts: startsObj
      }
    };
  }

  /**
   * Helper to create a pattern for a specific LaTeX command.
   * @param {string} commandName - The command name (without backslash).
   * @param {object} startsObj - Pattern for what starts after the command.
   * @returns {object}
   */
  function createCommandPattern(commandName, startsObj) {
    return {
      begin: "\\\\" + commandName + "(?![a-zA@:_])",
      keywords: {
        $pattern: /\[a-zA-Z]+/,
        keyword: "\\" + commandName
      },
      relevance: 0,
      contains: [whitespace],
      starts: startsObj
    };
  }

  /**
   * Helper to create a pattern for environments (e.g., \begin{env} ... \end{env}).
   * @param {string} envNamePattern - The environment name regex.
   * @param {object} startsObj - Pattern for what starts after the environment.
   * @returns {object}
   */
  function createEnvironmentPattern(envNamePattern, startsObj) {
    return hljs.inherit({
      begin: "\\begin(?=[ \processRuleBeginHandlers]*(\r?\n[ \processRuleBeginHandlers]*)?\\{" + envNamePattern + "\\})",
      keywords: {
        $pattern: /\[a-zA-Z]+/,
        keyword: "\\begin"
      },
      relevance: 0
    }, createArgumentPattern(curlyArgArray, startsObj));
  }

  /**
   * Helper to create a string pattern for verbatim-like environments and commands.
   * @param {string} [className="string"] - The class name for the string.
   * @returns {object}
   */
  function createVerbatimStringPattern(className = "string") {
    return hljs.END_SAME_AS_BEGIN({
      className: className,
      begin: /(.|\r?\n)/,
      end: /(.|\r?\n)/,
      excludeBegin: true,
      excludeEnd: true,
      endsParent: true
    });
  }

  /**
   * Helper to create a string pattern that ends at a specific environment end.
   * @param {string} envName - The environment name.
   * @returns {object}
   */
  function createEnvStringPattern(envName) {
    return {
      className: "string",
      end: "(?=\\\\end\\{" + envName + "\\})"
    };
  }

  /**
   * Helper to create a pattern for argument blocks (e.g., {argument}).
   * @param {string} [className="string"] - The class name for the argument.
   * @returns {object}
   */
  function createArgumentBlockPattern(className = "string") {
    return {
      relevance: 0,
      begin: /\{/,
      starts: {
        endsParent: true,
        contains: [
          {
            className: className,
            end: /(?=\})/,
            endsParent: true,
            contains: [
              {
                begin: /\{/,
                end: /\}/,
                relevance: 0,
                contains: ["self"]
              }
            ]
          }
        ]
      }
    };
  }

  // Patterns for verbatim-like commands and environments
  const verbatimPatterns = [
    ...["verb", "lstinline"].map(cmd => createCommandPattern(cmd, { contains: [createVerbatimStringPattern()] })),
    createCommandPattern("mint", createArgumentPattern(curlyArgArray, { contains: [createVerbatimStringPattern()] })),
    createCommandPattern("mintinline", createArgumentPattern(curlyArgArray, { contains: [createArgumentBlockPattern(), createVerbatimStringPattern()] })),
    createCommandPattern("url", { contains: [createArgumentBlockPattern("link"), createArgumentBlockPattern("link")] }),
    createCommandPattern("hyperref", { contains: [createArgumentBlockPattern("link")] }),
    createCommandPattern("href", createArgumentPattern(squareArgArray, { contains: [createArgumentBlockPattern("link")] })),
    // Patterns for verbatim and filecontents environments (with and without *)
    ...["", "\\*"].flatMap(suffix => [
      createEnvironmentPattern("verbatim" + suffix, createEnvStringPattern("verbatim" + suffix)),
      createEnvironmentPattern("filecontents" + suffix, createArgumentPattern(curlyArgArray, createEnvStringPattern("filecontents" + suffix))),
      ...["", "createPropertyAccessor", "createRefCountedMulticastOperator"].map(prefix => createEnvironmentPattern(prefix + "Verbatim" + suffix, createArgumentPattern(squareArgArray, createEnvStringPattern(prefix + "Verbatim" + suffix))))
    ]),
    createEnvironmentPattern("minted", createArgumentPattern(squareArgArray, createArgumentPattern(curlyArgArray, createEnvStringPattern("minted"))))
  ];

  // Return the full language definition
  return {
    name: "LaTeX",
    aliases: ["tex"],
    contains: [...verbatimPatterns, ...topLevelContains]
  };
}

module.exports = createLatexSyntaxHighlightingDefinition;