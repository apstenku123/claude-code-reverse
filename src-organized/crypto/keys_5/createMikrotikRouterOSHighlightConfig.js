/**
 * Generates a highlight.js language definition for MikroTik RouterOS scripting language.
 *
 * @param {object} hljs - The highlight.js library instance, providing built-in modes and helpers.
 * @returns {object} Highlight.js language definition object for MikroTik RouterOS script.
 */
function createMikrotikRouterOSHighlightConfig(hljs) {
  // Variable patterns: $var, ${var}
  const variablePattern = {
    className: "variable",
    variants: [
      {
        begin: /\$[\w\d#@][\w\d_]*/
      },
      {
        begin: /\$\{(.*?)\}/
      }
    ]
  };

  // Double-quoted string, supports variable and command substitution
  const doubleQuotedString = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      variablePattern,
      {
        className: "variable",
        begin: /\$\(/,
        end: /\)/,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };

  // Single-quoted string (no interpolation)
  const singleQuotedString = {
    className: "string",
    begin: /'/,
    end: /'/
  };

  // Keywords, literals, and built-in functions
  const LITERALS = "true false yes no nothing nil null";
  const KEYWORDS = [
    "foreach", "do", "while", "for", "if", "from", "to", "step", "else", "on-error",
    "and", "or", "not", "in"
  ];
  const BUILTIN_FUNCTIONS = [
    "global", "local", "beep", "delay", "put", "len", "typeof", "pick", "log", "time", "set",
    "find", "environment", "terminal", "error", "execute", "parse", "resolve", "toarray",
    "tobool", "toid", "toip", "toip6", "tonum", "tostr", "totime"
  ];

  // Build keyword pattern string for highlight.js
  const keywordPattern = KEYWORDS.join(" :") + " :" + BUILTIN_FUNCTIONS.join(" :");

  // Comment variants: /* ... */, // ..., <// ... >
  const commentVariants = {
    variants: [
      {
        begin: /\/\*/,
        end: /\*\//
      },
      {
        begin: /\/\//,
        end: /$/
      },
      {
        begin: /<\//,
        end: />/
      }
    ],
    illegal: /./
  };

  // Attribute assignment (e.g., name=value)
  const attributeAssignment = {
    begin: /[\w-]+=([^\s{}[\]()>]+)/,
    relevance: 0,
    returnBegin: true,
    contains: [
      {
        className: "attribute",
        begin: /[^=]+/
      },
      {
        begin: /=/,
        endsWithParent: true,
        relevance: 0,
        contains: [
          doubleQuotedString,
          singleQuotedString,
          variablePattern,
          {
            className: "literal",
            begin: new RegExp("\\b(" + LITERALS.split(" ").join("|") + ")\\b")
          },
          {
            begin: /("[^"]*"|[^\s{}[\]]+)/
          }
        ]
      }
    ]
  };

  // Hexadecimal number (e.g., *1A2B)
  const hexNumber = {
    className: "number",
    begin: /\*[0-9a-fA-F]+/
  };

  // Built-in commands (e.g., add, remove, enable, ...)
  const BUILTIN_COMMANDS = [
    "add", "remove", "enable", "disable", "set", "get", "print", "export", "edit", "find",
    "run", "debug", "error", "info", "warning"
  ];
  const builtinCommandPattern = "\\b(" + BUILTIN_COMMANDS.join("|") + ")([\\s[(\\]|])";
  const builtinCommand = {
    begin: builtinCommandPattern,
    returnBegin: true,
    contains: [
      {
        className: "builtin-name",
        begin: /\\w+/
      }
    ]
  };

  // Built-in objects/resources (e.g., interface, ip, firewall, ...)
  const BUILTIN_OBJECTS = [
    "traffic-flow", "traffic-generator", "firewall", "scheduler", "aaa", "accounting",
    "address-list", "address", "align", "area", "bandwidth-server", "bfd", "bgp", "bridge",
    "client", "clock", "community", "config", "connection", "console", "customer", "default",
    "dhcp-client", "dhcp-server", "discovery", "dns", "e-mail", "ethernet", "filter",
    "firmware", "gps", "graphing", "group", "hardware", "health", "hotspot", "identity",
    "igmp-proxy", "incoming", "instance", "interface", "ip", "ipsec", "ipv6", "irq",
    "l2tp-server", "lcd", "ldp", "logging", "mac-server", "mac-winbox", "mangle", "manual",
    "mirror", "mme", "mpls", "nat", "renderCliOutput", "neighbor", "network", "note", "ntp", "ospf",
    "ospf-v3", "ovpn-server", "page", "peer", "pim", "ping", "policy", "pool", "port",
    "ppp", "pppoe-client", "pptp-server", "prefix", "profile", "proposal", "proxy", "queue",
    "radius", "resource", "rip", "ripng", "route", "routing", "screen", "script",
    "security-profiles", "server", "service", "service-port", "settings", "shares", "smb",
    "sms", "sniffer", "snmp", "snooper", "socks", "sstp-server", "system", "tool",
    "tracking", "type", "upgrade", "upnp", "user-manager", "users", "user", "vlan",
    "secret", "vrrp", "watchdog", "web-access", "wireless", "pptp", "pppoe", "lan", "wan",
    "layer7-protocol", "lease", "simple", "raw"
  ];
  const builtinObjectPattern =
    "(\\.\\./|/|\\s)((" + BUILTIN_OBJECTS.join("|") + ");?\\s)+";
  const builtinObject = {
    className: "built_in",
    variants: [
      {
        begin: builtinObjectPattern
      },
      {
        begin: /\.\./,
        relevance: 0
      }
    ]
  };

  return {
    name: "Microtik RouterOS script",
    aliases: ["mikrotik"],
    case_insensitive: true,
    keywords: {
      $pattern: /:?[\w-]+/,
      literal: LITERALS,
      keyword: keywordPattern
    },
    contains: [
      // Comments
      commentVariants,
      hljs.COMMENT("^#", "$"),
      // Strings
      doubleQuotedString,
      singleQuotedString,
      // Variables
      variablePattern,
      // Attribute assignments
      attributeAssignment,
      // Hexadecimal numbers
      hexNumber,
      // Built-in commands
      builtinCommand,
      // Built-in objects/resources
      builtinObject
    ]
  };
}

module.exports = createMikrotikRouterOSHighlightConfig;