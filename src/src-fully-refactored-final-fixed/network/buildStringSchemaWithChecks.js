/**
 * Builds a string schema object with validation checks based on the provided definition and configuration.
 *
 * @param {Object} stringDefinition - The definition object containing string validation checks.
 * @param {Object} config - Configuration options for validation strategies and error messages.
 * @returns {Object} Schema object representing the string type and its validation constraints.
 */
function buildStringSchemaWithChecks(stringDefinition, config) {
  const schema = {
    type: "string"
  };

  // If there are validation checks, process each one
  if (stringDefinition.checks) {
    for (const check of stringDefinition.checks) {
      switch (check.kind) {
        case "min":
          // Set or update minimum string length
          setValueAndProcess(
            schema,
            "minLength",
            typeof schema.minLength === "number"
              ? Math.max(schema.minLength, check.value)
              : check.value,
            check.message,
            config
          );
          break;
        case "max":
          // Set or update maximum string length
          setValueAndProcess(
            schema,
            "maxLength",
            typeof schema.maxLength === "number"
              ? Math.min(schema.maxLength, check.value)
              : check.value,
            check.message,
            config
          );
          break;
        case "email":
          // Email validation with different strategies
          switch (config.emailStrategy) {
            case "format:email":
              addFormatValidationToSchema(schema, "email", check.message, config);
              break;
            case "format:idn-email":
              addFormatValidationToSchema(schema, "idn-email", check.message, config);
              break;
            case "pattern:zod":
              applyPatternValidation(schema, AK.email, check.message, config);
              break;
          }
          break;
        case "url":
          addFormatValidationToSchema(schema, "uri", check.message, config);
          break;
        case "uuid":
          addFormatValidationToSchema(schema, "uuid", check.message, config);
          break;
        case "regex":
          applyPatternValidation(schema, check.regex, check.message, config);
          break;
        case "cuid":
          applyPatternValidation(schema, AK.cuid, check.message, config);
          break;
        case "cuid2":
          applyPatternValidation(schema, AK.cuid2, check.message, config);
          break;
        case "startsWith":
          // Create regex for startsWith
          applyPatternValidation(schema, RegExp(`^${applyPatternStrategyToObservable(check.value, config)}`), check.message, config);
          break;
        case "endsWith":
          // Create regex for endsWith
          applyPatternValidation(schema, RegExp(`${applyPatternStrategyToObservable(check.value, config)}$`), check.message, config);
          break;
        case "datetime":
          addFormatValidationToSchema(schema, "date-time", check.message, config);
          break;
        case "date":
          addFormatValidationToSchema(schema, "date", check.message, config);
          break;
        case "time":
          addFormatValidationToSchema(schema, "time", check.message, config);
          break;
        case "duration":
          addFormatValidationToSchema(schema, "duration", check.message, config);
          break;
        case "length":
          // Set both minLength and maxLength
          setValueAndProcess(
            schema,
            "minLength",
            typeof schema.minLength === "number"
              ? Math.max(schema.minLength, check.value)
              : check.value,
            check.message,
            config
          );
          setValueAndProcess(
            schema,
            "maxLength",
            typeof schema.maxLength === "number"
              ? Math.min(schema.maxLength, check.value)
              : check.value,
            check.message,
            config
          );
          break;
        case "includes": {
          // Regex for includes
          applyPatternValidation(schema, RegExp(applyPatternStrategyToObservable(check.value, config)), check.message, config);
          break;
        }
        case "ip": {
          // IP version checks
          if (check.version !== "v6") {
            addFormatValidationToSchema(schema, "ipv4", check.message, config);
          }
          if (check.version !== "isValidAndTypeMatch") {
            addFormatValidationToSchema(schema, "ipv6", check.message, config);
          }
          break;
        }
        case "base64url":
          applyPatternValidation(schema, AK.base64url, check.message, config);
          break;
        case "jwt":
          applyPatternValidation(schema, AK.jwt, check.message, config);
          break;
        case "cidr": {
          // CIDR version checks
          if (check.version !== "v6") {
            applyPatternValidation(schema, AK.ipv4Cidr, check.message, config);
          }
          if (check.version !== "isValidAndTypeMatch") {
            applyPatternValidation(schema, AK.ipv6Cidr, check.message, config);
          }
          break;
        }
        case "emoji":
          applyPatternValidation(schema, AK.emoji(), check.message, config);
          break;
        case "ulid": {
          applyPatternValidation(schema, AK.ulid, check.message, config);
          break;
        }
        case "base64": {
          // Base64 validation with different strategies
          switch (config.base64Strategy) {
            case "format:binary": {
              addFormatValidationToSchema(schema, "binary", check.message, config);
              break;
            }
            case "contentEncoding:base64": {
              setValueAndProcess(schema, "contentEncoding", "base64", check.message, config);
              break;
            }
            case "pattern:zod": {
              applyPatternValidation(schema, AK.base64, check.message, config);
              break;
            }
          }
          break;
        }
        case "nanoid":
          applyPatternValidation(schema, AK.nanoid, check.message, config);
          break;
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          // These are transformation checks, not validation constraints
          break;
        default:
          // Unknown check kind, no-op
          (() => {}) (check);
      }
    }
  }
  return schema;
}

module.exports = buildStringSchemaWithChecks;