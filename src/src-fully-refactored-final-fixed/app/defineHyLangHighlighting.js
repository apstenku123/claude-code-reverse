/**
 * Defines syntax highlighting rules for the Hy programming language (hylang) for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing helper methods for defining modes.
 * @returns {object} Highlight.js language definition object for Hy.
 */
function defineHyLangHighlighting(hljs) {
  // Allowed characters for identifiers
  const identifierChars = "a-zA-Z_\\-!.?+*=<>&#'";

  // Regex for valid Hy identifiers
  const identifierPattern = `[${identifierChars}][${identifierChars}0-9/;:]*`;

  // Hy built-in keywords and pattern
  const keywords = {
    $pattern: identifierPattern,
    "builtin-name":
      "!= % %= & &= * ** **= *= *map + += , --build-class-- --import-- -= . / // //= /= < << <<= <= = > >= >> >>= @ @= ^ ^= abs accumulate all and any ap-compose ap-dotimes ap-each ap-each-while ap-filter ap-first ap-if ap-last ap-map ap-map-when ap-pipe ap-reduce ap-reject apply as-> ascii assert assoc bin break butlast callable calling-module-name car case cdr chain chr coll? combinations compile compress cond cons cons? continue count curry cut cycle dec def default-method defclass defmacro defmacro-alias defmacro/g! defmain defmethod defmulti defn defn-alias defnc defnr defreader defseq del delattr delete-route dict-comp dir disassemble dispatch-reader-macro distinct divmod do doto drop drop-last drop-while empty? end-sequence eval eval-and-compile eval-when-compile even? every? except exec filter first flatten float? fn fnc fnr for for* format fraction genexpr gensym get getattr global globals group-by hasattr hash hex id identity if if* if-not if-python2 import in inc input instance? integer integer-char? integer? interleave interpose is is-coll is-cons is-empty is-even is-every is-float is-instance is-integer is-integer-char is-iterable is-iterator is-keyword is-neg is-none is-not is-numeric is-odd is-pos is-string is-symbol is-zero isinstance islice issubclass iter iterable? iterate iterator? keyword keyword? lambda last len let lif lif-not list* list-comp locals loop macro-error macroexpand macroexpand-1 macroexpand-all map max merge-with method-decorator min multi-decorator multicombinations name neg? next none? nonlocal not not-in not? nth numeric? oct odd? open or ord partition permutations pos? post-route postwalk pow prewalk print product profile/calls profile/cpu put-route quasiquote quote raise range read read-str recursive-replace reduce remove repeat repeatedly repr require rest round route route-with-methods rwm second seq set-comp setattr setv some sorted string string? sum switch symbol? take take-nth take-while tee try unless unquote unquote-splicing vars walk when while with with* with-decorator with-gensyms xi xor yield yield-from zero? zip zip-longest | |= ~"
  };

  // Regex for numbers (integer and float)
  const numberPattern = "[-+]?\\d+(\\.\\d+)?";

  // Mode for matching identifiers (for fallback)
  const identifierMode = {
    begin: identifierPattern,
    relevance: 0
  };

  // Mode for matching numbers
  const numberMode = {
    className: "number",
    begin: numberPattern,
    relevance: 0
  };

  // Mode for matching strings (inherits from QUOTE_STRING_MODE)
  const stringMode = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null // Allow all characters inside strings
  });

  // Mode for line comments (start with ';')
  const lineCommentMode = hljs.COMMENT(";", "$", {
    relevance: 0
  });

  // Mode for matching literals (True, False, nil, None)
  const literalMode = {
    className: "literal",
    begin: /\b([Tt]rue|[Ff]alse|nil|None)\b/
  };

  // Mode for matching brackets and braces (for nesting)
  const bracketMode = {
    begin: "[\\[\\{]",
    end: "[\\]\\}]"
  };

  // Mode for metadata comments (e.g., ^foo)
  const metadataCommentMode = {
    className: "comment",
    begin: "^" + identifierPattern
  };

  // Mode for metadata blocks (e.g., ^{ ... })
  const metadataBlockMode = hljs.COMMENT("^\\{", "\\}");

  // Mode for symbols (e.g., :foo or ::foo)
  const symbolMode = {
    className: "symbol",
    begin: ":{1,2}" + identifierPattern
  };

  // Mode for parentheses (main form container)
  const parenMode = {
    begin: "\\(",
    end: "\\)"
  };

  // Mode for the body of a form (after the function name)
  const formBodyMode = {
    endsWithParent: true,
    relevance: 0
  };

  // Mode for function/macro names (first element in a form)
  const nameMode = {
    className: "name",
    relevance: 0,
    keywords: keywords,
    begin: identifierPattern,
    starts: formBodyMode
  };

  // All modes that can appear inside forms and brackets
  const commonContainedModes = [
    parenMode,
    stringMode,
    metadataCommentMode,
    metadataBlockMode,
    lineCommentMode,
    symbolMode,
    bracketMode,
    numberMode,
    literalMode,
    identifierMode
  ];

  // Define what can be inside parentheses
  parenMode.contains = [
    hljs.COMMENT("comment", ""), // Placeholder for block comments (not used in Hy, but for consistency)
    nameMode,
    formBodyMode
  ];

  // Define what can be inside form bodies and brackets
  formBodyMode.contains = commonContainedModes;
  bracketMode.contains = commonContainedModes;

  // Return the full language definition
  return {
    name: "Hy",
    aliases: ["hylang"],
    illegal: /\s/, // Disallow any non-whitespace outside of defined modes
    contains: [
      hljs.SHEBANG(),
      parenMode,
      stringMode,
      metadataCommentMode,
      metadataBlockMode,
      lineCommentMode,
      symbolMode,
      bracketMode,
      numberMode,
      literalMode
    ]
  };
}

module.exports = defineHyLangHighlighting;