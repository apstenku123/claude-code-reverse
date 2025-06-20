/**
 * Generates a JSON schema fragment based on the provided Zod type.
 *
 * @param {object} sourceObservable - The Zod schema or observable object to process.
 * @param {string} zodType - The Zod type identifier (e.g., R0.ZodString, R0.ZodNumber, etc.).
 * @param {object} subscription - The configuration or subscription object used for schema generation.
 * @returns {any} The generated JSON schema fragment or accessor object for the given Zod type.
 */
function generateSchemaFromZodType(sourceObservable, zodType, subscription) {
  switch (zodType) {
    case R0.ZodString:
      // Handle string schema
      return gW1(sourceObservable, subscription);
    case R0.ZodNumber:
      // Handle number schema
      return generateNumberSchema(sourceObservable, subscription);
    case R0.ZodObject:
      // Handle object schema
      return generateJsonSchemaFromZodObject(sourceObservable, subscription);
    case R0.ZodBigInt:
      // Handle BigInt schema
      return generateIntegerSchemaFromChecks(sourceObservable, subscription);
    case R0.ZodBoolean:
      // Handle boolean schema
      return jn0();
    case R0.ZodDate:
      // Handle date schema
      return buildDateSchema(sourceObservable, subscription);
    case R0.ZodUndefined:
      // Handle undefined schema
      return en0();
    case R0.ZodNull:
      // Handle null schema
      return getNullSchemaForTarget(subscription);
    case R0.ZodArray:
      // Handle array schema
      return buildArraySchemaDefinition(sourceObservable, subscription);
    case R0.ZodUnion:
    case R0.ZodDiscriminatedUnion:
      // Handle union and discriminated union schemas
      return getZodSchemaTypeInfo(sourceObservable, subscription);
    case R0.ZodIntersection:
      // Handle intersection schema
      return mergeAllOfSchemas(sourceObservable, subscription);
    case R0.ZodTuple:
      // Handle tuple schema
      return createArraySchemaFromDefinition(sourceObservable, subscription);
    case R0.ZodRecord:
      // Handle record schema
      return generateObjectSchemaForZodRecord(sourceObservable, subscription);
    case R0.ZodLiteral:
      // Handle literal schema
      return getJsonSchemaTypeFromValue(sourceObservable, subscription);
    case R0.ZodEnum:
      // Handle enum schema
      return fn0(sourceObservable);
    case R0.ZodNativeEnum:
      // Handle native enum schema
      return extractEnumTypeAndValues(sourceObservable);
    case R0.ZodNullable:
      // Handle nullable schema
      return getNullableSchemaDefinition(sourceObservable, subscription);
    case R0.ZodOptional:
      // Handle optional schema
      return an0(sourceObservable, subscription);
    case R0.ZodMap:
      // Handle map schema
      return generateMapSchema(sourceObservable, subscription);
    case R0.ZodSet:
      // Handle set schema
      return createArraySchemaFromZodArray(sourceObservable, subscription);
    case R0.ZodLazy:
      // Handle lazy schema (deferred evaluation)
      return () => sourceObservable.getter()._def;
    case R0.ZodPromise:
      // Handle promise schema
      return rn0(sourceObservable, subscription);
    case R0.ZodNaN:
    case R0.ZodNever:
      // Handle NaN and never schemas (negation accessor)
      return dn0();
    case R0.ZodEffects:
      // Handle effects schema
      return applyInputEffectStrategy(sourceObservable, subscription);
    case R0.ZodAny:
      // Handle any schema
      return Pn0();
    case R0.ZodUnknown:
      // Handle unknown schema
      return Aa0();
    case R0.ZodDefault:
      // Handle default schema
      return yn0(sourceObservable, subscription);
    case R0.ZodBranded:
      // Handle branded schema
      return bW1(sourceObservable, subscription);
    case R0.ZodReadonly:
      // Handle readonly schema
      return Ba0(sourceObservable, subscription);
    case R0.ZodCatch:
      // Handle catch schema
      return kn0(sourceObservable, subscription);
    case R0.ZodPipeline:
      // Handle pipeline schema
      return createAllOfPipeStrategy(sourceObservable, subscription);
    case R0.ZodFunction:
    case R0.ZodVoid:
    case R0.ZodSymbol:
      // No schema representation for function, void, or symbol types
      return;
    default:
      // Unknown or unsupported Zod type
      return (unknownType => {
        // Could log or handle unknown types here if needed
        return;
      })(zodType);
  }
}

module.exports = generateSchemaFromZodType;
