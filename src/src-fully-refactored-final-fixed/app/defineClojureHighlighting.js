/**
 * Defines syntax highlighting rules for the Clojure programming language for use in a syntax highlighter.
 *
 * @param {object} hljs - The highlight.js instance providing utility functions and modes.
 * @returns {object} The language definition object for Clojure highlighting.
 */
function defineClojureHighlighting(hljs) {
  // Regex for valid Clojure identifiers (symbols, keywords, etc.)
  const IDENTIFIER_REGEX = "[a-zA-Z_\\-!.?+*=<>&#'][a-zA-Z_\\-!.?+*=<>&#'0-9/;:]*";

  // List of Clojure keywords for definitions
  const DEFINITION_KEYWORDS = "def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord";

  // All Clojure keywords and builtins
  const KEYWORDS = {
    $pattern: IDENTIFIER_REGEX,
    "builtin-name":
      "def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord cond apply if-not if-let if not not= =|0 <|0 >|0 <=|0 >=|0 ==|0 +|0 /|0 *|0 -|0 rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy first rest cons cast coll last butlast sigs reify second ffirst fnext nfirst nnext meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
  };

  // Regex for Clojure numbers
  const NUMBER_REGEX = "[-+]?\\d+(\\.\\d+)?";

  // Mode for matching numbers
  const NUMBER_MODE = {
    className: "number",
    begin: NUMBER_REGEX,
    relevance: 0
  };

  // Mode for matching quoted strings (inherits from hljs.QUOTE_STRING_MODE)
  const STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null
  });

  // Mode for matching line comments starting with ';'
  const LINE_COMMENT_MODE = hljs.COMMENT(";", "$", {
    relevance: 0
  });

  // Mode for matching Clojure literals (true, false, nil)
  const LITERAL_MODE = {
    className: "literal",
    begin: /\b(true|false|nil)\b/
  };

  // Mode for matching Clojure collections ([ ... ] and { ... })
  const COLLECTION_MODE = {
    begin: "[\\[\\{]",
    end: "[\\]\\}]"
  };

  // Mode for matching metadata comments (e.g., ^foo)
  const METADATA_COMMENT_MODE = {
    className: "comment",
    begin: "^" + IDENTIFIER_REGEX
  };

  // Mode for matching metadata maps (e.g., ^{...})
  const METADATA_MAP_COMMENT_MODE = hljs.COMMENT("^\\{", "\\}");

  // Mode for matching Clojure keywords (e.g., :foo or ::foo)
  const KEYWORD_MODE = {
    className: "symbol",
    begin: ":{1,2}" + IDENTIFIER_REGEX
  };

  // Mode for matching Clojure lists ( ... )
  const LIST_MODE = {
    begin: "\\(",
    end: "\\)"
  };

  // Mode for matching nested expressions (used for recursion)
  const NESTED_MODE = {
    endsWithParent: true,
    relevance: 0
  };

  // Mode for matching Clojure names (symbols, etc.)
  const NAME_MODE = {
    keywords: KEYWORDS,
    className: "name",
    begin: IDENTIFIER_REGEX,
    relevance: 0,
    starts: NESTED_MODE
  };

  // List of all modes that can appear inside expressions
  const COMMON_CONTAINS = [
    LIST_MODE,
    STRING_MODE,
    METADATA_COMMENT_MODE,
    METADATA_MAP_COMMENT_MODE,
    LINE_COMMENT_MODE,
    KEYWORD_MODE,
    COLLECTION_MODE,
    NUMBER_MODE,
    LITERAL_MODE,
    // Duplicated below for symbol/identifier matching
    {
      begin: IDENTIFIER_REGEX,
      relevance: 0
    }
  ];

  // Mode for matching Clojure definitions (def, defn, etc.)
  const DEFINITION_MODE = {
    beginKeywords: DEFINITION_KEYWORDS,
    lexemes: IDENTIFIER_REGEX,
    end: '(\\[|#|\\d|"|:|\\{|\\)|\\(|$)',
    contains: [
      {
        className: "title",
        begin: IDENTIFIER_REGEX,
        relevance: 0,
        excludeEnd: true,
        endsParent: true
      },
      ...COMMON_CONTAINS
    ]
  };

  // Setup recursive contains for nested structures
  LIST_MODE.contains = [
    hljs.COMMENT("comment", ""), // Block comment (not standard in Clojure, but supported)
    DEFINITION_MODE,
    NAME_MODE,
    NESTED_MODE
  ];
  NESTED_MODE.contains = COMMON_CONTAINS;
  COLLECTION_MODE.contains = COMMON_CONTAINS;
  METADATA_MAP_COMMENT_MODE.contains = [COLLECTION_MODE];

  // Return the language definition object
  return {
    name: "Clojure",
    aliases: ["clj"],
    illegal: /\s/,
    contains: [
      LIST_MODE,
      STRING_MODE,
      METADATA_COMMENT_MODE,
      METADATA_MAP_COMMENT_MODE,
      LINE_COMMENT_MODE,
      KEYWORD_MODE,
      COLLECTION_MODE,
      NUMBER_MODE,
      LITERAL_MODE
    ]
  };
}

module.exports = defineClojureHighlighting;