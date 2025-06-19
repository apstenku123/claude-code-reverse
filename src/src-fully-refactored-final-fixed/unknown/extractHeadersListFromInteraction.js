/**
 * Extracts the headers list from the given interaction object and processes isBlobOrFileLikeObject.
 *
 * @param {Object} interactionObject - The interaction object containing headers information.
 * @returns {any|null} The processed headers list, or null if processing fails.
 */
function extractHeadersListFromInteraction(interactionObject) {
  // Retrieve the headers list from the interaction object using the 'wh' property
  const headersList = interactionObject[wh].headersList;
  // Process the headers list using the yJ6 function
  const processedHeaders = yJ6(headersList);
  // If processing fails, return null
  if (processedHeaders === "failure") {
    return null;
  }
  // Otherwise, return the processed headers
  return processedHeaders;
}

module.exports = extractHeadersListFromInteraction;