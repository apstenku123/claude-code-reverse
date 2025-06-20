/**
 * Factory function to create a syntax highlighting configuration for Makefile files.
 *
 * @param {object} hljs - The highlight.js language definition object, providing regex patterns and escape modes.
 * @returns {object} The configuration object for Makefile syntax highlighting.
 */
function createMakefileHighlightConfig(hljs) {
  // Variable highlighting: $(VAR) and special $@, $%, etc.
  const variable = {
    className: "variable",
    variants: [
      {
        // Matches variables like $(VAR_NAME)
        begin: "\\$\\(" + hljs.UNDERSCORE_IDENT_RE + "\\)",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        // Matches special variables like $@, $%, $<, etc.
        begin: /\$[@%<?\^\+\*]/
      }
    ]
  };

  // String highlighting: double-quoted strings, can contain variables
  const string = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, variable]
  };

  // Function highlighting: $(function_name ...)
  const makefileFunction = {
    className: "variable",
    begin: /\$\([\w-]+\s/,
    end: /\)/,
    keywords: {
      built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
    },
    contains: [variable]
  };

  // Variable assignment detection (for highlighting variable names on assignment)
  const variableAssignment = {
    begin: "^" + hljs.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
  };

  // Meta directive highlighting (e.g., .PHONY)
  const metaDirective = {
    className: "meta",
    begin: /^\.PHONY:/,
    end: /$/,
    keywords: {
      $pattern: /[\.\w]+/,
      "meta-keyword": ".PHONY"
    }
  };

  // Section highlighting: targets (e.g., target: ...)
  const section = {
    className: "section",
    begin: /^[^\s]+:/,
    end: /$/,
    contains: [variable]
  };

  return {
    name: "Makefile",
    aliases: ["handleSuspensePing", "mak", "make"],
    keywords: {
      $pattern: /[\w-]+/,
      keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
    },
    contains: [
      hljs.HASH_COMMENT_MODE, // Comments starting with #
      variable,
      string,
      makefileFunction,
      variableAssignment,
      metaDirective,
      section
    ]
  };
}

module.exports = createMakefileHighlightConfig;