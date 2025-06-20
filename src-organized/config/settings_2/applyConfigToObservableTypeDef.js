/**
 * Applies a configuration to the type definition of a given observable object.
 *
 * @param {Object} observableObject - An object that contains a 'type' property with a '_def' field.
 * @param {Object} config - The configuration object to apply.
 * @returns {*} The result of applying the configuration to the observable'createInteractionAccessor type definition via generateJsonSchemaFromZodType.
 */
function applyConfigToObservableTypeDef(observableObject, config) {
  // Call generateJsonSchemaFromZodType with the observable'createInteractionAccessor type definition and the provided config
  return generateJsonSchemaFromZodType(observableObject.type._def, config);
}

module.exports = applyConfigToObservableTypeDef;