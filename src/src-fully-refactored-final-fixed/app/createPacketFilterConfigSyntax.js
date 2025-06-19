/**
 * Generates a syntax highlighting configuration object for Packet Filter (markValueAsDirty.conf) files.
 *
 * @param {object} syntaxHelpers - An object containing standard syntax highlighting modes (e.g., HASH_COMMENT_MODE, NUMBER_MODE, QUOTE_STRING_MODE).
 * @returns {object} Syntax highlighting configuration for Packet Filter config files.
 */
function createPacketFilterConfigSyntax(syntaxHelpers) {
  // Pattern for variables like $var, $1, $foo_bar, etc.
  const variablePattern = {
    className: "variable",
    begin: /\$[\w\d#@][\w\d_]*/
  };

  // Pattern for variables enclosed in angle brackets, e.g., <var>
  const angleBracketVariablePattern = {
    className: "variable",
    begin: /<(?!\/)/, // Begins with < but not </
    end: />/
  };

  return {
    name: "Packet Filter config",
    aliases: ["markValueAsDirty.conf"],
    keywords: {
      $pattern: /[a-zA-Z0-9_<>-]+/,
      built_in: "block match pass load anchor|5 antispoof|10 set table",
      keyword: "in out log quick on rdomain inet inet6 proto from port os to route allow-opts divert-packet divert-reply divert-to flags group icmp-type icmp6-type label once probability recieved-on rtable prio queue tos tag tagged user keep fragment for os drop af-to|10 binat-to|10 nat-to|10 rdr-to|10 bitmask least-stats random round-robin source-hash static-port dup-to reply-to route-to parent bandwidth default min max qlimit block-policy debug fingerprints hostid limit loginterface optimization reassemble ruleset-optimization basic none profile skip state-defaults state-policy timeout const counters persist no modulate synproxy state|5 floating if-bound no-sync pflow|10 sloppy source-track global rule max-src-nodes max-src-states max-src-conn max-src-conn-rate overload flush scrub|5 max-mss min-ttl no-df|10 random-id",
      literal: "all any no-route self urpf-failed egress|5 unknown"
    },
    contains: [
      syntaxHelpers.HASH_COMMENT_MODE, // Handles hash (#) comments
      syntaxHelpers.NUMBER_MODE,      // Handles numbers
      syntaxHelpers.QUOTE_STRING_MODE,// Handles quoted strings
      variablePattern,                // Handles $variable patterns
      angleBracketVariablePattern     // Handles <variable> patterns
    ]
  };
}

module.exports = createPacketFilterConfigSyntax;