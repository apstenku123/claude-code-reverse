/**
 * Defines syntax highlighting rules for JBoss CLI and Wildfly CLI commands for a syntax highlighter (e.g., highlight.js).
 *
 * @param {object} hljs - The highlight.js library instance, providing standard modes like HASH_COMMENT_MODE and QUOTE_STRING_MODE.
 * @returns {object} Highlight.js language definition object for JBoss CLI.
 */
function defineJbossCliHighlighting(hljs) {
  // Matches parameter lists in parentheses, e.g., (param1=val1, param2=val2)
  const paramsInParens = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    contains: [
      {
        // Matches parameter assignments, e.g., param1 = value
        begin: /[\w-]+ *=/,
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: "attr",
            begin: /[\w-]+/
          }
        ]
      }
    ],
    relevance: 0
  };

  // Matches function-like syntax, e.g., :function-name
  const functionName = {
    className: "function",
    begin: /:[\w\-.]+/,
    relevance: 0
  };

  // Matches strings that look like file paths or dotted names, e.g., /path/to/file or .some.value
  const pathString = {
    className: "string",
    begin: /\b([\/.])[\w\-.\/=]+/
  };

  // Matches CLI parameters that start with --, e.g., --option=value
  const cliParam = {
    className: "params",
    begin: /--[\w\-=\/]+/
  };

  return {
    name: "JBoss CLI",
    aliases: ["wildfly-cli"],
    keywords: {
      $pattern: "[a-z-]+",
      keyword: "alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",
      literal: "true false"
    },
    contains: [
      hljs.HASH_COMMENT_MODE, // Support for # comments
      hljs.QUOTE_STRING_MODE, // Support for quoted strings
      cliParam,
      functionName,
      pathString,
      paramsInParens
    ]
  };
}

module.exports = defineJbossCliHighlighting;