/**
 * Determines the appropriate JSON Schema type (and enum, if applicable) from a set of Zod options.
 * Handles ZodUnion, ZodLiteral, and ZodEnum types, and delegates to a fallback builder for other cases.
 *
 * @param {object} zodUnionOrOptions - The Zod union schema or an object containing options (could be a Map or Array).
 * @param {object} context - The context/configuration object, including the target (e.g., 'openApi3').
 * @returns {object} JSON Schema type definition, possibly including an 'enum' property, or the result of the fallback builder.
 */
function getJsonSchemaTypeFromZodOptions(zodUnionOrOptions, context) {
  // If the target is 'openApi3', delegate to the fallback builder
  if (context.target === "openApi3") {
    return buildAnyOfSchemaFromOptions(zodUnionOrOptions, context);
  }

  // Normalize options to an array, whether isBlobOrFileLikeObject'createInteractionAccessor a Map or already an Array
  const optionsArray = zodUnionOrOptions.options instanceof Map
    ? Array.from(zodUnionOrOptions.options.values())
    : zodUnionOrOptions.options;

  // Case 1: All options are Zod types with a typeName in Zo and have no checks
  const allOptionsAreSimpleZodTypes = optionsArray.every(option =>
    option._def.typeName in Zo && (!option._def.checks || !option._def.checks.length)
  );

  if (allOptionsAreSimpleZodTypes) {
    // Collect unique type names from Zo for all options
    const uniqueTypeNames = optionsArray.reduce((accumulator, option) => {
      const typeName = Zo[option._def.typeName];
      return typeName && !accumulator.includes(typeName)
        ? [...accumulator, typeName]
        : accumulator;
    }, []);
    return {
      type: uniqueTypeNames.length > 1 ? uniqueTypeNames : uniqueTypeNames[0]
    };
  }

  // Case 2: All options are ZodLiteral types with no description
  const allOptionsAreLiterals = optionsArray.every(option =>
    option._def.typeName === "ZodLiteral" && !option.description
  );

  if (allOptionsAreLiterals) {
    // Map each literal to its JSON Schema type
    const literalTypes = optionsArray.reduce((accumulator, option) => {
      const valueType = typeof option._def.value;
      switch (valueType) {
        case "string":
        case "number":
        case "boolean":
          return [...accumulator, valueType];
        case "bigint":
          return [...accumulator, "integer"];
        case "object":
          if (option._def.value === null) return [...accumulator, "null"];
          // fallthrough for other objects
        case "symbol":
        case "undefined":
        case "function":
        default:
          return accumulator;
      }
    }, []);

    // If all literals mapped to a type, deduplicate types
    if (literalTypes.length === optionsArray.length) {
      const uniqueLiteralTypes = literalTypes.filter((type, index, arr) => arr.indexOf(type) === index);
      // Build enum array of unique literal values
      const enumValues = optionsArray.reduce((accumulator, option) => {
        return accumulator.includes(option._def.value)
          ? accumulator
          : [...accumulator, option._def.value];
      }, []);
      return {
        type: uniqueLiteralTypes.length > 1 ? uniqueLiteralTypes : uniqueLiteralTypes[0],
        enum: enumValues
      };
    }
  }

  // Case 3: All options are ZodEnum types
  const allOptionsAreEnums = optionsArray.every(option => option._def.typeName === "ZodEnum");
  if (allOptionsAreEnums) {
    // Merge all enum values into a single unique array
    const mergedEnumValues = optionsArray.reduce((accumulator, option) => {
      return [
        ...accumulator,
        ...option._def.values.filter(value => !accumulator.includes(value))
      ];
    }, []);
    return {
      type: "string",
      enum: mergedEnumValues
    };
  }

  // Fallback: Use the generic builder
  return buildAnyOfSchemaFromOptions(zodUnionOrOptions, context);
}

module.exports = getJsonSchemaTypeFromZodOptions;