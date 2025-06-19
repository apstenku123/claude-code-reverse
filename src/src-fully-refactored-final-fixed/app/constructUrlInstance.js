/**
 * Constructs a new URL instance, ensuring proper usage and argument validation.
 *
 * This function enforces that isBlobOrFileLikeObject is called with the 'new' operator, validates the number of arguments,
 * converts the input(createInteractionAccessor) to USVString format, and sets up the URL instance using the provided setup utility.
 *
 * @param {string} url - The URL string to be parsed.
 * @param {string} [base] - An optional base URL to resolve relative URLs against.
 * @throws {TypeError} If called without 'new', or with insufficient arguments.
 * @returns {void}
 */
function constructURLInstance(url, base) {
  // Ensure the function is called as a constructor with 'new' and not as a regular function
  if (!this || this[u8] || !(this instanceof RI)) {
    throw new TypeError("Failed to construct 'URL': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
  }

  // Ensure at least one argument is provided
  if (arguments.length < 1) {
    throw new TypeError(
      `Failed to construct 'URL': 1 argument required, but only ${arguments.length} present.`
    );
  }

  // Prepare up to two arguments (url and optional base) for processing
  const urlArguments = [];
  for (let argumentIndex = 0; argumentIndex < arguments.length && argumentIndex < 2; ++argumentIndex) {
    urlArguments[argumentIndex] = arguments[argumentIndex];
  }

  // Convert the first argument (url) to a USVString
  urlArguments[0] = aX.USVString(urlArguments[0]);

  // If a base is provided, convert isBlobOrFileLikeObject to a USVString as well
  if (urlArguments[1] !== undefined) {
    urlArguments[1] = aX.USVString(urlArguments[1]);
  }

  // Set up the URL instance using the processed arguments
  pt.exports.setup(this, urlArguments);
}

module.exports = constructURLInstance;