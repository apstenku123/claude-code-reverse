/**
 * Returns the syntax highlighting configuration for Django (and Jinja) templates.
 * This configuration is intended for use with a syntax highlighter such as highlight.js.
 * It defines how template tags, variables, comments, and filters are recognized and highlighted.
 *
 * @param {object} syntaxHighlighter - An object providing syntax highlighting modes and helpers (e.g., QUOTE_STRING_MODE, APOS_STRING_MODE, COMMENT).
 * @returns {object} The syntax highlighting configuration object for Django/Jinja templates.
 */
function getDjangoTemplateHighlightConfig(syntaxHighlighter) {
  // Configuration for Django/Jinja template filters inside {{ ... }} or {% ... %}
  const filterConfig = {
    begin: /\|[a-z]+:?/, // Matches filter syntax like |filter or |filter:
    keywords: {
      name: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone"
    },
    contains: [syntaxHighlighter.QUOTE_STRING_MODE, syntaxHighlighter.APOS_STRING_MODE]
  };

  return {
    name: "Django",
    aliases: ["jinja"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      // Django comment block: {% comment %} ... {% endcomment %}
      syntaxHighlighter.COMMENT(/\{%\s*comment\s*%\}/, /\{%\s*endcomment\s*%\}/),
      // Django/Jinja single-line comment: {# ... #}
      syntaxHighlighter.COMMENT(/\{#/, /#\}/),
      {
        className: "template-tag",
        begin: /\{%/,
        end: /%\}/,
        contains: [
          {
            className: "name",
            begin: /\\w+/,
            keywords: {
              name: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim"
            },
            // After the tag name, allow 'in', 'by', 'as' keywords, and filter syntax
            starts: {
              endsWithParent: true,
              keywords: "in by as",
              contains: [filterConfig],
              relevance: 0
            }
          }
        ]
      },
      {
        className: "template-variable",
        begin: /\{\{/, // Django/Jinja variable start
        end: /\}\}/,   // Django/Jinja variable end
        contains: [filterConfig]
      }
    ]
  };
}

module.exports = getDjangoTemplateHighlightConfig;
