/**
 * Factory function that creates a syntax highlighting definition for MikroTik RouterOS scripts.
 * This is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing built-in modes and helpers.
 * @returns {object} The syntax highlighting definition object for MikroTik RouterOS scripts.
 */
function createMikrotikRouterOSHighlightDefinition(hljs) {
  // Variable highlighting: $var, ${var}
  const variableMode = {
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

  // Double-quoted string, supporting variable and command substitution
  const doubleQuotedStringMode = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      variableMode,
      {
        className: "variable",
        begin: /\$\(/,
        end: /\)/,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };

  // Single-quoted string
  const singleQuotedStringMode = {
    className: "string",
    begin: /'/,
    end: /'/
  };

  // List of literal values
  const literals = "true false yes no nothing nil null";

  // List of keywords
  const keywordsList = [
    "foreach", "do", "while", "for", "if", "from", "to", "step", "else", "on-error", "and", "or", "not", "in"
  ];

  // List of built-in functions
  const builtInFunctions = [
    "global", "local", "beep", "delay", "put", "len", "typeof", "pick", "log", "time", "set", "find", "environment", "terminal", "error", "execute", "parse", "resolve", "toarray", "tobool", "toid", "toip", "toip6", "tonum", "tostr", "totime"
  ];

  // List of built-in commands
  const builtInCommands = [
    "add", "remove", "enable", "disable", "set", "get", "print", "export", "edit", "find", "run", "debug", "error", "info", "warning"
  ];

  // List of built-in objects (resources, services, etc.)
  const builtInObjects = [
    "traffic-flow", "traffic-generator", "firewall", "scheduler", "aaa", "accounting", "address-list", "address", "align", "area", "bandwidth-server", "bfd", "bgp", "bridge", "client", "clock", "community", "config", "connection", "console", "customer", "default", "dhcp-client", "dhcp-server", "discovery", "dns", "e-mail", "ethernet", "filter", "firmware", "gps", "graphing", "group", "hardware", "health", "hotspot", "identity", "igmp-proxy", "incoming", "instance", "interface", "ip", "ipsec", "ipv6", "irq", "l2tp-server", "lcd", "ldp", "logging", "mac-server", "mac-winbox", "mangle", "manual", "mirror", "mme", "mpls", "nat", "renderCliOutput", "neighbor", "network", "note", "ntp", "ospf", "ospf-v3", "ovpn-server", "page", "peer", "pim", "ping", "policy", "pool", "port", "ppp", "pppoe-client", "pptp-server", "prefix", "profile", "proposal", "proxy", "queue", "radius", "resource", "rip", "ripng", "route", "routing", "screen", "script", "security-profiles", "server", "service", "service-port", "settings", "shares", "smb", "sms", "sniffer", "snmp", "snooper", "socks", "sstp-server", "system", "tool", "tracking", "type", "upgrade", "upnp", "user-manager", "users", "user", "vlan", "secret", "vrrp", "watchdog", "web-access", "wireless", "pptp", "pppoe", "lan", "wan", "layer7-protocol", "lease", "simple", "raw"
  ];

  return {
    name: "Microtik RouterOS script",
    aliases: ["mikrotik"],
    case_insensitive: true,
    keywords: {
      $pattern: /:?[\w-]+/,
      literal: literals,
      keyword: [
        keywordsList.join(" "),
        // Add colon-prefixed keywords for label syntax
        keywordsList.map(k => ":" + k).join(" "),
        // Add colon-prefixed built-in functions
        builtInFunctions.map(fn => ":" + fn).join(" ")
      ].join(" ")
    },
    contains: [
      // Block, line, and XML-style comments
      {
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
      },
      // Hash comments (using highlight.js built-in COMMENT mode)
      hljs.COMMENT("^#", "$"),
      // Strings
      doubleQuotedStringMode,
      singleQuotedStringMode,
      // Variables
      variableMode,
      // Attribute assignments (e.g., foo=bar)
      {
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
              doubleQuotedStringMode,
              singleQuotedStringMode,
              variableMode,
              {
                className: "literal",
                begin: new RegExp("\\b(" + literals.split(" ").join("|") + ")\\b")
              },
              {
                begin: /("[^"]*"|[^\s{}[\]]+)/
              }
            ]
          }
        ]
      },
      // Hexadecimal numbers (e.g., *1A2B)
      {
        className: "number",
        begin: /\*[0-9a-fA-F]+/
      },
      // Built-in commands (e.g., add, remove, etc.)
      {
        begin: new RegExp("\\b(" + builtInCommands.join("|") + ")([\\s[(\\]|])"),
        returnBegin: true,
        contains: [
          {
            className: "builtin-name",
            begin: /\\w+/
          }
        ]
      },
      // Built-in objects/resources
      {
        className: "built_in",
        variants: [
          {
            begin: new RegExp(
              "(\\.\\./|/|\\s)((" + builtInObjects.join("|") + ");?\\s)+"
            )
          },
          {
            begin: /\.\./,
            relevance: 0
          }
        ]
      }
    ]
  };
}

module.exports = createMikrotikRouterOSHighlightDefinition;