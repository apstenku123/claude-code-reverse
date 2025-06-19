/**
 * Logs the attributes of each object in the provided array if they have any attributes defined.
 * The attributes are stringified with indentation and logged using mv1.diag.verbose.
 *
 * @param {Array<Object>} objectsWithAttributes - An array of objects, each expected to have an 'attributes' property (object).
 * @returns {void}
 */
function logNonEmptyAttributesVerbose(objectsWithAttributes) {
    objectsWithAttributes.forEach(objectWithAttributes => {
        // Check if the 'attributes' object has any keys (i.e., is not empty)
        if (Object.keys(objectWithAttributes.attributes).length > 0) {
            // Convert the attributes object to a pretty-printed JSON string
            const attributesJson = JSON.stringify(objectWithAttributes.attributes, null, 4);
            // Log the JSON string using the verbose diagnostic logger
            mv1.diag.verbose(attributesJson);
        }
    });
}

module.exports = logNonEmptyAttributesVerbose;
