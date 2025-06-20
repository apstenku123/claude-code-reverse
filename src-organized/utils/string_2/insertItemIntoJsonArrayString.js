/**
 * Inserts an item into a JSON array string, formatting the result.
 * If the input string is empty or invalid, returns a formatted JSON array with the item.
 *
 * @param {string} jsonArrayString - The JSON array as a string. Can be empty or whitespace.
 * @param {*} itemToInsert - The item to insert into the array.
 * @returns {string} - The resulting JSON array as a formatted string.
 */
function insertItemIntoJsonArrayString(jsonArrayString, itemToInsert) {
    try {
        // If the input string is empty or only whitespace, return a new array with the item
        if (!jsonArrayString || jsonArrayString.trim() === "") {
            return JSON.stringify([itemToInsert], null, 4);
        }

        // Parse the input string into an array using BT1 (assumed to be a safe JSON parser)
        const parsedArray = BT1(jsonArrayString);

        if (Array.isArray(parsedArray)) {
            const arrayLength = parsedArray.length;

            // Attempt to insert the item using xxA, which may handle formatting or insertion logic
            const insertResults = xxA(
                jsonArrayString,
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

            // If xxA fails or returns an empty result, append the item and stringify
            if (!insertResults || insertResults.length === 0) {
                const newArray = [...parsedArray, itemToInsert];
                return JSON.stringify(newArray, null, 4);
            }

            // Otherwise, process the result with applyNonOverlappingEdits(assumed to format or finalize the string)
            return applyNonOverlappingEdits(jsonArrayString, insertResults);
        } else {
            // If parsing did not yield an array, return a new array with the item
            return JSON.stringify([itemToInsert], null, 4);
        }
    } catch (error) {
        // Log the error using reportErrorIfAllowed and return a new array with the item
        reportErrorIfAllowed(error);
        return JSON.stringify([itemToInsert], null, 4);
    }
}

module.exports = insertItemIntoJsonArrayString;