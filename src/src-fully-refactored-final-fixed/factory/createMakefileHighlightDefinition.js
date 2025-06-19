/**
 * Factory function that creates a syntax highlighting definition for Makefile files.
 *
 * @param {object} hljs - The highlight.js language definition object, providing regexes and modes.
 * @returns {object} The Makefile language definition for highlight.js.
 */
function createMakefileHighlightDefinition(hljs) {
  // Variable interpolation: $(VAR) or special variables like $@, $%, etc.
  const variableInterpolation = {
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

  // Double-quoted string, can contain variable interpolation
  const doubleQuotedString = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, variableInterpolation]
  };

  // Function call: $(function_name ...)
  const functionCall = {
    className: "variable",
    begin: /\$\([\w-]+\s/,
    end: /\)/,
    keywords: {
      built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
    },
    contains: [variableInterpolation]
  };

  // Variable assignment at the beginning of a line
  const variableAssignment = {
    begin: "^" + hljs.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
  };

  // .PHONY meta target
  const phonyMeta = {
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
      functionCall,
      variableAssignment,
      phonyMeta,
      sectionHeader
    ]
  };
}

module.exports = createMakefileHighlightDefinition;
