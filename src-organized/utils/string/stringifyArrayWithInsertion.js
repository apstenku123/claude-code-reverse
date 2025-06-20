/**
 * Converts a JSON array string or empty input into a pretty-printed JSON string with an inserted element.
 * If the input is an empty string or falsy, returns a new array with the element. If the input is a valid JSON array,
 * attempts to insert the element using a custom insertion function. Falls back to appending if insertion fails.
 * Handles errors gracefully and always returns a valid JSON array string.
 *
 * @param {string} jsonArrayString - The JSON array string to process. If empty or invalid, a new array is created.
 * @param {*} elementToInsert - The element to insert into the array.
 * @returns {string} a pretty-printed JSON string representing the array with the inserted element.
 */
function stringifyArrayWithInsertion(jsonArrayString, elementToInsert) {
  try {
    // If input is empty or only whitespace, return a new array with the element
    if (!jsonArrayString || jsonArrayString.trim() === "") {
      return JSON.stringify([elementToInsert], null, 4);
    }

    // Attempt to parse the input string as a JSON array using BT1
    const parsedArray = BT1(jsonArrayString);

    if (Array.isArray(parsedArray)) {
      const arrayLength = parsedArray.length;
      // Attempt to insert the element using xxA (custom insertion logic)
      const insertionResult = xxA(
        jsonArrayString,
        arrayLength === 0 ? [0] : [arrayLength],
        elementToInsert,
        {
          formattingOptions: {
            insertSpaces: true,
            tabSize: 4
          },
          isArrayInsertion: true
        }
      );

      // If insertionResult is empty or falsy, fallback to appending the element
      if (!insertionResult || insertionResult.length === 0) {
        const newArray = [...parsedArray, elementToInsert];
        return JSON.stringify(newArray, null, 4);
      }
      // Use applyNonOverlappingEdits to finalize the insertion result
      return applyNonOverlappingEdits(jsonArrayString, insertionResult);
    } else {
      // If parsed result is not an array, fallback to a new array with the element
      return JSON.stringify([elementToInsert], null, 4);
    }
  } catch (error) {
    // Log the error using reportErrorIfAllowed and return a new array with the element
    reportErrorIfAllowed(error);
    return JSON.stringify([elementToInsert], null, 4);
  }
}

module.exports = stringifyArrayWithInsertion;