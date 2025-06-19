/**
 * Extracts relevant fields from a source object based on a provided schema, skipping the 'default' key.
 * The function collects key-value pairs where the key exists in the schema'createInteractionAccessor fields (directly or as camelCase),
 * and then constructs a new object using the schema'createInteractionAccessor fromObject method.
 *
 * @param {Object} sourceObject - The object to extract fields from.
 * @param {Object} schema - The schema object containing a 'fields' property and a 'fromObject' method.
 * @returns {any|undefined} The object created by schema.fromObject, or undefined if no relevant fields are found.
 */
function extractRelevantFieldsFromObject(sourceObject, schema) {
  if (!sourceObject) return;

  // Collects alternating [key, value] pairs for relevant fields
  const relevantKeyValuePairs = [];
  const sourceKeys = Object.keys(sourceObject);

  for (let i = 0; i < sourceKeys.length; ++i) {
    const originalKey = sourceKeys[i];
    const value = sourceObject[originalKey];

    // Skip the 'default' key
    if (originalKey === "default") continue;

    // Try to find the field in the schema (direct or camelCase)
    let schemaField = schema.fields[originalKey];
    let fieldKey = originalKey;
    if (!schemaField) {
      // Try camelCase version of the key
      const camelCaseKey = RD.util.camelCase(originalKey);
      schemaField = schema.fields[camelCaseKey];
      if (!schemaField) continue; // Skip if field not found in schema
      fieldKey = camelCaseKey;
    }

    // Add the key and value to the collection
    relevantKeyValuePairs.push(fieldKey, value);
  }

  // If any relevant fields were found, convert to object and process with schema.fromObject
  return relevantKeyValuePairs.length
    ? schema.fromObject(RD.util.toObject(relevantKeyValuePairs))
    : undefined;
}

module.exports = extractRelevantFieldsFromObject;