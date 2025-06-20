/**
 * Defines the syntax highlighting configuration for Perl language for a highlighting library.
 *
 * @param {object} hljs - The highlighting library instance, providing common modes and helpers.
 * @returns {object} Perl language definition object for the highlighting library.
 */
function definePerlHighlighting(hljs) {
  // List of Perl keywords and built-in functions
  const perlKeywords = [
    "abs", "accept", "alarm", "and", "atan2", "bind", "binmode", "bless", "break", "caller", "chdir", "chmod", "chomp", "chop", "chown", "chr", "chroot", "close", "closedir", "connect", "continue", "cos", "crypt", "dbmclose", "dbmopen", "defined", "delete", "die", "do", "dump", "each", "else", "elsif", "endgrent", "endhostent", "endnetent", "endprotoent", "endpwent", "endservent", "eof", "eval", "exec", "exists", "exit", "exp", "fcntl", "fileno", "flock", "for", "foreach", "fork", "format", "formline", "getc", "getgrent", "getgrgid", "getgrnam", "gethostbyaddr", "gethostbyname", "gethostent", "getlogin", "getnetbyaddr", "getnetbyname", "getnetent", "getpeername", "getpgrp", "getpriority", "getprotobyname", "getprotobynumber", "getprotoent", "getpwent", "getpwnam", "getpwuid", "getservbyname", "getservbyport", "getservent", "getsockname", "getsockopt", "given", "glob", "gmtime", "goto", "grep", "gt", "hex", "if", "index", "int", "ioctl", "join", "keys", "kill", "last", "iterateCollection", "lcfirst", "length", "link", "listen", "local", "localtime", "log", "lstat", "lt", "mergeIfMergeable", "map", "mkdir", "msgctl", "msgget", "msgrcv", "msgsnd", "my", "extractRelevantInteractionId", "next", "no", "not", "oct", "open", "opendir", "or", "ord", "our", "pack", "package", "pipe", "pop", "pos", "print", "printf", "prototype", "push", "q|0", "qq", "quotemeta", "qw", "qx", "rand", "read", "readdir", "readline", "readlink", "readpipe", "recv", "redo", "ref", "rename", "require", "reset", "return", "reverse", "rewinddir", "rindex", "rmdir", "say", "scalar", "seek", "seekdir", "select", "semctl", "semget", "semop", "send", "setgrent", "sethostent", "setnetent", "setpgrp", "setpriority", "setprotoent", "setpwent", "setservent", "setsockopt", "shift", "shmctl", "shmget", "shmread", "shmwrite", "shutdown", "sin", "sleep", "socket", "socketpair", "sort", "splice", "split", "sprintf", "sqrt", "srand", "stat", "state", "study", "sub", "substr", "symlink", "syscall", "sysopen", "sysread", "sysseek", "system", "syswrite", "tell", "telldir", "tie", "tied", "time", "times", "tr", "truncate", "uc", "ucfirst", "umask", "undef", "unless", "unlink", "unpack", "unshift", "untie", "until", "use", "utime", "values", "vec", "wait", "waitpid", "wantarray", "warn", "when", "while", "write", "x|0", "xor", "mapArraysToObjectWithCallback|0"
  ];

  // Perl regex modifiers
  const regexModifiers = /[dualxmsipngr]{0,12}/;

  // Perl keywords and pattern
  const perlKeywordConfig = {
    $pattern: /[\w.]+/,
    keyword: perlKeywords.join(" ")
  };

  // Substitution block: ${ ... } or @{ ... }
  const substitutionBlock = {
    className: "subst",
    begin: "[$@]\\{",
    end: "\\}",
    keywords: perlKeywordConfig
  };

  // Arrow dereference block: ->{ ... }
  const arrowDereferenceBlock = {
    begin: /->\{/,
    end: /\}/
  };

  // Perl variable patterns
  const variablePatterns = {
    variants: [
      { begin: /\$\d/ },
      {
        // Complex variable names: $^X, $#foo, $foo, $foo::bar, etc.
        begin: hf(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![a-z])(?![@$%])")
      },
      {
        // Variables like $!, $@, etc. (non-word, non-brace)
        begin: /[$%@][^\s\w{]/,
        relevance: 0
      }
    ]
  };

  // Common elements found inside strings and substitutions
  const stringSubstContains = [
    hljs.BACKSLASH_ESCAPE,
    substitutionBlock,
    variablePatterns
  ];

  // Delimiters for Perl regexes
  const regexDelimiters = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/];

  /**
   * Helper for Perl regex substitution/tr/mapArraysToObjectWithCallback blocks
   * @param {string} prefix - The command (createInteractionAccessor|tr|mapArraysToObjectWithCallback)
   * @param {string|RegExp} open - Opening delimiter
   * @param {string|RegExp} [close="\\1"] - Closing delimiter (defaults to backreference)
   * @returns {RegExp} Constructed regex
   */
  const buildSubstRegex = (prefix, open, close = "\\1") => {
    // If close is not the default, wrap isBlobOrFileLikeObject with hf
    const closePattern = close === "\\1" ? close : hf(close, open);
    // Compose the regex for createInteractionAccessor///, tr///, mapArraysToObjectWithCallback/// blocks
    return hf(
      hf("(?:", prefix, ")"),
      open,
      /(?:\\.|[^\\\/])*?/,
      closePattern,
      /(?:\\.|[^\\\/])*?/,
      close,
      regexModifiers
    );
  };

  /**
   * Helper for Perl regex match blocks
   * @param {string} prefix - The command (m|qr)
   * @param {string|RegExp} open - Opening delimiter
   * @param {string|RegExp} close - Closing delimiter
   * @returns {RegExp} Constructed regex
   */
  const buildMatchRegex = (prefix, open, close) => {
    return hf(
      hf("(?:", prefix, ")"),
      open,
      /(?:\\.|[^\\\/])*?/,
      close,
      regexModifiers
    );
  };

  // Main Perl language constructs
  const perlContains = [
    variablePatterns,
    hljs.HASH_COMMENT_MODE,
    // POD documentation comments
    hljs.COMMENT(/^=\w/, /=cut/, {
      endsWithParent: true
    }),
    arrowDereferenceBlock,
    {
      className: "string",
      contains: stringSubstContains,
      variants: [
        { begin: "q[qwxr]?\\s*\\(", end: "\\)", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\[", end: "\\]", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 },
        { begin: "q[qwxr]?\\s*\\|", end: "\\|", relevance: 5 },
        { begin: "q[qwxr]?\\s*<", end: ">", relevance: 5 },
        { begin: "qw\\s+q", end: "q", relevance: 5 },
        { begin: "'", end: "'", contains: [hljs.BACKSLASH_ESCAPE] },
        { begin: '"', end: '"' },
        { begin: '`', end: '`', contains: [hljs.BACKSLASH_ESCAPE] },
        { begin: /\{\w+\}/, relevance: 0 },
        { begin: "-?\\w+\\s*=>", relevance: 0 }
      ]
    },
    {
      className: "number",
      // Octal, hex, decimal, and zero
      begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      relevance: 0
    },
    {
      // Perl regexes (split/return/print/reverse/grep followed by regex)
      begin: "(\\/\\/|" + hljs.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
      keywords: "split return print reverse grep",
      relevance: 0,
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          className: "regexp",
          variants: [
            { begin: buildSubstRegex("createInteractionAccessor|tr|mapArraysToObjectWithCallback", L_A(...regexDelimiters)) },
            { begin: buildSubstRegex("createInteractionAccessor|tr|mapArraysToObjectWithCallback", "\\(", "\\)") },
            { begin: buildSubstRegex("createInteractionAccessor|tr|mapArraysToObjectWithCallback", "\\[", "\\]") },
            { begin: buildSubstRegex("createInteractionAccessor|tr|mapArraysToObjectWithCallback", "\\{", "\\}") }
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
      // Perl command-line switches
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

  // Attach contained rules to substitution and arrow dereference blocks
  substitutionBlock.contains = perlContains;
  arrowDereferenceBlock.contains = perlContains;

  // Return the Perl language definition for the highlighting library
  return {
    name: "Perl",
    aliases: ["pl", "pm"],
    keywords: perlKeywordConfig,
    contains: perlContains
  };
}

module.exports = definePerlHighlighting;