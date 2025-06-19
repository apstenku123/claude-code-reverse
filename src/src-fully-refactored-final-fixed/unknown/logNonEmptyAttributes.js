/**
 * Logs the attributes of each object in the provided array if the attributes object is not empty.
 *
 * @param {Array<Object>} items - An array of objects, each expected to have an 'attributes' property (object).
 * @returns {void}
 */
function logNonEmptyAttributes(items) {
    items.forEach(item => {
        // Check if the 'attributes' object has any keys
        if (Object.keys(item.attributes).length > 0) {
            // Pretty-print the attributes object as a JSON string
            const attributesJson = JSON.stringify(item.attributes, null, 4);
            // Log the JSON string using the verbose diagnostic logger
            mv1.diag.verbose(attributesJson);
        }
    });
}

module.exports = logNonEmptyAttributes;