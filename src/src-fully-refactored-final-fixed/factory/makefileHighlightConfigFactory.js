/**
 * Factory function to generate a syntax highlighting configuration for Makefile language.
 *
 * @param {object} hljs - The highlight.js language definition object. Should provide regex patterns and modes for parsing.
 * @returns {object} Highlight.js language definition for Makefile syntax highlighting.
 */
function makefileHighlightConfigFactory(hljs) {
  // Variable interpolation: $(VAR)
  const variableInterpolation = {
    className: "variable",
    variants: [
      {
        // Matches $(VAR_NAME)
        begin: "\\$\\(" + hljs.UNDERSCORE_IDENT_RE + "\\)",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        // Matches $@, $%, $<, $?, $^, $+, $*
        begin: /\$[@%<?\^\+\*]/
      }
    ]
  };

  // Double-quoted string, can contain variable interpolation
  const doubleQuotedString = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, variableInterpolation]
  };

  // Function call: $(function_name ...)
  const makefileFunctionCall = {
    className: "variable",
    begin: /\$\([\w-]+\s/,
    end: /\)/,
    keywords: {
      built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
    },
    contains: [variableInterpolation]
  };

  // Variable assignment (identifier before =, :=, ?=, +=)
  const variableAssignment = {
    begin: "^" + hljs.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
  };

  // .PHONY meta target
  const phonyMetaTarget = {
    className: "meta",
    begin: /^\.PHONY:/,
    end: /$/,
    keywords: {
      $pattern: /[\.\w]+/,
      "meta-keyword": ".PHONY"
    }
  };

  // Section header: target definitions (e.g., target: ...)
  const sectionHeader = {
    className: "section",
    begin: /^[^\s]+:/,
    end: /$/,
    contains: [variableInterpolation]
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
      variableInterpolation,
      doubleQuotedString,
      makefileFunctionCall,
      variableAssignment,
      phonyMetaTarget,
      sectionHeader
    ]
  };
}

module.exports = makefileHighlightConfigFactory;