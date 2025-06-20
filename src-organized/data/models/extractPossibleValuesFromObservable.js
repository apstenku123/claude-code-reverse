/**
 * Extracts all possible values from a given observable or schema type.
 * Handles various wrapper types, enums, optionals, nullables, and recursively unwraps types as needed.
 *
 * @param {object} schemaOrType - The observable, schema, or type definition to extract values from.
 * @returns {Array<any>} An array of all possible values for the provided schema or type.
 */
function extractPossibleValuesFromObservable(schemaOrType) {
  // Handle schema wrapper
  if (schemaOrType instanceof tf) {
    return extractPossibleValuesFromSchema(schemaOrType.schema);
  }
  // Handle inner type wrappers
  else if (schemaOrType instanceof iJ) {
    return extractPossibleValuesFromSchema(schemaOrType.innerType());
  }
  // Handle literal value
  else if (schemaOrType instanceof ef) {
    return [schemaOrType.value];
  }
  // Handle enum options
  else if (schemaOrType instanceof RM) {
    return schemaOrType.options;
  }
  // Handle object enum
  else if (schemaOrType instanceof Av) {
    return a6.objectValues(schemaOrType.enum);
  }
  // Handle another inner type wrapper
  else if (schemaOrType instanceof Bv) {
    return extractPossibleValuesFromSchema(schemaOrType._def.innerType);
  }
  // Handle undefined literal
  else if (schemaOrType instanceof af) {
    return [void 0];
  }
  // Handle null literal
  else if (schemaOrType instanceof sf) {
    return [null];
  }
  // Handle optional type (undefined + unwrapped values)
  else if (schemaOrType instanceof ZF) {
    return [void 0, ...extractPossibleValuesFromSchema(schemaOrType.unwrap())];
  }
  // Handle nullable type (null + unwrapped values)
  else if (schemaOrType instanceof SU) {
    return [null, ...extractPossibleValuesFromSchema(schemaOrType.unwrap())];
  }
  // Handle generic unwrapping
  else if (schemaOrType instanceof h51) {
    return extractPossibleValuesFromSchema(schemaOrType.unwrap());
  }
  else if (schemaOrType instanceof Iv) {
    return extractPossibleValuesFromSchema(schemaOrType.unwrap());
  }
  // Handle another inner type wrapper
  else if (schemaOrType instanceof Qv) {
    return extractPossibleValuesFromSchema(schemaOrType._def.innerType);
  }
  // Default: return empty array if type is not recognized
  else {
    return [];
  }
}

module.exports = extractPossibleValuesFromObservable;