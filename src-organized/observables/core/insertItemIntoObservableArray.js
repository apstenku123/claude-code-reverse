/**
 * Inserts an item into an observable array represented by a JSON string, handling formatting and edge cases.
 *
 * If the source observable string is empty or invalid, returns a new array with the item as the only element.
 * If the source is a valid array, attempts to insert the item at the end, using a configurable formatting option.
 * Falls back to appending the item if insertion fails, and always returns a pretty-printed JSON string.
 *
 * @param {string} sourceObservable - The JSON string representing the observable array to insert into.
 * @param {*} itemToInsert - The item to insert into the array.
 * @returns {string} a pretty-printed JSON string of the resulting array.
 */
function insertItemIntoObservableArray(sourceObservable, itemToInsert) {
  try {
    // If the source is empty or only whitespace, return a new array with the item
    if (!sourceObservable || sourceObservable.trim() === "") {
      return JSON.stringify([itemToInsert], null, 4);
    }

    // Attempt to parse the source observable into an array
    const parsedArray = BT1(sourceObservable);

    if (Array.isArray(parsedArray)) {
      const arrayLength = parsedArray.length;

      // Attempt to process the observable with insertion configuration
      const processedObservable = processObservableWithConfig(
        sourceObservable,
        arrayLength === 0 ? [0] : [arrayLength],
        itemToInsert,
        {
          formattingOptions: {
            insertSpaces: true,
            tabSize: 4
          },
          isArrayInsertion: true
        }
      );

      // If processing failed or returned an empty result, fallback to appending
      if (!processedObservable || processedObservable.length === 0) {
        const appendedArray = [...parsedArray, itemToInsert];
        return JSON.stringify(appendedArray, null, 4);
      }

      // Return the processed observable (likely a formatted string)
      return applyNonOverlappingEdits(sourceObservable, processedObservable);
    } else {
      // If the parsed source is not an array, fallback to new array with the item
      return JSON.stringify([itemToInsert], null, 4);
    }
  } catch (error) {
    // Log the error and fallback to new array with the item
    reportErrorIfAllowed(error);
    return JSON.stringify([itemToInsert], null, 4);
  }
}

module.exports = insertItemIntoObservableArray;
