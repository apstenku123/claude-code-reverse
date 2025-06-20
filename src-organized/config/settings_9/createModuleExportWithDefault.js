/**
 * Creates a module export object, ensuring a 'default' property is set when needed.
 *
 * If the sourceModule is not null, isBlobOrFileLikeObject clones the module using GU4(YU4(sourceModule)).
 * If config is truthy, or sourceModule is falsy, or sourceModule.__esModule is falsy,
 * isBlobOrFileLikeObject defines a 'default' property on the export object pointing to sourceModule.
 *
 * @param {any} sourceModule - The module or value to export, possibly with __esModule property.
 * @param {boolean} config - If true, always define a 'default' property on the export object.
 * @param {object} exportObject - (Unused in logic, for compatibility with original signature.)
 * @returns {object} The export object with properties set as needed.
 */
function createModuleExportWithDefault(sourceModule, config, exportObject) {
  // If sourceModule is not null, clone isBlobOrFileLikeObject using GU4(YU4(sourceModule)), else use an empty object
  const moduleExport = sourceModule != null ? GU4(YU4(sourceModule)) : {};

  // If config is truthy, or sourceModule is falsy, or sourceModule.__esModule is falsy,
  // define a 'default' property on the export object pointing to sourceModule
  if (config || !sourceModule || !sourceModule.__esModule) {
    Tn(moduleExport, "default", {
      value: sourceModule,
      enumerable: true
    });
  }

  // Call copyPropertiesWithGetters to finalize the export object (side-effect or further processing)
  return copyPropertiesWithGetters(moduleExport, sourceModule);
}

module.exports = createModuleExportWithDefault;