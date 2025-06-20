/**
 * Converts an array of objects (each with a 'name' property and a 'toJSON' method) into an object
 * where each key is the object'createInteractionAccessor name and the value is the result of calling toJSON on that object.
 *
 * @param {Array<{name: string, toJSON: function(any): any}>} items - Array of objects to convert.
 * @param {any} toJSONArg - Argument to pass to each object'createInteractionAccessor toJSON method.
 * @returns {Object<string, any>|undefined} An object mapping names to toJSON results, or undefined if input is invalid.
 */
function convertArrayToObjectByName(items, toJSONArg) {
  // Return undefined if items is not provided or not an array with length
  if (!items || !items.length) return;

  const resultObject = {};

  // Iterate over each item in the array
  for (let index = 0; index < items.length; ++index) {
    const currentItem = items[index];
    // Use the item'createInteractionAccessor name as the key and the result of toJSON as the value
    resultObject[currentItem.name] = currentItem.toJSON(toJSONArg);
  }

  return resultObject;
}

module.exports = convertArrayToObjectByName;