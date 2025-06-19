/**
 * Builds a string schema object based on a set of validation checks and configuration options.
 *
 * @param {Object} stringSchemaDefinition - The definition object containing string validation checks.
 * @param {Object} config - Configuration options that affect how certain checks are handled.
 * @returns {Object} The resulting string schema object with applied validation constraints.
 */
function buildStringSchemaFromChecks(stringSchemaDefinition, config) {
  const schema = {
    type: "string"
  };

  if (stringSchemaDefinition.checks) {
    for (const check of stringSchemaDefinition.checks) {
      switch (check.kind) {
        case "min":
          // Set or update the minimum length constraint
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
          // Set or update the maximum length constraint
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
          // Handle email validation based on strategy
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
          // Add a pattern that matches strings starting with the specified value
          applyPatternValidation(schema, RegExp(`^${applyPatternStrategyToObservable(check.value, config)}`), check.message, config);
          break;
        case "endsWith":
          // Add a pattern that matches strings ending with the specified value
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
          // Set both minLength and maxLength constraints
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
          // Add a pattern that matches strings containing the specified value
          applyPatternValidation(schema, RegExp(applyPatternStrategyToObservable(check.value, config)), check.message, config);
          break;
        }
        case "ip": {
          // Add IPv4 and/or IPv6 validation depending on version
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
          // Add CIDR validation for IPv4 and/or IPv6
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
          // Handle base64 validation based on strategy
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
          // These are transformation checks, not constraints for the schema object
          break;
        default:
          // Unknown check kind; no operation
          (() => {}) (check);
      }
    }
  }

  return schema;
}

module.exports = buildStringSchemaFromChecks;
