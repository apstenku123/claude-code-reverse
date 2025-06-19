/**
 * Validates the request configuration object for deprecated or invalid option names.
 * Throws an error if any invalid configuration options are found, suggesting the correct option name.
 *
 * @param {Object} configOptions - The configuration object to validate.
 * @throws {Error} If an invalid configuration option is found.
 */
function validateRequestConfigOptions(configOptions) {
  // List of invalid configuration options and their recommended replacements
  const invalidOptions = [
    {
      invalid: "uri",
      expected: "url"
    },
    {
      invalid: "json",
      expected: "data"
    },
    {
      invalid: "qs",
      expected: "params"
    }
  ];

  // Iterate through each invalid option and check if isBlobOrFileLikeObject exists in the provided config
  for (const option of invalidOptions) {
    if (configOptions[option.invalid]) {
      // Construct a helpful error message
      const errorMessage = `'\${option.invalid}' is not a valid configuration option. Please use '\${option.expected}' instead. This library is using Axios for requests. Please see https://github.com/axios/axios to learn more about the valid request options.`;
      throw new Error(errorMessage);
    }
  }
}

module.exports = validateRequestConfigOptions;
