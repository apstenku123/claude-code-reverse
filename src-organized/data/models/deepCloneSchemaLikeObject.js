/**
 * Deeply clones and transforms schema-like objects, handling various wrapper types.
 *
 * This function recursively traverses and clones objects that are instances of specific schema-related classes (W3, YV, ZF, SU, Fz),
 * ensuring that all nested structures are also cloned and wrapped appropriately. For plain values or unknown types, the value is returned as-is.
 *
 * @param {any} schemaLikeObject - The object (possibly a schema or wrapper) to deeply clone and transform.
 * @returns {any} - The deeply cloned and transformed object, preserving the original structure and types.
 */
function deepCloneSchemaLikeObject(schemaLikeObject) {
  // Handle W3 schema objects with a 'shape' property
  if (schemaLikeObject instanceof W3) {
    const clonedShape = {};
    // Recursively clone each property in the shape
    for (const propertyName in schemaLikeObject.shape) {
      const propertySchema = schemaLikeObject.shape[propertyName];
      clonedShape[propertyName] = ZF.create(deepCloneSchemaLikeObject(propertySchema));
    }
    // Return a new W3 instance with the cloned shape
    return new W3({
      ...schemaLikeObject._def,
      shape: () => clonedShape
    });
  }
  // Handle YV schema objects with an 'element' property
  else if (schemaLikeObject instanceof YV) {
    return new YV({
      ...schemaLikeObject._def,
      type: deepCloneSchemaLikeObject(schemaLikeObject.element)
    });
  }
  // Handle ZF wrapper objects
  else if (schemaLikeObject instanceof ZF) {
    return ZF.create(deepCloneSchemaLikeObject(schemaLikeObject.unwrap()));
  }
  // Handle SU wrapper objects
  else if (schemaLikeObject instanceof SU) {
    return SU.create(deepCloneSchemaLikeObject(schemaLikeObject.unwrap()));
  }
  // Handle Fz schema objects with an 'items' array
  else if (schemaLikeObject instanceof Fz) {
    return Fz.create(schemaLikeObject.items.map(item => deepCloneSchemaLikeObject(item)));
  }
  // For all other types, return as-is
  else {
    return schemaLikeObject;
  }
}

module.exports = deepCloneSchemaLikeObject;