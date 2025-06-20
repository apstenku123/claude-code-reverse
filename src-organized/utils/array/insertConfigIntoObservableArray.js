/**
 * Inserts a configuration object into an observable array, handling formatting and edge cases.
 *
 * If the source observable is empty or blank, returns a formatted JSON array with only the config.
 * Otherwise, processes the observable array, attempts to insert the config, and returns the updated, formatted JSON string.
 * Handles errors gracefully by logging and returning a fallback JSON array.
 *
 * @param {string} sourceObservable - The JSON string representing the observable array.
 * @param {object} config - The configuration object to insert into the array.
 * @returns {string} a formatted JSON string representing the updated observable array.
 */
function insertConfigIntoObservableArray(sourceObservable, config) {
  try {
    // If the source is empty or only whitespace, return an array with just the config
    if (!sourceObservable || sourceObservable.trim() === "") {
      return JSON.stringify([config], null, 4);
    }

    // Parse the observable array from the source string
    const observableArray = BT1(sourceObservable);

    if (Array.isArray(observableArray)) {
      const arrayLength = observableArray.length;
      // Prepare insertion configuration
      const insertionIndices = arrayLength === 0 ? [0] : [arrayLength];
      const insertionResult = xxA(
        sourceObservable,
        insertionIndices,
        config,
        {
          formattingOptions: {
            insertSpaces: true,
            tabSize: 4
          },
          isArrayInsertion: true
        }
      );

      // If insertion failed or returned empty, append config manually
      if (!insertionResult || insertionResult.length === 0) {
        const updatedArray = [...observableArray, config];
        return JSON.stringify(updatedArray, null, 4);
      }

      // Return the formatted result from applyNonOverlappingEdits
      return applyNonOverlappingEdits(sourceObservable, insertionResult);
    } else {
      // If the parsed result is not an array, fallback to single-element array
      return JSON.stringify([config], null, 4);
    }
  } catch (error) {
    // Log the error and return fallback JSON array
    reportErrorIfAllowed(error);
    return JSON.stringify([config], null, 4);
  }
}

module.exports = insertConfigIntoObservableArray;