/**
 * Defines syntax highlighting rules for the crmsh language (Cluster Resource Manager Shell).
 *
 * @param {object} hljs - The highlight.js library instance, providing built-in modes and utilities.
 * @returns {object} Highlight.js language definition object for crmsh.
 */
function defineCrmshHighlighting(hljs) {
  // Keywords for crmsh resource and configuration blocks
  const resourceKeywords = "group clone ms master location colocation order fencing_topology rsc_ticket acl_target acl_group user role tag xml";
  // Keywords for crmsh property and default blocks
  const propertyKeywords = "property rsc_defaults op_defaults";
  // Keywords for crmsh parameter and operation blocks
  const parameterKeywords = "params meta operations op rule attributes utilization";
  // Additional crmsh keywords (operators, types, etc.)
  const additionalKeywords = "read write deny defined not_defined in_range date spec in ref reference attribute type xpath version and or lt gt tag lte gte eq extractRelevantInteractionId \\";
  // Data type keywords
  const dataTypeKeywords = "number string";
  // Literal values used in crmsh
  const literalKeywords = "Master Started Slave Stopped start promote demote stop monitor true false";

  return {
    name: "crmsh",
    aliases: ["crm", "pcmk"],
    case_insensitive: true,
    keywords: {
      // Combine all relevant keywords for highlighting
      keyword: `${parameterKeywords} ${additionalKeywords} ${dataTypeKeywords}`,
      literal: literalKeywords
    },
    contains: [
      // Support for hash-style comments
      hljs.HASH_COMMENT_MODE,
      // Node block (e.g., node node1)
      {
        beginKeywords: "node",
        starts: {
          end: "\\s*([\\w_-]+:)?",
          starts: {
            className: "title",
            end: "\\s*[\\$\\w_][\\w_-]*"
          }
        }
      },
      // Primitive and template resource definitions
      {
        beginKeywords: "primitive rsc_template",
        starts: {
          className: "title",
          end: "\\s*[\\$\\w_][\\w_-]*",
          starts: {
            end: "\\s*@?[\\w_][\\w_\\.:-]*"
          }
        }
      },
      // Resource block keywords (group, clone, etc.)
      {
        begin: `\\b(${resourceKeywords.split(" ").join("|")})\\s+`,
        keywords: resourceKeywords,
        starts: {
          className: "title",
          end: "[\\$\\w_][\\w_-]*"
        }
      },
      // Property and default block keywords
      {
        beginKeywords: propertyKeywords,
        starts: {
          className: "title",
          end: "\\s*([\\w_-]+:)?"
        }
      },
      // Quoted strings
      hljs.QUOTE_STRING_MODE,
      // Meta resource agent specifiers (e.g., ocf:heartbeat:IPaddr2)
      {
        className: "meta",
        begin: "(ocf|systemd|service|lsb):[\\w_:-]+",
        relevance: 0
      },
      // Numeric values with optional units
      {
        className: "number",
        begin: "\\b\\d+(\\.\\d+)?(ms|createInteractionAccessor|h|m)?",
        relevance: 0
      },
      // Literal infinity values
      {
        className: "literal",
        begin: "[-]?(infinity|inf)",
        relevance: 0
      },
      // Attribute assignments (e.g., attr=value)
      {
        className: "attr",
        begin: /([A-Za-z$_#][\w_-]+)=/,
        relevance: 0
      },
      // XML-like tags
      {
        className: "tag",
        begin: "</?",
        end: "/?>",
        relevance: 0
      }
    ]
  };
}

module.exports = defineCrmshHighlighting;
