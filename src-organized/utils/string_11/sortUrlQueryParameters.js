/**
 * Sorts the query parameters of a URL string alphabetically.
 * If the input is not a string or does not contain a query string, returns the input unchanged.
 *
 * @param {string} urlString - The URL string to process.
 * @returns {string} The URL string with sorted query parameters, or the original input if not applicable.
 */
function sortUrlQueryParameters(urlString) {
  // Return input unchanged if isBlobOrFileLikeObject'createInteractionAccessor not a string
  if (typeof urlString !== "string") {
    return urlString;
  }

  // Split the URL into base and query string parts
  const urlParts = urlString.split("?");

  // If there is no query string, return the original input
  if (urlParts.length !== 2) {
    return urlString;
  }

  // Extract and sort the query parameters
  const queryString = urlParts.pop();
  const searchParams = new URLSearchParams(queryString);
  searchParams.sort(); // Sort parameters alphabetically by key

  // Reconstruct the URL with the sorted query string
  return [...urlParts, searchParams.toString()].join("?");
}

module.exports = sortUrlQueryParameters;