/**
 * Extracts all possible values from a given schema or type definition.
 * Handles various schema wrapper types and recursively unwraps them to collect possible values.
 *
 * @param {object} schema - The schema or type definition to extract values from.
 * @returns {Array<any>} An array of possible values for the provided schema.
 */
function extractPossibleValuesFromSchema(schema) {
  // If schema is an instance of tf, recursively extract from its .schema property
  if (schema instanceof tf) {
    return extractPossibleValuesFromSchema(schema.schema);
  }
  // If schema is an instance of iJ, recursively extract from its inner type
  else if (schema instanceof iJ) {
    return extractPossibleValuesFromSchema(schema.innerType());
  }
  // If schema is an instance of ef, return its value in an array
  else if (schema instanceof ef) {
    return [schema.value];
  }
  // If schema is an instance of RM, return its options array
  else if (schema instanceof RM) {
    return schema.options;
  }
  // If schema is an instance of Av, return all values of its enum object
  else if (schema instanceof Av) {
    return a6.objectValues(schema.enum);
  }
  // If schema is an instance of Bv, recursively extract from its inner type definition
  else if (schema instanceof Bv) {
    return extractPossibleValuesFromSchema(schema._def.innerType);
  }
  // If schema is an instance of af, return [undefined]
  else if (schema instanceof af) {
    return [void 0];
  }
  // If schema is an instance of sf, return [null]
  else if (schema instanceof sf) {
    return [null];
  }
  // If schema is an instance of ZF, return [undefined, ...values from unwrapped schema]
  else if (schema instanceof ZF) {
    return [void 0, ...extractPossibleValuesFromSchema(schema.unwrap())];
  }
  // If schema is an instance of SU, return [null, ...values from unwrapped schema]
  else if (schema instanceof SU) {
    return [null, ...extractPossibleValuesFromSchema(schema.unwrap())];
  }
  // If schema is an instance of h51, recursively extract from its unwrapped schema
  else if (schema instanceof h51) {
    return extractPossibleValuesFromSchema(schema.unwrap());
  }
  // If schema is an instance of Iv, recursively extract from its unwrapped schema
  else if (schema instanceof Iv) {
    return extractPossibleValuesFromSchema(schema.unwrap());
  }
  // If schema is an instance of Qv, recursively extract from its inner type definition
  else if (schema instanceof Qv) {
    return extractPossibleValuesFromSchema(schema._def.innerType);
  }
  // If none of the above, return an empty array
  else {
    return [];
  }
}

module.exports = extractPossibleValuesFromSchema;