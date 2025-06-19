/**
 * Generates a schema object from an array of Zod options, handling unions, literals, and enums for OpenAPI compatibility.
 *
 * @param {object} zodUnionSchema - The Zod union schema object containing options to process.
 * @param {object} context - Configuration/context object, may include target and other options.
 * @returns {object} Schema object suitable for OpenAPI or similar usage.
 */
function generateSchemaFromZodOptions(zodUnionSchema, context) {
  // If the target is 'openApi3', delegate to buildAnyOfSchemaArray
  if (context.target === "openApi3") {
    return buildAnyOfSchemaArray(zodUnionSchema, context);
  }

  // Extract the array of Zod options from the union schema
  const zodOptions = zodUnionSchema.options instanceof Map
    ? Array.from(zodUnionSchema.options.values())
    : zodUnionSchema.options;

  // Case 1: All options are simple Zod types (e.g., ZodString, ZodNumber) with no checks
  const allSimpleTypes = zodOptions.every(option =>
    option._def.typeName in Zo && (!option._def.checks || !option._def.checks.length)
  );

  if (allSimpleTypes) {
    // Collect unique type names from the options
    const uniqueTypes = zodOptions.reduce((collectedTypes, option) => {
      const typeName = Zo[option._def.typeName];
      return typeName && !collectedTypes.includes(typeName)
        ? [...collectedTypes, typeName]
        : collectedTypes;
    }, []);
    return {
      type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0]
    };
  }

  // Case 2: All options are ZodLiteral without descriptions
  const allLiterals = zodOptions.every(option =>
    option._def.typeName === "ZodLiteral" && !option.description
  );

  if (allLiterals) {
    // Collect the primitive type for each literal value
    const literalTypes = zodOptions.reduce((types, option) => {
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

    // If every literal produced a valid type
    if (literalTypes.length === zodOptions.length) {
      // Remove duplicate types
      const uniqueLiteralTypes = literalTypes.filter((type, index, arr) => arr.indexOf(type) === index);
      // Collect unique enum values
      const enumValues = zodOptions.reduce((values, option) => {
        return values.includes(option._def.value) ? values : [...values, option._def.value];
      }, []);
      return {
        type: uniqueLiteralTypes.length > 1 ? uniqueLiteralTypes : uniqueLiteralTypes[0],
        enum: enumValues
      };
    }
  }

  // Case 3: All options are ZodEnum
  const allEnums = zodOptions.every(option => option._def.typeName === "ZodEnum");
  if (allEnums) {
    // Merge all enum values, removing duplicates
    const mergedEnumValues = zodOptions.reduce((allValues, option) => {
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

  // Fallback: Use buildAnyOfSchemaArray for all other cases
  return buildAnyOfSchemaArray(zodUnionSchema, context);
}

module.exports = generateSchemaFromZodOptions;