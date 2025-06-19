/**
 * Factory function that creates a LaTeX syntax highlighting definition for a highlighting engine (e.g., highlight.js).
 * It defines keywords, built-ins, meta, comments, string handling, and various LaTeX-specific constructs.
 *
 * @param {object} hljs - The highlighting engine instance, providing COMMENT, END_SAME_AS_BEGIN, and inherit helpers.
 * @returns {object} The LaTeX language definition object for the highlighting engine.
 */
function createLatexHighlightDefinition(hljs) {
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
    pattern => pattern + "(?![a-zA@:_])"
  );

  // Regex for LaTeX3 and expl3 command patterns
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

  // Variants for generic LaTeX command names
  const genericCommandVariants = [
    { begin: /[a-zA@]+/ },
    { begin: /[^a-zA-zA@]?/ }
  ];

  // Variants for math superscript color codes (e.g., ^{6abcdef})
  const superscriptColorVariants = [
    { begin: /\^{6}[0-9a-f]{6}/ },
    { begin: /\^{5}[0-9a-f]{5}/ },
    { begin: /\^{4}[0-9a-f]{4}/ },
    { begin: /\^{3}[0-9a-f]{3}/ },
    { begin: /\^{2}[0-9a-f]{2}/ },
    { begin: /\^{2}[\u0000-\u007f]/ }
  ];

  // Main LaTeX command matcher (\command)
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
        variants: superscriptColorVariants
      },
      {
        endsParent: true,
        relevance: 0,
        variants: genericCommandVariants
      }
    ]
  };

  // Parameter matcher for macros (e.g., #1, ##2)
  const macroParameter = {
    className: "params",
    relevance: 0,
    begin: /#+\d?/
  };

  // Math superscript color code matcher
  const superscriptColor = {
    variants: superscriptColorVariants
  };

  // Built-in math symbols ($, &, ^, _)
  const mathBuiltins = {
    className: "built_in",
    relevance: 0,
    begin: /[$&^_]/
  };

  // Meta directive (e.g., % !TeX ...)
  const texMeta = {
    className: "meta",
    begin: "% !TeX",
    end: "$",
    relevance: 10
  };

  // Standard LaTeX comment
  const latexComment = hljs.COMMENT("%", "$", { relevance: 0 });

  // All basic LaTeX constructs
  const basicLatexContains = [latexCommand, macroParameter, superscriptColor, mathBuiltins, texMeta, latexComment];

  // Curly brace group (e.g., { ... })
  const curlyGroup = {
    begin: /\{/,
    end: /\}/,
    relevance: 0,
    contains: ["self", ...basicLatexContains]
  };

  // Nested curly group for environments
  const nestedCurlyGroup = hljs.inherit(curlyGroup, {
    relevance: 0,
    endsParent: true,
    contains: [curlyGroup, ...basicLatexContains]
  });

  // Square bracket group (e.g., [ ... ])
  const squareGroup = {
    begin: /\[/,
    end: /\]/,
    endsParent: true,
    relevance: 0,
    contains: [curlyGroup, ...basicLatexContains]
  };

  // Whitespace matcher (for skipping spaces)
  const whitespace = {
    begin: /\\s+/,
    relevance: 0
  };

  // Helper for environments with nested curly groups
  const nestedCurlyGroupArray = [nestedCurlyGroup];
  const squareGroupArray = [squareGroup];

  /**
   * Helper to create a rule that starts with whitespace and then a given set of contains.
   * @param {Array} containsArr
   * @param {object} startsObj
   * @returns {object}
   */
  function withWhitespace(containsArr, startsObj) {
    return {
      contains: [whitespace],
      starts: {
        relevance: 0,
        contains: containsArr,
        starts: startsObj
      }
    };
  }

  /**
   * Helper to define a macro command (e.g., \verb, \lstinline, etc.)
   * @param {string} macroName
   * @param {object} startsObj
   * @returns {object}
   */
  function macroCommand(macroName, startsObj) {
    return {
      begin: "\\" + macroName + "(?![a-zA@:_])",
      keywords: {
        $pattern: /\[a-zA-Z]+/,
        keyword: "\\" + macroName
      },
      relevance: 0,
      contains: [whitespace],
      starts: startsObj
    };
  }

  /**
   * Helper to define a \begin{env} rule for environments
   * @param {string} envNamePattern
   * @param {object} startsObj
   * @returns {object}
   */
  function beginEnvironment(envNamePattern, startsObj) {
    return hljs.inherit({
      begin: "\\begin(?=[ \processRuleBeginHandlers]*(\r?\n[ \processRuleBeginHandlers]*)?\\{" + envNamePattern + "\\})",
      keywords: {
        $pattern: /\[a-zA-Z]+/,
        keyword: "\\begin"
      },
      relevance: 0
    }, withWhitespace(nestedCurlyGroupArray, startsObj));
  }

  /**
   * Helper to define a string region (e.g., for verbatim, lstinline, etc.)
   * @param {string} [className="string"]
   * @returns {object}
   */
  function genericStringRegion(className = "string") {
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
   * Helper to define a string that ends at \end{env}
   * @param {string} envName
   * @returns {object}
   */
  function stringUntilEndEnv(envName) {
    return {
      className: "string",
      end: "(?=\\\\end\\{" + envName + "\\})"
    };
  }

  /**
   * Helper to define a nested string group (e.g., for \mintinline)
   * @param {string} [className="string"]
   * @returns {object}
   */
  function nestedStringGroup(className = "string") {
    return {
      relevance: 0,
      begin: /\{/,
      starts: {
        endsParent: true,
        contains: [
          {
            className,
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

  // Macro commands for verbatim-like and URL-like commands
  const macroCommands = [
    ...["verb", "lstinline"].map(name => macroCommand(name, { contains: [genericStringRegion()] })),
    macroCommand("mint", withWhitespace(nestedCurlyGroupArray, { contains: [genericStringRegion()] })),
    macroCommand("mintinline", withWhitespace(nestedCurlyGroupArray, { contains: [nestedStringGroup(), genericStringRegion()] })),
    macroCommand("url", { contains: [nestedStringGroup("link"), nestedStringGroup("link")] }),
    macroCommand("hyperref", { contains: [nestedStringGroup("link")] }),
    macroCommand("href", withWhitespace(squareGroupArray, { contains: [nestedStringGroup("link")] }))
  ];

  // Environment definitions for verbatim, filecontents, and Verbatim variants
  const environmentCommands = [].concat(
    ...["", "\\*"].map(suffix => [
      beginEnvironment("verbatim" + suffix, stringUntilEndEnv("verbatim" + suffix)),
      beginEnvironment("filecontents" + suffix, withWhitespace(nestedCurlyGroupArray, stringUntilEndEnv("filecontents" + suffix))),
      ...["", "createPropertyAccessor", "createRefCountedMulticastOperator"].map(
        variant => beginEnvironment(variant + "Verbatim" + suffix, withWhitespace(squareGroupArray, stringUntilEndEnv(variant + "Verbatim" + suffix)))
      )
    ])
  );

  // Minted environment (special case)
  const mintedEnvironment = beginEnvironment("minted", withWhitespace(squareGroupArray, withWhitespace(nestedCurlyGroupArray, stringUntilEndEnv("minted"))));

  // All special macro/environment rules
  const specialLatexRules = [
    ...macroCommands,
    ...environmentCommands,
    mintedEnvironment
  ];

  return {
    name: "LaTeX",
    aliases: ["tex"],
    contains: [
      ...specialLatexRules,
      ...basicLatexContains
    ]
  };
}

module.exports = createLatexHighlightDefinition;