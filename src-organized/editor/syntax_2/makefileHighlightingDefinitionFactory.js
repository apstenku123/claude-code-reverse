/**
 * Generates a syntax highlighting definition object for Makefile files.
 *
 * @param {object} hljs - The highlight.js language definition object, providing regexes and modes.
 * @returns {object} The Makefile language definition for syntax highlighting.
 */
function makefileHighlightingDefinitionFactory(hljs) {
  // Variable highlighting: $(VAR)
  const variablePattern = {
    className: "variable",
    variants: [
      {
        // Matches variables like $(VAR_NAME)
        begin: "\\$\\(" + hljs.UNDERSCORE_IDENT_RE + "\\)",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        // Matches variables like $@, $%, $<, etc.
        begin: /\$[@%<?\^\+\*]/
      }
    ]
  };

  // String highlighting: "..."
  const stringPattern = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, variablePattern]
  };

  // Function call highlighting: $(function ...)
  const functionCallPattern = {
    className: "variable",
    begin: /\$\([\w-]+\s/,
    end: /\)/,
    keywords: {
      built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
    },
    contains: [variablePattern]
  };

  // Variable assignment detection: VAR = ...
  const variableAssignmentPattern = {
    begin: "^" + hljs.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
  };

  // .PHONY meta target highlighting
  const phonyMetaPattern = {
    className: "meta",
    begin: /^\.PHONY:/,
    end: /$/,
    keywords: {
      $pattern: /[\.\w]+/,
      "meta-keyword": ".PHONY"
    }
  };

  // Section (target) highlighting: target:
  const sectionPattern = {
    className: "section",
    begin: /^[^\s]+:/,
    end: /$/,
    contains: [variablePattern]
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
      variablePattern,
      stringPattern,
      functionCallPattern,
      variableAssignmentPattern,
      phonyMetaPattern,
      sectionPattern
    ]
  };
}

module.exports = makefileHighlightingDefinitionFactory;