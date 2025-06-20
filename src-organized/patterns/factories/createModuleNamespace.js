/**
 * Creates a module namespace object for a given module, ensuring compatibility with CommonJS and ES modules.
 * Copies all enumerable properties from the source module to the namespace object, and sets up a default export.
 *
 * @param {object} sourceModule - The module object to wrap (could be CommonJS or ES module).
 * @param {boolean} forceDefaultExport - If true, always create a default export property.
 * @param {object} [namespaceObject] - Optional initial namespace object to use.
 * @returns {object} The module namespace object with all properties and a default export.
 */
function createModuleNamespace(sourceModule, forceDefaultExport, namespaceObject) {
  // If sourceModule is not null/undefined, create a shallow copy of its properties; otherwise, use an empty object
  namespaceObject = sourceModule != null ? l_2(i_2(sourceModule)) : {};

  // If forceDefaultExport is true, or sourceModule is falsy, or sourceModule is not an ES module,
  // define the 'default' property on the namespace object
  const shouldAddDefaultExport = forceDefaultExport || !sourceModule || !sourceModule.__esModule;
  const moduleNamespace = shouldAddDefaultExport
    ? sw1(namespaceObject, "default", {
        value: sourceModule,
        enumerable: true
      })
    : namespaceObject;

  // For each property key in sourceModule, if the property does not already exist on moduleNamespace,
  // define a getter for that property on moduleNamespace
  for (const propertyKey of n_2(sourceModule)) {
    if (!a_2.call(moduleNamespace, propertyKey)) {
      sw1(moduleNamespace, propertyKey, {
        get: () => sourceModule[propertyKey],
        enumerable: true
      });
    }
  }

  return moduleNamespace;
}

module.exports = createModuleNamespace;