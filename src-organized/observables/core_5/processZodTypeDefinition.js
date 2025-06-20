/**
 * Processes a Zod type definition and delegates to the appropriate handler based on the Zod type.
 *
 * @param {object} sourceObservable - The Zod schema or observable object to process.
 * @param {string} zodType - The type identifier from the Zod schema (e.g., R0.ZodString, R0.ZodNumber, etc).
 * @param {object} config - The configuration or subscription object used by handler functions.
 * @returns {any} The result of the handler function for the given Zod type, or undefined for unsupported types.
 */
function processZodTypeDefinition(sourceObservable, zodType, config) {
  switch (zodType) {
    case R0.ZodString:
      // Handle ZodString type
      return gW1(sourceObservable, config);
    case R0.ZodNumber:
      // Handle ZodNumber type
      return generateNumberSchema(sourceObservable, config);
    case R0.ZodObject:
      // Handle ZodObject type
      return generateJsonSchemaFromZodObject(sourceObservable, config);
    case R0.ZodBigInt:
      // Handle ZodBigInt type
      return generateIntegerSchemaFromChecks(sourceObservable, config);
    case R0.ZodBoolean:
      // Handle ZodBoolean type
      return jn0();
    case R0.ZodDate:
      // Handle ZodDate type
      return buildDateSchema(sourceObservable, config);
    case R0.ZodUndefined:
      // Handle ZodUndefined type
      return en0();
    case R0.ZodNull:
      // Handle ZodNull type
      return getNullSchemaForTarget(config);
    case R0.ZodArray:
      // Handle ZodArray type
      return buildArraySchemaDefinition(sourceObservable, config);
    case R0.ZodUnion:
    case R0.ZodDiscriminatedUnion:
      // Handle ZodUnion and ZodDiscriminatedUnion types
      return getZodSchemaTypeInfo(sourceObservable, config);
    case R0.ZodIntersection:
      // Handle ZodIntersection type
      return mergeAllOfSchemas(sourceObservable, config);
    case R0.ZodTuple:
      // Handle ZodTuple type
      return createArraySchemaFromDefinition(sourceObservable, config);
    case R0.ZodRecord:
      // Handle ZodRecord type
      return generateObjectSchemaForZodRecord(sourceObservable, config);
    case R0.ZodLiteral:
      // Handle ZodLiteral type
      return getJsonSchemaTypeFromValue(sourceObservable, config);
    case R0.ZodEnum:
      // Handle ZodEnum type
      return fn0(sourceObservable);
    case R0.ZodNativeEnum:
      // Handle ZodNativeEnum type
      return extractEnumTypeAndValues(sourceObservable);
    case R0.ZodNullable:
      // Handle ZodNullable type
      return getNullableSchemaDefinition(sourceObservable, config);
    case R0.ZodOptional:
      // Handle ZodOptional type
      return an0(sourceObservable, config);
    case R0.ZodMap:
      // Handle ZodMap type
      return generateMapSchema(sourceObservable, config);
    case R0.ZodSet:
      // Handle ZodSet type
      return createArraySchemaFromZodArray(sourceObservable, config);
    case R0.ZodLazy:
      // Handle ZodLazy type by returning a function that retrieves the inner definition
      return () => sourceObservable.getter()._def;
    case R0.ZodPromise:
      // Handle ZodPromise type
      return rn0(sourceObservable, config);
    case R0.ZodNaN:
    case R0.ZodNever:
      // Handle ZodNaN and ZodNever types
      return dn0();
    case R0.ZodEffects:
      // Handle ZodEffects type
      return applyInputEffectStrategy(sourceObservable, config);
    case R0.ZodAny:
      // Handle ZodAny type
      return Pn0();
    case R0.ZodUnknown:
      // Handle ZodUnknown type
      return Aa0();
    case R0.ZodDefault:
      // Handle ZodDefault type
      return yn0(sourceObservable, config);
    case R0.ZodBranded:
      // Handle ZodBranded type
      return bW1(sourceObservable, config);
    case R0.ZodReadonly:
      // Handle ZodReadonly type
      return Ba0(sourceObservable, config);
    case R0.ZodCatch:
      // Handle ZodCatch type
      return kn0(sourceObservable, config);
    case R0.ZodPipeline:
      // Handle ZodPipeline type
      return createAllOfPipeStrategy(sourceObservable, config);
    case R0.ZodFunction:
    case R0.ZodVoid:
    case R0.ZodSymbol:
      // No handler for ZodFunction, ZodVoid, or ZodSymbol types
      return;
    default:
      // Default case: no handler found for the provided Zod type
      return (unhandledType => {
        // Could log or handle unknown types here if needed
        return;
      })(zodType);
  }
}

module.exports = processZodTypeDefinition;
