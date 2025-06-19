/**
 * Defines the syntax highlighting rules for Bash and related shells.
 *
 * @param {object} hljs - The highlight.js core object, providing utility modes and helpers.
 * @returns {object} Syntax definition object for Bash highlighting.
 *
 * This function constructs and returns a configuration object for highlight.js
 * to enable syntax highlighting for Bash scripts and similar shell languages.
 * It defines patterns for variables, strings, substitutions, heredocs, functions,
 * and keywords, and includes support for various shell dialects.
 */
function defineBashSyntaxHighlighting(hljs) {
  // Variable interpolation inside double quotes and elsewhere
  const variableInterpolation = {};

  // Parameter expansion (e.g., ${VAR:-default})
  const parameterExpansion = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [variableInterpolation]
      }
    ]
  };

  // Populate variableInterpolation with variable and parameter expansion patterns
  Object.assign(variableInterpolation, {
    className: "variable",
    variants: [
      {
        // Simple variable (e.g., $VAR, $1, $@, $#, etc.)
        begin: Yu9(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
      },
      parameterExpansion
    ]
  });

  // Command substitution: $( ... )
  const commandSubstitution = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  // Heredoc (e.g., <<EOF ... EOF)
  const heredoc = {
    begin: /<<-?\s*(?=\w+)/,
    starts: {
      contains: [
        hljs.END_SAME_AS_BEGIN({
          begin: /(\w+)/,
          end: /(\w+)/,
          className: "string"
        })
      ]
    }
  };

  // Double-quoted string, supporting escapes, variables, and command substitution
  const doubleQuotedString = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, variableInterpolation, commandSubstitution]
  };

  // Allow command substitution to contain double-quoted strings (recursive)
  commandSubstitution.contains.push(doubleQuotedString);

  // Escaped double quote (e.g., \"), treated as a string fragment
  const escapedDoubleQuote = {
    className: "",
    begin: /\\"/
  };

  // Single-quoted string (no interpolation)
  const singleQuotedString = {
    className: "string",
    begin: /'/,
    end: /'/
  };

  // Arithmetic expansion: $(( ... ))
  const arithmeticExpansion = {
    begin: /\$\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\\d+#[0-9a-f]+/,
        className: "number"
      },
      hljs.NUMBER_MODE,
      variableInterpolation
    ]
  };

  // Supported shell dialects for shebang detection
  const shellDialects = [
    "fish", "bash", "zsh", "sh", "csh", "ksh", "tcsh", "dash", "scsh"
  ];

  // Shebang line for shell scripts
  const shebang = hljs.SHEBANG({
    binary: `(${shellDialects.join("|")})`,
    relevance: 10
  });

  // Function definition (e.g., my_func() { ... })
  const functionDefinition = {
    className: "function",
    begin: /\\w[\w\d_]*\s*\(\s*\)\s*\{/, // function name () {
    returnBegin: true,
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: /\\w[\w\d_]*/
      })
    ],
    relevance: 0
  };

  // Main syntax definition object
  return {
    name: "Bash",
    aliases: ["sh", "zsh"],
    keywords: {
      $pattern: /\b[a-z._-]+\b/,
      keyword: "if then else elif fi for while in do done case esac function",
      literal: "true false",
      built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload convertFieldsToObject bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
    },
    contains: [
      shebang,
      hljs.SHEBANG(),
      functionDefinition,
      arithmeticExpansion,
      hljs.HASH_COMMENT_MODE,
      heredoc,
      doubleQuotedString,
      escapedDoubleQuote,
      singleQuotedString,
      variableInterpolation
    ]
  };
}

module.exports = defineBashSyntaxHighlighting;