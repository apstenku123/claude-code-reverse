/**
 * Defines syntax highlighting rules for Perl language for a code highlighter.
 *
 * @param {object} hljs - The highlight.js library instance providing language helpers and common modes.
 * @returns {object} An object defining Perl language highlighting configuration.
 */
function definePerlHighlightingRules(hljs) {
  // List of Perl keywords and built-in functions
  const perlKeywords = [
    "abs", "accept", "alarm", "and", "atan2", "bind", "binmode", "bless", "break", "caller", "chdir", "chmod", "chomp", "chop", "chown", "chr", "chroot", "close", "closedir", "connect", "continue", "cos", "crypt", "dbmclose", "dbmopen", "defined", "delete", "die", "do", "dump", "each", "else", "elsif", "endgrent", "endhostent", "endnetent", "endprotoent", "endpwent", "endservent", "eof", "eval", "exec", "exists", "exit", "exp", "fcntl", "fileno", "flock", "for", "foreach", "fork", "format", "formline", "getc", "getgrent", "getgrgid", "getgrnam", "gethostbyaddr", "gethostbyname", "gethostent", "getlogin", "getnetbyaddr", "getnetbyname", "getnetent", "getpeername", "getpgrp", "getpriority", "getprotobyname", "getprotobynumber", "getprotoent", "getpwent", "getpwnam", "getpwuid", "getservbyname", "getservbyport", "getservent", "getsockname", "getsockopt", "given", "glob", "gmtime", "goto", "grep", "gt", "hex", "if", "index", "int", "ioctl", "join", "keys", "kill", "last", "iterateCollection", "lcfirst", "length", "link", "listen", "local", "localtime", "log", "lstat", "lt", "mergeIfMergeable", "map", "mkdir", "msgctl", "msgget", "msgrcv", "msgsnd", "my", "extractRelevantInteractionId", "next", "no", "not", "oct", "open", "opendir", "or", "ord", "our", "pack", "package", "pipe", "pop", "pos", "print", "printf", "prototype", "push", "q|0", "qq", "quotemeta", "qw", "qx", "rand", "read", "readdir", "readline", "readlink", "readpipe", "recv", "redo", "ref", "rename", "require", "reset", "return", "reverse", "rewinddir", "rindex", "rmdir", "say", "scalar", "seek", "seekdir", "select", "semctl", "semget", "semop", "send", "setgrent", "sethostent", "setnetent", "setpgrp", "setpriority", "setprotoent", "setpwent", "setservent", "setsockopt", "shift", "shmctl", "shmget", "shmread", "shmwrite", "shutdown", "sin", "sleep", "socket", "socketpair", "sort", "splice", "split", "sprintf", "sqrt", "srand", "stat", "state", "study", "sub", "substr", "symlink", "syscall", "sysopen", "sysread", "sysseek", "system", "syswrite", "tell", "telldir", "tie", "tied", "time", "times", "tr", "truncate", "uc", "ucfirst", "umask", "undef", "unless", "unlink", "unpack", "unshift", "untie", "until", "use", "utime", "values", "vec", "wait", "waitpid", "wantarray", "warn", "when", "while", "write", "x|0", "xor", "mapArraysToObjectWithCallback|0"
  ];

  // Perl regex modifiers
  const perlRegexModifiers = /[dualxmsipngr]{0,12}/;

  // Perl keyword pattern for highlight.js
  const perlKeywordPattern = {
    $pattern: /[\w.]+/,
    keyword: perlKeywords.join(" ")
  };

  // Substitution block (e.g., ${var})
  const substitutionBlock = {
    className: "subst",
    begin: "[$@]\\{",
    end: "\\}",
    keywords: perlKeywordPattern
  };

  // Arrow dereference block (e.g., ->{ ... })
  const arrowDereferenceBlock = {
    begin: /->\{/,
    end: /\}/
  };

  // Perl variable patterns
  const perlVariablePatterns = {
    variants: [
      { begin: /\$\d/ },
      {
        // Complex variable names: $^W, $#foo, $foo::bar, etc.
        begin: hf(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![a-z])(?![@$%])")
      },
      {
        // Variables like $!, $/, etc.
        begin: /[$%@][^\s\w{]/,
        relevance: 0
      }
    ]
  };

  // Common elements that can appear inside strings and substitutions
  const stringSubstitutionContains = [
    hljs.BACKSLASH_ESCAPE,
    substitutionBlock,
    perlVariablePatterns
  ];

  // Delimiters for Perl regex and quote-like operators
  const regexDelimiters = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/];

  /**
   * Helper for constructing Perl regex patterns for createInteractionAccessor///, tr///, mapArraysToObjectWithCallback///, etc.
   * @param {string} prefix - Operator prefix (e.g., 'createInteractionAccessor', 'tr', 'mapArraysToObjectWithCallback')
   * @param {string|RegExp} open - Opening delimiter
   * @param {string|RegExp} [close="\\1"] - Closing delimiter (defaults to backreference)
   * @returns {RegExp} The constructed regex
   */
  const buildSubstitutionRegex = (prefix, open, close = "\\1") => {
    // If close is default, use as is, else build with hf
    const closePattern = close === "\\1" ? close : hf(close, open);
    // Compose the full regex for the operator
    return hf(
      hf("(?:", prefix, ")"),
      open,
      /(?:\\.|[^\\\/])*?/,
      closePattern,
      /(?:\\.|[^\\\/])*?/,
      close,
      perlRegexModifiers
    );
  };

  /**
   * Helper for constructing Perl regex patterns for m//, qr//, etc.
   * @param {string} prefix - Operator prefix (e.g., 'm', 'qr')
   * @param {string|RegExp} open - Opening delimiter
   * @param {string|RegExp} close - Closing delimiter
   * @returns {RegExp} The constructed regex
   */
  const buildMatchRegex = (prefix, open, close) => {
    return hf(
      hf("(?:", prefix, ")"),
      open,
      /(?:\\.|[^\\\/])*?/,
      close,
      perlRegexModifiers
    );
  };

  // Main Perl language constructs for highlight.js
  const perlContains = [
    perlVariablePatterns,
    hljs.HASH_COMMENT_MODE,
    // POD documentation comments
    hljs.COMMENT(/^=\w/, /=cut/, {
      endsWithParent: true
    }),
    arrowDereferenceBlock,
    {
      className: "string",
      contains: stringSubstitutionContains,
      variants: [
        // Quote-like operators with different delimiters
        { begin: "q[qwxr]?\\s*\\(", end: "\\)", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\[", end: "\\]", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\|", end: "\\|", relevance: 5 },
        { begin: "q[qwxr]?\\s*<", end: ">", relevance: 5 },
        { begin: "qw\\s+q", end: "q", relevance: 5 },
        // Standard string delimiters
        { begin: "'", end: "'", contains: [hljs.BACKSLASH_ESCAPE] },
        { begin: '"', end: '"' },
        { begin: "`", end: "`", contains: [hljs.BACKSLASH_ESCAPE] },
        // Hash key or block
        { begin: /\{\w+\}/, relevance: 0 },
        // Hash pair (key => value)
        { begin: "-?\\w+\\s*=>", relevance: 0 }
      ]
    },
    {
      className: "number",
      // Perl number formats: octal, hex, decimal, etc.
      begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      relevance: 0
    },
    {
      // Perl regex operators and quote-like constructs
      begin: "(\/\/|" + hljs.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
      keywords: "split return print reverse grep",
      relevance: 0,
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          className: "regexp",
          variants: [
            { begin: buildSubstitutionRegex("createInteractionAccessor|tr|mapArraysToObjectWithCallback", L_A(...regexDelimiters)) },
            { begin: buildSubstitutionRegex("createInteractionAccessor|tr|mapArraysToObjectWithCallback", "\\(", "\\)") },
            { begin: buildSubstitutionRegex("createInteractionAccessor|tr|mapArraysToObjectWithCallback", "\\[", "\\]") },
            { begin: buildSubstitutionRegex("createInteractionAccessor|tr|mapArraysToObjectWithCallback", "\\{", "\\}") }
          ],
          relevance: 2
        },
        {
          className: "regexp",
          variants: [
            { begin: /(m|qr)\/\//, relevance: 0 },
            { begin: buildMatchRegex("(?:m|qr)?", /\//, /\//) },
            { begin: buildMatchRegex("m|qr", L_A(...regexDelimiters), /\1/) },
            { begin: buildMatchRegex("m|qr", /\(/, /\)/) },
            { begin: buildMatchRegex("m|qr", /\[/, /\]/) },
            { begin: buildMatchRegex("m|qr", /\{/, /\}/) }
          ]
        }
      ]
    },
    {
      className: "function",
      beginKeywords: "sub",
      end: "(\\s*\\(.*?\\))?[;{]",
      excludeEnd: true,
      relevance: 5,
      contains: [hljs.TITLE_MODE]
    },
    {
      // Perl command-line switches (e.g., -processWithTransformedObservable, -invokeHandlerWithArguments)
      begin: "-\\w\\b",
      relevance: 0
    },
    {
      // Embedded Mojolicious templates
      begin: "^__DATA__$",
      end: "^__END__$",
      subLanguage: "mojolicious",
      contains: [
        {
          begin: "^@@.*",
          end: "$",
          className: "comment"
        }
      ]
    }
  ];

  // Allow recursion for substitutions and dereference blocks
  substitutionBlock.contains = perlContains;
  arrowDereferenceBlock.contains = perlContains;

  return {
    name: "Perl",
    aliases: ["pl", "pm"],
    keywords: perlKeywordPattern,
    contains: perlContains
  };
}

module.exports = definePerlHighlightingRules;
