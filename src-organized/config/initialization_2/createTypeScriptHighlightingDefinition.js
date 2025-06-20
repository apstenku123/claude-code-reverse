/**
 * Generates a syntax highlighting definition for TypeScript, extending a base JavaScript definition.
 *
 * @param {object} hljs - The highlight.js instance, providing utility functions and language helpers.
 * @returns {object} TypeScript language definition object for highlight.js
 */
function createTypeScriptHighlightingDefinition(hljs) {
  // Mode for 'namespace' declarations
  const namespaceMode = {
    beginKeywords: "namespace",
    end: /\{/,
    excludeEnd: true
  };

  // Mode for 'interface' declarations
  const interfaceMode = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: true,
    keywords: "interface extends"
  };

  // Mode for 'use strict' directive
  const useStrictMode = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };

  // TypeScript built-in types
  const typescriptBuiltInTypes = [
    "any", "void", "number", "boolean", "string", "object", "never", "enum"
  ];

  // TypeScript-specific keywords
  const typescriptKeywords = [
    "type", "namespace", "typedef", "interface", "public", "private", "protected",
    "implements", "declare", "abstract", "readonly"
  ];

  // Compose the full keywords object
  const keywords = {
    $pattern: "[a-z$_][0-9A-zA-z$_]*",
    keyword: DyA.concat(typescriptKeywords), // DyA: base JavaScript keywords
    literal: YyA, // YyA: JavaScript literals
    built_in: WyA.concat(typescriptBuiltInTypes) // WyA: base JavaScript built-ins
  };

  // Mode for decorators (e.g., @Component)
  const decoratorMode = {
    className: "meta",
    begin: "@[a-z$_][0-9A-zA-z$_]*"
  };

  /**
   * Helper to replace a mode in a 'contains' array by label
   * @param {object} definition - The language definition object
   * @param {string} label - The label of the mode to replace
   * @param {object} newMode - The new mode object to insert
   */
  const replaceModeByLabel = (definition, label, newMode) => {
    const index = definition.contains.findIndex(mode => mode.label === label);
    if (index === -1) throw new Error("can not find mode to replace");
    definition.contains.splice(index, 1, newMode);
  };

  // Get the base JavaScript definition
  const javascriptDefinition = createJavascriptHighlightConfig(hljs);

  // Merge TypeScript keywords into the base JavaScript keywords
  Object.assign(javascriptDefinition.keywords, keywords);

  // Add decorator mode to PARAMS_CONTAINS for function parameters
  javascriptDefinition.exports.PARAMS_CONTAINS.push(decoratorMode);

  // Add TypeScript-specific modes to the top-level contains array
  javascriptDefinition.contains = javascriptDefinition.contains.concat([
    decoratorMode,
    namespaceMode,
    interfaceMode
  ]);

  // Replace the shebang and use_strict modes with updated versions
  replaceModeByLabel(javascriptDefinition, "shebang", hljs.SHEBANG());
  replaceModeByLabel(javascriptDefinition, "use_strict", useStrictMode);

  // Set function relevance to 0 to avoid over-highlighting
  const functionMode = javascriptDefinition.contains.find(mode => mode.className === "function");
  if (functionMode) {
    functionMode.relevance = 0;
  }

  // Set language metadata
  Object.assign(javascriptDefinition, {
    name: "TypeScript",
    aliases: ["ts", "tsx"]
  });

  return javascriptDefinition;
}

module.exports = createTypeScriptHighlightingDefinition;