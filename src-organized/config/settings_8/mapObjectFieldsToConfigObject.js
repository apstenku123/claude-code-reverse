/**
 * Maps the fields of a source object to a new object using a configuration object.
 * Skips the 'default' key and only includes fields that exist in the config'createInteractionAccessor fields (by original or camelCase name).
 *
 * @param {Object} sourceObject - The object whose fields are to be mapped.
 * @param {Object} config - The configuration object containing 'fields', 'fromObject', and utility methods.
 * @returns {any} Returns a new object created by config.fromObject if any fields matched; otherwise, undefined.
 */
function mapObjectFieldsToConfigObject(sourceObject, config) {
  if (!sourceObject) return;

  const mappedFieldsArray = [];
  const sourceKeys = Object.keys(sourceObject);

  for (let index = 0; index < sourceKeys.length; ++index) {
    let fieldName = sourceKeys[index];
    let fieldValue = sourceObject[fieldName];

    // Skip the 'default' key
    if (fieldName === "default") continue;

    // Try to find the field in config.fields by original or camelCase name
    let configField = config.fields[fieldName];
    if (!configField) {
      const camelCaseFieldName = RD.util.camelCase(fieldName);
      configField = config.fields[camelCaseFieldName];
      if (!configField) continue;
      fieldName = camelCaseFieldName; // Use the camelCase name if found
    }

    // Add the field name and value to the mapped array
    mappedFieldsArray.push(fieldName, fieldValue);
  }

  // If any fields were mapped, convert the array to an object and return using config.fromObject
  return mappedFieldsArray.length
    ? config.fromObject(RD.util.toObject(mappedFieldsArray))
    : undefined;
}

module.exports = mapObjectFieldsToConfigObject;