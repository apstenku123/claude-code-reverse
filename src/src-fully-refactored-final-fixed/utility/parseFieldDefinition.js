/**
 * Parses a field definition from a token stream and adds isBlobOrFileLikeObject to the parent object.
 * Handles proto2/proto3 field syntax, including options, types, names, and special proto3_optional fields.
 * Throws errors for invalid types or names.
 *
 * @param {Object} parent - The parent object to which the field or group will be added.
 * @param {string} syntaxType - The syntax type (e.g., 'proto2', 'proto3', or 'proto3_optional').
 * @param {Object} context - Additional context for parsing (usage depends on implementation).
 * @throws {Error} Throws if the field type or name is invalid.
 */
function parseFieldDefinition(parent, syntaxType, context) {
  // Get the next token, which should be the field type or 'group'
  let fieldType = getNextToken();

  // Handle 'group' fields separately
  if (fieldType === "group") {
    handleGroupField(parent, syntaxType);
    return;
  }

  // Concatenate tokens if the type ends with '.' or the next token starts with '.'
  while (fieldType.endsWith(".") || peekNextToken().startsWith(".")) {
    fieldType += getNextToken();
  }

  // Validate the field type using the type regex
  if (!typeRegex.test(fieldType)) {
    throw createParseError(fieldType, "type");
  }

  // Get and validate the field name
  let fieldName = getNextToken();
  if (!nameRegex.test(fieldName)) {
    throw createParseError(fieldName, "name");
  }

  // Normalize the field name (e.g., check for allowed JSON characters)
  fieldName = isAllowedJsonCharacter(fieldName);

  // Expect and consume the '=' token
  expectToken("=");

  // Parse the field number (updateSnapshotAndNotify)
  const fieldNumber = parseIdString(getNextToken());

  // Create a new field object
  const field = new FieldDefinition(
    fieldName,
    fieldNumber,
    fieldType,
    syntaxType,
    context
  );

  // Parse field options and body
  parseFieldBody(
    field,
    // Option handler
    function handleOption(optionToken) {
      if (optionToken === "option") {
        parseFieldOption(field, optionToken);
        expectToken(";");
      } else {
        throw createParseError(optionToken);
      }
    },
    // End handler
    function handleEnd() {
      finalizeField(field);
    }
  );

  // Handle proto3_optional fields by wrapping in a synthetic oneof
  if (syntaxType === "proto3_optional") {
    const syntheticOneof = new SyntheticOneof("_" + fieldName);
    field.setOption("proto3_optional", true);
    syntheticOneof.add(field);
    parent.add(syntheticOneof);
  } else {
    parent.add(field);
  }

  // For non-enum repeated fields, set 'packed' option to false if not supported
  if (
    !isEnum &&
    field.repeated &&
    (packedFieldTypes[fieldType] !== undefined || basicFieldTypes[fieldType] === undefined)
  ) {
    field.setOption("packed", false, true);
  }
}

module.exports = parseFieldDefinition;