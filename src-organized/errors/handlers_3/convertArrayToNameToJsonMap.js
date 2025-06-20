/**
 * Converts an array of objects (each with a 'name' property and a 'toJSON' method) into an object map.
 * Each key in the returned object corresponds to the 'name' property of an entry in the array,
 * and each value is the result of calling that entry'createInteractionAccessor 'toJSON' method with the provided options.
 *
 * @param {Array<{ name: string, toJSON: function(any): any }>} entries - Array of objects to convert.
 * @param {any} options - Optional parameter to pass to each entry'createInteractionAccessor toJSON method.
 * @returns {Object<string, any>|undefined} An object mapping names to their JSON representations, or undefined if entries is empty or not provided.
 */
function convertArrayToNameToJsonMap(entries, options) {
  // Return undefined if entries is not provided or is empty
  if (!Array.isArray(entries) || entries.length === 0) return;

  const nameToJsonMap = {};

  // Iterate through each entry and map its name to its JSON representation
  for (let index = 0; index < entries.length; ++index) {
    const entry = entries[index];
    nameToJsonMap[entry.name] = entry.toJSON(options);
  }

  return nameToJsonMap;
}

module.exports = convertArrayToNameToJsonMap;