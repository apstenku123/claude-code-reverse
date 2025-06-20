/**
 * Generates a highlight.js language definition object for TypeScript, extending a base JavaScript definition.
 *
 * @param {object} hljs - The highlight.js library instance, providing utilities and language helpers.
 * @returns {object} The TypeScript language definition object for highlight.js.
 */
function createTypeScriptHighlightDefinition(hljs) {
  // Mode for TypeScript 'namespace' declarations
  const namespaceMode = {
    beginKeywords: "namespace",
    end: /\{/,
    excludeEnd: true
  };

  // Mode for TypeScript 'interface' declarations
  const interfaceMode = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: true,
    keywords: "interface extends"
  };

  // Mode for 'use strict' meta statements
  const useStrictMeta = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };

  // List of TypeScript built-in types
  const typescriptBuiltInTypes = [
    "any", "void", "number", "boolean", "string", "object", "never", "enum"
  ];

  // List of TypeScript-specific keywords
  const typescriptKeywords = [
    "type", "namespace", "typedef", "interface", "public", "private", "protected",
    "implements", "declare", "abstract", "readonly"
  ];

  // TypeScript language keywords, literals, and built-ins
  const typescriptLanguageKeywords = {
    $pattern: "[a-z$_][0-9A-zA-z$_]*",
    keyword: DyA.concat(typescriptKeywords), // DyA is assumed to be a base keyword list
    literal: YyA, // YyA is assumed to be a list of literals
    built_in: WyA.concat(typescriptBuiltInTypes) // WyA is assumed to be a base built-in list
  };

  // Mode for TypeScript decorators (e.g., @Component)
  const decoratorMeta = {
    className: "meta",
    begin: "@[a-z$_][0-9A-zA-z$_]*"
  };

  /**
   * Utility to replace a mode in a language definition'createInteractionAccessor contains array by label.
   * @param {object} languageDef - The language definition object.
   * @param {string} label - The label of the mode to replace.
   * @param {object} newMode - The new mode object to insert.
   */
  const replaceModeByLabel = (languageDef, label, newMode) => {
    const modeIndex = languageDef.contains.findIndex(mode => mode.label === label);
    if (modeIndex === -1) {
      throw new Error("can not find mode to replace");
    }
    languageDef.contains.splice(modeIndex, 1, newMode);
  };

  // Get the base JavaScript language definition (createJavascriptHighlightConfig is assumed to be a factory function)
  const typescriptDefinition = createJavascriptHighlightConfig(hljs);

  // Merge TypeScript keywords, literals, and built-ins into the base definition
  Object.assign(typescriptDefinition.keywords, typescriptLanguageKeywords);

  // Add decorator mode to parameter contains
  typescriptDefinition.exports.PARAMS_CONTAINS.push(decoratorMeta);

  // Add TypeScript-specific modes to the main contains array
  typescriptDefinition.contains = typescriptDefinition.contains.concat([
    decoratorMeta,
    namespaceMode,
    interfaceMode
  ]);

  // Replace the shebang and use_strict modes with updated versions
  replaceModeByLabel(typescriptDefinition, "shebang", hljs.SHEBANG());
  replaceModeByLabel(typescriptDefinition, "use_strict", useStrictMeta);

  // Set function mode relevance to 0 to avoid over-highlighting
  const functionMode = typescriptDefinition.contains.find(mode => mode.className === "function");
  functionMode.relevance = 0;

  // Set language name and aliases
  Object.assign(typescriptDefinition, {
    name: "TypeScript",
    aliases: ["ts", "tsx"]
  });

  return typescriptDefinition;
}

module.exports = createTypeScriptHighlightDefinition;