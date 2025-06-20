/**
 * Returns the syntax highlighting definition for Perl language for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing built-in modes and regexes.
 * @returns {object} Perl language definition object for the highlighting engine.
 */
function getPerlHighlightingDefinition(hljs) {
  // List of Perl keywords
  const perlKeywords = [
    "abs", "accept", "alarm", "and", "atan2", "bind", "binmode", "bless", "break", "caller", "chdir", "chmod", "chomp", "chop", "chown", "chr", "chroot", "close", "closedir", "connect", "continue", "cos", "crypt", "dbmclose", "dbmopen", "defined", "delete", "die", "do", "dump", "each", "else", "elsif", "endgrent", "endhostent", "endnetent", "endprotoent", "endpwent", "endservent", "eof", "eval", "exec", "exists", "exit", "exp", "fcntl", "fileno", "flock", "for", "foreach", "fork", "format", "formline", "getc", "getgrent", "getgrgid", "getgrnam", "gethostbyaddr", "gethostbyname", "gethostent", "getlogin", "getnetbyaddr", "getnetbyname", "getnetent", "getpeername", "getpgrp", "getpriority", "getprotobyname", "getprotobynumber", "getprotoent", "getpwent", "getpwnam", "getpwuid", "getservbyname", "getservbyport", "getservent", "getsockname", "getsockopt", "given", "glob", "gmtime", "goto", "grep", "gt", "hex", "if", "index", "int", "ioctl", "join", "keys", "kill", "last", "iterateCollection", "lcfirst", "length", "link", "listen", "local", "localtime", "log", "lstat", "lt", "mergeIfMergeable", "map", "mkdir", "msgctl", "msgget", "msgrcv", "msgsnd", "my", "extractRelevantInteractionId", "next", "no", "not", "oct", "open", "opendir", "or", "ord", "our", "pack", "package", "pipe", "pop", "pos", "print", "printf", "prototype", "push", "q|0", "qq", "quotemeta", "qw", "qx", "rand", "read", "readdir", "readline", "readlink", "readpipe", "recv", "redo", "ref", "rename", "require", "reset", "return", "reverse", "rewinddir", "rindex", "rmdir", "say", "scalar", "seek", "seekdir", "select", "semctl", "semget", "semop", "send", "setgrent", "sethostent", "setnetent", "setpgrp", "setpriority", "setprotoent", "setpwent", "setservent", "setsockopt", "shift", "shmctl", "shmget", "shmread", "shmwrite", "shutdown", "sin", "sleep", "socket", "socketpair", "sort", "splice", "split", "sprintf", "sqrt", "srand", "stat", "state", "study", "sub", "substr", "symlink", "syscall", "sysopen", "sysread", "sysseek", "system", "syswrite", "tell", "telldir", "tie", "tied", "time", "times", "tr", "truncate", "uc", "ucfirst", "umask", "undef", "unless", "unlink", "unpack", "unshift", "untie", "until", "use", "utime", "values", "vec", "wait", "waitpid", "wantarray", "warn", "when", "while", "write", "x|0", "xor", "mapArraysToObjectWithCallback|0"
  ];

  // Perl regex modifiers (e.g., /pattern/msix)
  const perlRegexModifiers = /[dualxmsipngr]{0,12}/;

  // Perl keywords and pattern for identifiers
  const perlKeywordConfig = {
    $pattern: /[\w.]+/,
    keyword: perlKeywords.join(" ")
  };

  // Substitution block (e.g., ${var})
  const substitutionBlock = {
    className: "subst",
    begin: "[$@]\\{",
    end: "\\}",
    keywords: perlKeywordConfig
  };

  // Arrow block (e.g., ->{ ... })
  const arrowBlock = {
    begin: /->\{/,
    end: /\}/
  };

  // Perl variable patterns (scalars, arrays, hashes, etc.)
  const perlVariablePatterns = {
    variants: [
      { begin: /\$\d/ },
      {
        // Complex variable names
        begin: hf(
          /[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/,
          "(?![a-z])(?![@$%])"
        )
      },
      {
        // Variables with non-word, non-space, non-{ after sigil
        begin: /[$%@][^\s\w{]/,
        relevance: 0
      }
    ]
  };

  // Common elements inside strings and substitutions
  const stringSubstitutionContains = [
    hljs.BACKSLASH_ESCAPE,
    substitutionBlock,
    perlVariablePatterns
  ];

  // Delimiters for Perl regexes
  const regexDelimiters = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/];

  /**
   * Helper to build a regex for createInteractionAccessor///, tr///, mapArraysToObjectWithCallback/// with arbitrary delimiters
   * @param {string} prefix - createInteractionAccessor|tr|mapArraysToObjectWithCallback
   * @param {string|RegExp} open - Opening delimiter
   * @param {string|RegExp} [close] - Closing delimiter (defaults to open)
   * @returns {RegExp}
   */
  const buildSubstitutionRegex = (prefix, open, close = "\\1") => {
    // If close is default, use backreference, else use hf to build
    const closeDelim = close === "\\1" ? close : hf(close, open);
    return hf(
      hf("(?:", prefix, ")"),
      open,
      /(?:\\.|[^\\\/])*?/,
      closeDelim,
      /(?:\\.|[^\\\/])*?/,
      close,
      perlRegexModifiers
    );
  };

  /**
   * Helper to build a regex for m//, qr// with arbitrary delimiters
   * @param {string} prefix - m|qr
   * @param {string|RegExp} open - Opening delimiter
   * @param {string|RegExp} close - Closing delimiter
   * @returns {RegExp}
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

  // Main Perl language contains array
  const perlContains = [
    perlVariablePatterns,
    hljs.HASH_COMMENT_MODE,
    hljs.COMMENT(/^=\w/, /=cut/, {
      endsWithParent: true
    }),
    arrowBlock,
    {
      className: "string",
      contains: stringSubstitutionContains,
      variants: [
        { begin: "q[qwxr]?\\s*\\(", end: "\\)", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\[", end: "\\]", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\|", end: "\\|", relevance: 5 },
        { begin: "q[qwxr]?\\s*<", end: ">", relevance: 5 },
        { begin: "qw\\s+q", end: "q", relevance: 5 },
        { begin: "'", end: "'", contains: [hljs.BACKSLASH_ESCAPE] },
        { begin: '"', end: '"' },
        { begin: "`", end: "`", contains: [hljs.BACKSLASH_ESCAPE] },
        { begin: /\{\w+\}/, relevance: 0 },
        { begin: "-?\\w+\\s*=>", relevance: 0 }
      ]
    },
    {
      className: "number",
      // Perl numbers: octal, hex, decimal, zero
      begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      relevance: 0
    },
    {
      // Perl regexes after certain keywords or operators
      begin: "(\\/\\/|" + hljs.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
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
      // Perl command-line switches (e.g., -processWithTransformedObservable)
      begin: "-\\w\\b",
      relevance: 0
    },
    {
      // Mojolicious embedded templates
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

  // Add recursive contains for substitutions and arrow blocks
  substitutionBlock.contains = perlContains;
  arrowBlock.contains = perlContains;

  return {
    name: "Perl",
    aliases: ["pl", "pm"],
    keywords: perlKeywordConfig,
    contains: perlContains
  };
}

module.exports = getPerlHighlightingDefinition;