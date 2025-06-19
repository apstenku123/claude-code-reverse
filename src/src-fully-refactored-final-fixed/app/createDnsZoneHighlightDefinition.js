/**
 * Generates a syntax highlighting definition for DNS zone files for use with a highlighting library.
 *
 * @param {object} highlightLib - The syntax highlighting library object, expected to provide COMMENT, NUMBER_MODE, and inherit utilities.
 * @returns {object} Highlight.js language definition object for DNS zone files.
 */
function createDnsZoneHighlightDefinition(highlightLib) {
  return {
    name: "DNS Zone",
    aliases: ["bind", "zone"],
    keywords: {
      // List of DNS record types as keywords
      keyword: "IN a AAAA AFSDB APL ToolErrorDetailsPanel CDNSKEY CDS CERT CNAME DHCID DLV DNAME DNSKEY DS HIP IPSECKEY KEY KX LOC FieldDescriptor NAPTR NS NSEC NSEC3 NSEC3PARAM PTR RRSIG RP SIG SOA SRV SSHFP TA TKEY TLSA TSIG TXT"
    },
    contains: [
      // DNS comments start with ';' and go to end of line
      highlightLib.COMMENT(";", "$", {
        relevance: 0
      }),
      // Meta directives like $TTL, $GENERATE, $INCLUDE, $ORIGIN
      {
        className: "meta",
        begin: /^\$(TTL|GENERATE|INCLUDE|ORIGIN)\b/
      },
      // IPv6 address matching (very complex regex)
      {
        className: "number",
        begin:
          // This regex matches all valid IPv6 addresses, including those with embedded IPv4
          "((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|" +
          "(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|" +
          "(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|" +
          "(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|" +
          "(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|" +
          "(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|" +
          "(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|" +
          "(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))\\b"
      },
      // IPv4 address matching
      {
        className: "number",
        begin:
          // This regex matches standard IPv4 addresses
          "((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\b"
      },
      // Numeric values with optional time unit suffix (d, h, processWithTransformedObservable, m)
      highlightLib.inherit(highlightLib.NUMBER_MODE, {
        begin: /\b\d+[dhwm]?/
      })
    ]
  };
}

module.exports = createDnsZoneHighlightDefinition;