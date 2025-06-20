/**
 * Defines syntax highlighting rules for MikroTik RouterOS script language for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing utility regexes and common modes.
 * @returns {object} Highlight.js language definition object for MikroTik RouterOS script.
 */
function defineMikrotikRouterOSHighlighting(hljs) {
  // Variable patterns: $var, ${var}
  const variablePattern = {
    className: "variable",
    variants: [
      {
        begin: /\$[\w\d#@][\w\d_]*/ // $variable
      },
      {
        begin: /\$\{(.*?)\}/ // ${variable}
      }
    ]
  };

  // Double-quoted string, can contain variables and escapes
  const doubleQuotedString = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      variablePattern,
      {
        className: "variable",
        begin: /\$\(/, // $( ... )
        end: /\)/,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };

  // Single-quoted string
  const singleQuotedString = {
    className: "string",
    begin: /'/,
    end: /'/
  };

  // Keywords, literals, and built-ins
  const LITERALS = "true false yes no nothing nil null";
  const KEYWORDS = [
    "foreach", "do", "while", "for", "if", "from", "to", "step", "else", "on-error",
    "and", "or", "not", "in"
  ];
  const BUILTIN_FUNCTIONS = [
    "global", "local", "beep", "delay", "put", "len", "typeof", "pick", "log", "time",
    "set", "find", "environment", "terminal", "error", "execute", "parse", "resolve",
    "toarray", "tobool", "toid", "toip", "toip6", "tonum", "tostr", "totime"
  ];
  const BUILTIN_COMMANDS = [
    "add", "remove", "enable", "disable", "set", "get", "print", "export", "edit",
    "find", "run", "debug", "error", "info", "warning"
  ];
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
    "ppp", "pppoe-client", "pptp-server", "prefix", "profile", "proposal", "proxy",
    "queue", "radius", "resource", "rip", "ripng", "route", "routing", "screen", "script",
    "security-profiles", "server", "service", "service-port", "settings", "shares", "smb",
    "sms", "sniffer", "snmp", "snooper", "socks", "sstp-server", "system", "tool",
    "tracking", "type", "upgrade", "upnp", "user-manager", "users", "user", "vlan",
    "secret", "vrrp", "watchdog", "web-access", "wireless", "pptp", "pppoe", "lan", "wan",
    "layer7-protocol", "lease", "simple", "raw"
  ];

  // Build keyword pattern string for highlight.js
  const keywordPattern = KEYWORDS.join(" ");
  const keywordColonPattern = KEYWORDS.map(k => `:${k}`).join(" ");
  const builtinFunctionColonPattern = BUILTIN_FUNCTIONS.map(fn => `:${fn}`).join(" ");

  return {
    name: "Microtik RouterOS script",
    aliases: ["mikrotik"],
    case_insensitive: true,
    keywords: {
      $pattern: /:?[\w-]+/,
      literal: LITERALS,
      keyword: `${keywordPattern} ${keywordColonPattern} ${builtinFunctionColonPattern}`
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
        illegal: /./ // Only allow these comment forms
      },
      // Hash comments (e.g. # comment)
      hljs.COMMENT("^#", "$"),
      // Strings
      doubleQuotedString,
      singleQuotedString,
      // Variables
      variablePattern,
      // Attribute assignments (e.g. name=value)
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
              doubleQuotedString,
              singleQuotedString,
              variablePattern,
              {
                className: "literal",
                begin: new RegExp(`\\b(${LITERALS.split(" ").join("|")})\\b`)
              },
              {
                begin: /("[^"]*"|[^\s{}[\]]+)/
              }
            ]
          }
        ]
      },
      // Hexadecimal numbers (e.g. *1A2B)
      {
        className: "number",
        begin: /\*[0-9a-fA-F]+/
      },
      // Built-in commands (e.g. add, remove, ...)
      {
        begin: new RegExp(`\\b(${BUILTIN_COMMANDS.join("|")})([\\s[(\\]|])`),
        returnBegin: true,
        contains: [
          {
            className: "builtin-name",
            begin: /\\w+/
          }
        ]
      },
      // Built-in objects (e.g. /interface, /ip, ...)
      {
        className: "built_in",
        variants: [
          {
            begin: new RegExp(`(\\.\\./|/|\\s)(((${BUILTIN_OBJECTS.join("|")});?\\s)+)`)
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

module.exports = defineMikrotikRouterOSHighlighting;