/**
 * Maps an array of objects to a dictionary keyed by each object'createInteractionAccessor 'name' property, 
 * with values being the result of calling each object'createInteractionAccessor toJSON method.
 *
 * @param {Array<Object>} entries - Array of objects, each with a 'name' property and a 'toJSON' method.
 * @param {any} toJsonArg - Argument to pass to each object'createInteractionAccessor toJSON method.
 * @returns {Object|undefined} An object mapping each entry'createInteractionAccessor name to its JSON representation, or undefined if entries is empty or falsy.
 */
function mapEntriesToJsonByName(entries, toJsonArg) {
  // Return undefined if entries is falsy or has no elements
  if (!entries || entries.length === 0) return;

  const resultByName = {};

  // Iterate over each entry and map its name to its JSON representation
  for (let i = 0; i < entries.length; ++i) {
    const entry = entries[i];
    resultByName[entry.name] = entry.toJSON(toJsonArg);
  }

  return resultByName;
}

module.exports = mapEntriesToJsonByName;