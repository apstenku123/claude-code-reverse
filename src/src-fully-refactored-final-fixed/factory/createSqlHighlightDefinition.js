/**
 * Factory function that creates a SQL syntax highlighting definition object for use with a syntax highlighter (e.g., highlight.js).
 * It defines SQL keywords, types, literals, operators, and patterns for strings, comments, and variables.
 *
 * @param {object} hljs - The highlight.js language API object, providing helpers for defining comments, numbers, and block comments.
 * @returns {object} SQL language definition object for highlight.js
 */
function createSqlHighlightDefinition(hljs) {
  // Single line comment definition
  const singleLineComment = hljs.COMMENT("--", "$", {});

  // String literal definition for single quotes (with escaped '')
  const singleQuotedString = {
    className: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [{ begin: /''/ }]
      }
    ]
  };

  // String literal definition for double quotes (with escaped "")
  const doubleQuotedString = {
    begin: /"/,
    end: /"/,
    contains: [{ begin: /""/ }]
  };

  // SQL literals
  const sqlLiterals = ["true", "false", "unknown"];

  // Multi-word SQL types
  const multiWordTypes = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ];

  // SQL type keywords
  const sqlTypes = [
    "bigint", "binary", "blob", "boolean", "char", "character", "clob", "date", "dec", "decfloat", "decimal", "float", "int", "integer", "interval", "nchar", "nclob", "national", "numeric", "real", "row", "smallint", "time", "timestamp", "varchar", "varying", "varbinary"
  ];

  // Additional SQL keywords (short list)
  const additionalKeywords = [
    "add", "asc", "collation", "desc", "final", "first", "last", "view"
  ];

  // Main SQL keywords (comprehensive list)
  const sqlKeywords = [
    "abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update   ", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year"
  ];

  // SQL built-in functions
  const sqlBuiltInFunctions = [
    "abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket"
  ];

  // SQL built-in constants (current_*, session_user, etc.)
  const sqlBuiltInConstants = [
    "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp"
  ];

  // Multi-word SQL phrases (for special highlighting)
  const multiWordPhrases = [
    "create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first"
  ];

  // For built-in function highlighting
  const builtInFunctions = sqlBuiltInFunctions;

  // Compute keywords that are not built-in functions (for keyword highlighting)
  const nonFunctionKeywords = [...sqlKeywords, ...additionalKeywords].filter(keyword => {
    return !builtInFunctions.includes(keyword);
  });

  // Variable pattern (e.g., @variable)
  const variablePattern = {
    className: "variable",
    begin: /@[a-z0-9]+/
  };

  // Operator pattern
  const operatorPattern = {
    className: "operator",
    begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  };

  // Built-in function call pattern (e.g., SUM(...))
  const builtInFunctionCall = {
    begin: Li9(/\b/, RO1(...builtInFunctions), /\s*\(/),
    keywords: {
      built_in: builtInFunctions
    }
  };

  /**
   * Helper function to mark short keywords with a lower relevance (|0) unless in exceptions.
   * @param {string[]} keywordList
   * @param {object} [options]
   * @param {string[]} [options.exceptions]
   * @param {function} [options.when]
   * @returns {string[]}
   */
  function markShortKeywords(keywordList, { exceptions = [], when } = {}) {
    const isShort = when;
    return keywordList.map(keyword => {
      // If keyword already has a relevance marker or is in exceptions, leave as is
      if (keyword.match(/\|\d+$/) || exceptions.includes(keyword)) {
        return keyword;
      } else if (isShort(keyword)) {
        // Mark short keywords with |0
        return `${keyword}|0`;
      } else {
        return keyword;
      }
    });
  }

  return {
    name: "SQL",
    case_insensitive: true,
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: markShortKeywords(nonFunctionKeywords, {
        when: keyword => keyword.length < 3
      }),
      literal: sqlLiterals,
      type: sqlTypes,
      built_in: sqlBuiltInConstants
    },
    contains: [
      // Multi-word phrases (special highlighting)
      {
        begin: RO1(...multiWordPhrases),
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: nonFunctionKeywords.concat(multiWordPhrases),
          literal: sqlLiterals,
          type: sqlTypes
        }
      },
      // Multi-word types
      {
        className: "type",
        begin: RO1(...multiWordTypes)
      },
      builtInFunctionCall,
      variablePattern,
      singleQuotedString,
      doubleQuotedString,
      hljs.C_NUMBER_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      singleLineComment,
      operatorPattern
    ]
  };
}

module.exports = createSqlHighlightDefinition;