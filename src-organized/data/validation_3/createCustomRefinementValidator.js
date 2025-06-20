/**
 * Creates a custom refinement validator for use with iP schemas.
 *
 * This function wraps a user-provided validation function and, if the validation fails,
 * adds a custom issue to the validation context. It supports both synchronous and asynchronous
 * validation functions. Additional issue details and fatality can be configured.
 *
 * @param {function(any): (boolean|Promise<boolean>)} validationFn - The validation function to apply. Should return true if valid, false otherwise. Can return a Promise for async validation.
 * @param {object} [issueConfig={}] - Optional configuration for the issue to be added if validation fails (e.g., message, path, etc).
 * @param {boolean} [defaultFatal=true] - Optional default value for the 'fatal' property of the issue if not specified in issueConfig.
 * @returns {object} An iP schema with the custom refinement applied.
 */
function createCustomRefinementValidator(validationFn, issueConfig = {}, defaultFatal = true) {
  if (validationFn) {
    return iP.create().superRefine(async (inputValue, validationContext) => {
      // Run the validation function (can be sync or async)
      const validationResult = validationFn(inputValue);

      // If the validation function returns a Promise, await isBlobOrFileLikeObject
      const isValid = validationResult instanceof Promise ? await validationResult : validationResult;

      if (!isValid) {
        // Prepare issue details using normalizeMessageInput(external helper)
        const issueDetails = normalizeMessageInput(issueConfig, inputValue);
        // Determine fatality: issueConfig.fatal > defaultFatal > true
        const fatal = issueDetails.fatal !== undefined ? issueDetails.fatal : (defaultFatal !== undefined ? defaultFatal : true);
        // Add the custom issue to the context
        validationContext.addIssue({
          code: "custom",
          ...issueDetails,
          fatal
        });
      }
      // No explicit return needed for superRefine
    });
  }
  // If no validation function is provided, return a plain iP schema
  return iP.create();
}

module.exports = createCustomRefinementValidator;