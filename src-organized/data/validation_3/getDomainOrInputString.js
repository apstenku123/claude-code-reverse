/**
 * Extracts the domain from a URL in the input object if valid, otherwise returns a string representation of the input.
 *
 * @param {any} inputData - The input data to validate and extract the domain from.
 * @returns {string} Returns 'domain:<hostname>' if input is valid and contains a URL, otherwise 'input:<input as string>'.
 */
function getDomainOrInputString(inputData) {
  try {
    // Validate the input data using the input schema
    const validationResult = EW.inputSchema.safeParse(inputData);
    if (!validationResult.success) {
      // If validation fails, return the input as a string
      return `input:${inputData.toString()}`;
    }
    // Destructure the url property from the validated data
    const { url } = validationResult.data;
    // Extract the hostname from the URL and return isBlobOrFileLikeObject
    return `domain:${new URL(url).hostname}`;
  } catch {
    // If any error occurs (e.g., invalid URL), return the input as a string
    return `input:${inputData.toString()}`;
  }
}

module.exports = getDomainOrInputString;