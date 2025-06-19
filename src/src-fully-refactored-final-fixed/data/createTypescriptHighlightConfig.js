/**
 * Generates a Highlight.js-compatible configuration object for TypeScript syntax highlighting.
 * Extends a base JavaScript configuration with TypeScript-specific keywords, types, and constructs.
 *
 * @param {object} highlightJsApi - The Highlight.js API object, providing utility functions and constants.
 * @returns {object} TypeScript language definition object for Highlight.js.
 */
function createTypescriptHighlightConfig(highlightJsApi) {
  // Mode for matching 'namespace' declarations
  const namespaceMode = {
    beginKeywords: "namespace",
    end: /\{/,
    excludeEnd: true
  };

  // Mode for matching 'interface' declarations
  const interfaceMode = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: true,
    keywords: "interface extends"
  };

  // Mode for matching 'use strict' directives
  const useStrictMode = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };

  // List of built-in TypeScript types
  const typescriptBuiltInTypes = [
    "any", "void", "number", "boolean", "string", "object", "never", "enum"
  ];

  // List of TypeScript-specific keywords
  const typescriptKeywords = [
    "type", "namespace", "typedef", "interface", "public", "private", "protected",
    "implements", "declare", "abstract", "readonly"
  ];

  // Compose the full set of keywords, literals, and built-ins for TypeScript
  const typescriptKeywordSet = {
    $pattern: "[a-z$_][0-9A-zA-z$_]*",
    keyword: DyA.concat(typescriptKeywords), // DyA: base JS keywords
    literal: YyA, // YyA: base JS literals
    built_in: WyA.concat(typescriptBuiltInTypes) // WyA: base JS built-ins
  };

  // Mode for matching decorators (e.g., @Component)
  const decoratorMode = {
    className: "meta",
    begin: "@[a-z$_][0-9A-zA-z$_]*"
  };

  /**
   * Utility function to replace a mode in the 'contains' array by label.
   * @param {object} config - The language definition object.
   * @param {string} label - The label of the mode to replace.
   * @param {object} newMode - The new mode object to insert.
   */
  const replaceModeByLabel = (config, label, newMode) => {
    const modeIndex = config.contains.findIndex(mode => mode.label === label);
    if (modeIndex === -1) {
      throw new Error("can not find mode to replace");
    }
    config.contains.splice(modeIndex, 1, newMode);
  };

  // Create the base JavaScript highlighting config
  const javascriptConfig = createJavascriptHighlightConfig(highlightJsApi);

  // Merge TypeScript keywords, literals, and built-ins into the base config
  Object.assign(javascriptConfig.keywords, typescriptKeywordSet);

  // Add decorator mode to parameter contains
  javascriptConfig.exports.PARAMS_CONTAINS.push(decoratorMode);

  // Add TypeScript-specific modes to the top-level contains array
  javascriptConfig.contains = javascriptConfig.contains.concat([
    decoratorMode,
    namespaceMode,
    interfaceMode
  ]);

  // Replace the shebang and use_strict modes with updated versions
  replaceModeByLabel(javascriptConfig, "shebang", highlightJsApi.SHEBANG());
  replaceModeByLabel(javascriptConfig, "use_strict", useStrictMode);

  // Set function mode relevance to 0 to avoid over-highlighting
  const functionMode = javascriptConfig.contains.find(mode => mode.className === "function");
  functionMode.relevance = 0;

  // Finalize the config with TypeScript-specific metadata
  Object.assign(javascriptConfig, {
    name: "TypeScript",
    aliases: ["ts", "tsx"]
  });

  return javascriptConfig;
}

module.exports = createTypescriptHighlightConfig;