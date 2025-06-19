/**
 * Returns the OpenAPI schema definition for a given Zod schema type.
 *
 * @param {object} zodSchema - The Zod schema instance to convert.
 * @param {string} zodType - The type identifier from R0 (e.g., R0.ZodString, R0.ZodNumber, etc.).
 * @param {object} context - Additional context or options for schema conversion.
 * @returns {any} The OpenAPI schema definition for the given Zod schema type.
 */
function getZodSchemaDefinition(zodSchema, zodType, context) {
  switch (zodType) {
    case R0.ZodString:
      // Handle string schema
      return gW1(zodSchema, context);
    case R0.ZodNumber:
      // Handle number schema
      return generateNumberSchema(zodSchema, context);
    case R0.ZodObject:
      // Handle object schema
      return generateJsonSchemaFromZodObject(zodSchema, context);
    case R0.ZodBigInt:
      // Handle bigint schema
      return generateIntegerSchemaFromChecks(zodSchema, context);
    case R0.ZodBoolean:
      // Handle boolean schema
      return jn0();
    case R0.ZodDate:
      // Handle date schema
      return buildDateSchema(zodSchema, context);
    case R0.ZodUndefined:
      // Handle undefined schema
      return en0();
    case R0.ZodNull:
      // Handle null schema
      return getNullSchemaForTarget(context);
    case R0.ZodArray:
      // Handle array schema
      return buildArraySchemaDefinition(zodSchema, context);
    case R0.ZodUnion:
    case R0.ZodDiscriminatedUnion:
      // Handle union and discriminated union schemas
      return getZodSchemaTypeInfo(zodSchema, context);
    case R0.ZodIntersection:
      // Handle intersection schema
      return mergeAllOfSchemas(zodSchema, context);
    case R0.ZodTuple:
      // Handle tuple schema
      return createArraySchemaFromDefinition(zodSchema, context);
    case R0.ZodRecord:
      // Handle record schema
      return generateObjectSchemaForZodRecord(zodSchema, context);
    case R0.ZodLiteral:
      // Handle literal schema
      return getJsonSchemaTypeFromValue(zodSchema, context);
    case R0.ZodEnum:
      // Handle enum schema
      return fn0(zodSchema);
    case R0.ZodNativeEnum:
      // Handle native enum schema
      return extractEnumTypeAndValues(zodSchema);
    case R0.ZodNullable:
      // Handle nullable schema
      return getNullableSchemaDefinition(zodSchema, context);
    case R0.ZodOptional:
      // Handle optional schema
      return an0(zodSchema, context);
    case R0.ZodMap:
      // Handle map schema
      return generateMapSchema(zodSchema, context);
    case R0.ZodSet:
      // Handle set schema
      return createArraySchemaFromZodArray(zodSchema, context);
    case R0.ZodLazy:
      // Handle lazy schema (returns a function that gets the definition)
      return () => zodSchema.getter()._def;
    case R0.ZodPromise:
      // Handle promise schema
      return rn0(zodSchema, context);
    case R0.ZodNaN:
    case R0.ZodNever:
      // Handle NaN and never schemas
      return dn0();
    case R0.ZodEffects:
      // Handle effects schema
      return applyInputEffectStrategy(zodSchema, context);
    case R0.ZodAny:
      // Handle any schema
      return Pn0();
    case R0.ZodUnknown:
      // Handle unknown schema
      return Aa0();
    case R0.ZodDefault:
      // Handle default schema
      return yn0(zodSchema, context);
    case R0.ZodBranded:
      // Handle branded schema
      return bW1(zodSchema, context);
    case R0.ZodReadonly:
      // Handle readonly schema
      return Ba0(zodSchema, context);
    case R0.ZodCatch:
      // Handle catch schema
      return kn0(zodSchema, context);
    case R0.ZodPipeline:
      // Handle pipeline schema
      return createAllOfPipeStrategy(zodSchema, context);
    case R0.ZodFunction:
    case R0.ZodVoid:
    case R0.ZodSymbol:
      // These types are not supported for OpenAPI schema generation
      return;
    default:
      // Unknown or unsupported type
      return (unknownType => {
        // No operation for unknown types
        return;
      })(zodType);
  }
}

module.exports = getZodSchemaDefinition;
