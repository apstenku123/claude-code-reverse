/**
 * Maps properties from a source object to a target object based on a configuration'createInteractionAccessor fields.
 * Skips the 'default' property and attempts to match both original and camelCased keys.
 * Returns a new object constructed from the matched fields using the config'createInteractionAccessor fromObject method.
 *
 * @param {Object} sourceObject - The object whose properties are to be mapped.
 * @param {Object} config - The configuration object containing a 'fields' map and a 'fromObject' method.
 * @returns {any|undefined} The mapped object created by config.fromObject, or undefined if no fields matched.
 */
function mapObjectFieldsToConfig(sourceObject, config) {
  if (!sourceObject) return;

  const matchedFieldsArray = [];
  const sourceKeys = Object.keys(sourceObject);

  for (let i = 0; i < sourceKeys.length; ++i) {
    const originalKey = sourceKeys[i];
    const value = sourceObject[originalKey];

    // Skip the 'default' property
    if (originalKey === "default") continue;

    // Try to find a matching field in config.fields
    let configField = config.fields[originalKey];
    let matchedKey = originalKey;

    // If not found, try camelCase version of the key
    if (!configField) {
      const camelCasedKey = RD.util.camelCase(originalKey);
      configField = config.fields[camelCasedKey];
      if (configField) {
        matchedKey = camelCasedKey;
      } else {
        continue; // Skip if no matching field found
      }
    }

    // Add the matched key and its value to the array
    matchedFieldsArray.push(matchedKey, value);
  }

  // If any fields were matched, convert the array to an object and use config.fromObject
  return matchedFieldsArray.length
    ? config.fromObject(RD.util.toObject(matchedFieldsArray))
    : undefined;
}

module.exports = mapObjectFieldsToConfig;