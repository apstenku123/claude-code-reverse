/**
 * Returns a syntax highlighting definition for Django (and Jinja) templates for use with a highlighting library.
 *
 * @param {object} hljs - The highlighting library instance, expected to provide COMMENT, QUOTE_STRING_MODE, and APOS_STRING_MODE.
 * @returns {object} Highlight.js language definition object for Django templates.
 */
function getDjangoTemplateHighlightDefinition(hljs) {
  // Filter expression configuration for Django template filters
  const filterExpression = {
    begin: /\|[a-z]+:?/, // Matches Django filter syntax, e.g., |filtername[:]
    keywords: {
      name: [
        "truncatewords", "removetags", "linebreaksbr", "yesno", "get_digit", "timesince", "random",
        "striptags", "filesizeformat", "escape", "linebreaks", "length_is", "ljust", "rjust", "cut",
        "urlize", "fix_ampersands", "title", "floatformat", "capfirst", "pprint", "divisibleby", "add",
        "make_list", "unordered_list", "urlencode", "timeuntil", "urlizetrunc", "wordcount",
        "stringformat", "linenumbers", "slice", "date", "dictsort", "dictsortreversed",
        "default_if_none", "pluralize", "lower", "join", "center", "default", "truncatewords_html",
        "upper", "length", "phone2numeric", "wordwrap", "time", "addslashes", "slugify", "first",
        "escapejs", "force_escape", "iriencode", "last", "safe", "safeseq", "truncatechars",
        "localize", "unlocalize", "localtime", "utc", "timezone"
      ].join(' ')
    },
    contains: [hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE]
  };

  return {
    name: "Django",
    aliases: ["jinja"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      // Django block comment: {% comment %} ... {% endcomment %}
      hljs.COMMENT(/\{%\s*comment\s*%\}/, /\{%\s*endcomment\s*%\}/),
      // Django inline comment: {# ... #}
      hljs.COMMENT(/\{#/, /#\}/),
      {
        className: "template-tag",
        begin: /\{%/,
        end: /%\}/,
        contains: [
          {
            className: "name",
            begin: /\\w+/,
            keywords: {
              name: [
                "comment", "endcomment", "load", "templatetag", "ifchanged", "endifchanged", "if", "endif",
                "firstof", "for", "endfor", "ifnotequal", "endifnotequal", "widthratio", "extends", "include",
                "spaceless", "endspaceless", "regroup", "ifequal", "endifequal", "ssi", "now", "with", "cycle",
                "url", "filter", "endfilter", "debug", "block", "endblock", "else", "autoescape", "endautoescape",
                "csrf_token", "empty", "elif", "endwith", "static", "trans", "blocktrans", "endblocktrans",
                "get_static_prefix", "get_media_prefix", "plural", "get_current_language", "language",
                "get_available_languages", "get_current_language_bidi", "get_language_info",
                "get_language_info_list", "localize", "endlocalize", "localtime", "endlocaltime", "timezone",
                "endtimezone", "get_current_timezone", "verbatim"
              ].join(' ')
            },
            // Handles the rest of the tag after the tag name
            starts: {
              endsWithParent: true,
              keywords: "in by as",
              contains: [filterExpression],
              relevance: 0
            }
          }
        ]
      },
      {
        className: "template-variable",
        begin: /\{\{/, // Django variable start
        end: /\}\}/,   // Django variable end
        contains: [filterExpression]
      }
    ]
  };
}

module.exports = getDjangoTemplateHighlightDefinition;