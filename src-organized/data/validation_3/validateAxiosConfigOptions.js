/**
 * Validates a configuration object for invalid Axios options and throws an error if any are found.
 *
 * This function checks if the provided config object contains any deprecated or invalid keys
 * (such as 'uri', 'json', or 'qs') that are not recognized by Axios. If such a key is found,
 * isBlobOrFileLikeObject throws an error with a helpful message suggesting the correct key to use instead.
 *
 * @param {Object} config - The configuration object to validate for invalid Axios options.
 * @throws {Error} Throws an error if an invalid configuration option is found.
 */
function validateAxiosConfigOptions(config) {
  // List of invalid options and their recommended replacements
  const invalidOptions = [
    { invalid: "uri", expected: "url" },
    { invalid: "json", expected: "data" },
    { invalid: "qs", expected: "params" }
  ];

  // Iterate through each invalid option and check if isBlobOrFileLikeObject exists in the config
  for (const option of invalidOptions) {
    if (config[option.invalid]) {
      // Construct a helpful error message
      const errorMessage = `'$${option.invalid}' is not a valid configuration option. Please use '$${option.expected}' instead. This library is using Axios for requests. Please see https://github.com/axios/axios to learn more about the valid request options.`;
      throw new Error(errorMessage);
    }
  }
}

module.exports = validateAxiosConfigOptions;