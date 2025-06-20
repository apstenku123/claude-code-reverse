/**
 * Defines syntax highlighting rules for Bash and related shells.
 *
 * @param {object} hljs - The highlight.js core object, providing utility modes and helpers.
 * @returns {object} Highlight.js language definition for Bash.
 */
function defineBashHighlighting(hljs) {
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

  // Assign variableInterpolation with className and variants
  Object.assign(variableInterpolation, {
    className: "variable",
    variants: [
      {
        // Simple variable: $VAR, $1, $#, $@, etc.
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

  // Here-documents (e.g., <<EOF ... EOF)
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

  // Double-quoted string, allowing variable interpolation and command substitution
  const doubleQuotedString = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, variableInterpolation, commandSubstitution]
  };

  // Allow command substitution inside double-quoted strings
  commandSubstitution.contains.push(doubleQuotedString);

  // Escaped double quote (e.g., \" inside strings)
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

  // List of common shell binaries for shebang detection
  const shellBinaries = [
    "fish", "bash", "zsh", "sh", "csh", "ksh", "tcsh", "dash", "scsh"
  ];

  // Shebang line for shell scripts
  const shebang = hljs.SHEBANG({
    binary: `(${shellBinaries.join("|")})`,
    relevance: 10
  });

  // Function definition (e.g., my_func() { ... })
  const functionDefinition = {
    className: "function",
    begin: /\\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: true,
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: /\\w[\w\d_]*/
      })
    ],
    relevance: 0
  };

  // Keywords, literals, and built-ins for Bash
  const keywords = {
    $pattern: /\b[a-z._-]+\b/,
    keyword: "if then else elif fi for while in do done case esac function",
    literal: "true false",
    built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload convertFieldsToObject bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
  };

  return {
    name: "Bash",
    aliases: ["sh", "zsh"],
    keywords,
    contains: [
      shebang,
      hljs.SHEBANG(), // generic shebang
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

module.exports = defineBashHighlighting;