/**
 * Returns a syntax highlighting definition object for the crmsh language (Cluster Resource Manager Shell).
 *
 * @param {object} hljs - The highlight.js library object, providing built-in modes and utilities.
 * @returns {object} Highlight.js language definition for crmsh.
 */
function getCrmshHighlightDefinition(hljs) {
  // Keywords for resource types and configuration sections
  const resourceKeywords = [
    "group", "clone", "ms", "master", "location", "colocation",
    "order", "fencing_topology", "rsc_ticket", "acl_target",
    "acl_group", "user", "role", "tag", "xml"
  ];

  // Keywords for property sections
  const propertyKeywords = [
    "property", "rsc_defaults", "op_defaults"
  ];

  // Keywords for parameters and attributes
  const attributeKeywords = [
    "params", "meta", "operations", "op", "rule", "attributes", "utilization"
  ];

  // Additional keywords for rules, conditions, and types
  const ruleKeywords = [
    "read", "write", "deny", "defined", "not_defined", "in_range",
    "date", "spec", "in", "ref", "reference", "attribute", "type",
    "xpath", "version", "and", "or", "lt", "gt", "tag", "lte", "gte",
    "eq", "extractRelevantInteractionId", "\\"
  ];

  // Data type keywords
  const dataTypeKeywords = ["number", "string"];

  // Literal values
  const literalKeywords = [
    "Master", "Started", "Slave", "Stopped", "start", "promote",
    "demote", "stop", "monitor", "true", "false"
  ];

  // Combine all keywords for the 'keyword' category
  const allKeywords = [
    ...attributeKeywords,
    ...ruleKeywords,
    ...dataTypeKeywords
  ].join(" ");

  // Combine all literals for the 'literal' category
  const allLiterals = literalKeywords.join(" ");

  return {
    name: "crmsh",
    aliases: ["crm", "pcmk"],
    case_insensitive: true,
    keywords: {
      keyword: allKeywords,
      literal: allLiterals
    },
    contains: [
      // Hash comments
      hljs.HASH_COMMENT_MODE,
      // Node definition blocks
      {
        beginKeywords: "node",
        starts: {
          end: /\\s*([\w_-]+:)?/,
          starts: {
            className: "title",
            end: /\\s*[\$\w_][\w_-]*/
          }
        }
      },
      // Primitive and template resources
      {
        beginKeywords: "primitive rsc_template",
        starts: {
          className: "title",
          end: /\\s*[\$\w_][\w_-]*/,
          starts: {
            end: /\\s*@?[\w_][\w_\.:-]*/
          }
        }
      },
      // Resource section headers
      {
        begin: new RegExp(`\\b(${resourceKeywords.join("|")})\\s+`),
        keywords: resourceKeywords.join(" "),
        starts: {
          className: "title",
          end: /[\$\w_][\w_-]*/
        }
      },
      // Property section headers
      {
        beginKeywords: propertyKeywords.join(" "),
        starts: {
          className: "title",
          end: /\\s*([\w_-]+:)?/
        }
      },
      // Quoted strings
      hljs.QUOTE_STRING_MODE,
      // Meta resource references (e.g., ocf:heartbeat:IPaddr2)
      {
        className: "meta",
        begin: /(ocf|systemd|service|lsb):[\w_:-]+/,
        relevance: 0
      },
      // Numbers with optional units
      {
        className: "number",
        begin: /\b\d+(\.\d+)?(ms|createInteractionAccessor|h|m)?/,
        relevance: 0
      },
      // Literal infinity values
      {
        className: "literal",
        begin: /-?(infinity|inf)/,
        relevance: 0
      },
      // Attribute assignments (e.g., foo=bar)
      {
        className: "attr",
        begin: /([A-Za-z$_#][\w_-]+)=/,
        relevance: 0
      },
      // XML-like tags
      {
        className: "tag",
        begin: /<\/?/,
        end: /\/?>/,
        relevance: 0
      }
    ]
  };
}

module.exports = getCrmshHighlightDefinition;
