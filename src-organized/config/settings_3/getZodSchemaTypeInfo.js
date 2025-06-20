/**
 * Extracts type and enum information from a Zod schema union/options array for OpenAPI/JSON Schema generation.
 *
 * @param {object} schemaWrapper - An object containing a Zod schema with an 'options' property (array or Map of Zod schemas).
 * @param {object} config - Configuration object, may contain 'target' (e.g., 'openApi3').
 * @returns {object} Type and/or enum information suitable for OpenAPI/JSON Schema, or delegates to pn0 for fallback.
 */
function getZodSchemaTypeInfo(schemaWrapper, config) {
  // If the target is OpenAPI 3, delegate to pn0
  if (config.target === "openApi3") {
    return pn0(schemaWrapper, config);
  }

  // Normalize options to an array
  const schemaOptions = schemaWrapper.options instanceof Map
    ? Array.from(schemaWrapper.options.values())
    : schemaWrapper.options;

  // Case 1: All options are simple Zod types (e.g., ZodString, ZodNumber) with no checks
  const allAreSimpleTypes = schemaOptions.every(option =>
    option._def.typeName in Zo && (!option._def.checks || !option._def.checks.length)
  );

  if (allAreSimpleTypes) {
    // Collect unique type names from Zo mapping
    const uniqueTypes = schemaOptions.reduce((collectedTypes, option) => {
      const typeName = Zo[option._def.typeName];
      return typeName && !collectedTypes.includes(typeName)
        ? [...collectedTypes, typeName]
        : collectedTypes;
    }, []);
    return {
      type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0]
    };
  }

  // Case 2: All options are ZodLiteral types with no description
  const allAreLiterals = schemaOptions.every(option =>
    option._def.typeName === "ZodLiteral" && !option.description
  );

  if (allAreLiterals) {
    // Collect types for each literal value
    const literalTypes = schemaOptions.reduce((types, option) => {
      const valueType = typeof option._def.value;
      switch (valueType) {
        case "string":
        case "number":
        case "boolean":
          return [...types, valueType];
        case "bigint":
          return [...types, "integer"];
        case "object":
          if (option._def.value === null) return [...types, "null"];
          // fallthrough for non-null objects
        case "symbol":
        case "undefined":
        case "function":
        default:
          return types;
      }
    }, []);

    // Only proceed if all literals produced a type
    if (literalTypes.length === schemaOptions.length) {
      // Remove duplicate types
      const uniqueLiteralTypes = literalTypes.filter((type, index, arr) => arr.indexOf(type) === index);
      // Collect unique enum values
      const enumValues = schemaOptions.reduce((values, option) => {
        return values.includes(option._def.value) ? values : [...values, option._def.value];
      }, []);
      return {
        type: uniqueLiteralTypes.length > 1 ? uniqueLiteralTypes : uniqueLiteralTypes[0],
        enum: enumValues
      };
    }
  }

  // Case 3: All options are ZodEnum types
  const allAreEnums = schemaOptions.every(option => option._def.typeName === "ZodEnum");
  if (allAreEnums) {
    // Merge all enum values, removing duplicates
    const mergedEnumValues = schemaOptions.reduce((allValues, option) => {
      return [
        ...allValues,
        ...option._def.values.filter(value => !allValues.includes(value))
      ];
    }, []);
    return {
      type: "string",
      enum: mergedEnumValues
    };
  }

  // Fallback: delegate to pn0
  return pn0(schemaWrapper, config);
}

module.exports = getZodSchemaTypeInfo;