/**
 * Creates a custom validation schema with optional asynchronous support and configurable issue reporting.
 *
 * @param {Function} validationFunction - a function that takes an input value and returns a boolean (sync) or Promise<boolean> (async) indicating validity.
 * @param {Object} [issueConfig={}] - Optional configuration for issue reporting (e.g., message, path, etc.).
 * @param {boolean} [defaultFatal=true] - Optional default for whether the issue should be marked as fatal if not specified in config.
 * @returns {Object} a schema object with custom validation logic applied.
 */
function createCustomValidator(validationFunction, issueConfig = {}, defaultFatal) {
  if (validationFunction) {
    // Create a schema and attach a custom refinement (validation) function
    return iP.create().superRefine(async (inputValue, context) => {
      // Run the validation function (can be sync or async)
      const validationResult = validationFunction(inputValue);

      // If the validation function returns a Promise, handle async validation
      if (validationResult instanceof Promise) {
        const isValid = await validationResult;
        if (!isValid) {
          // Generate issue details using normalizeMessageInput(external helper)
          const issueDetails = normalizeMessageInput(issueConfig, inputValue);
          // Determine if the issue is fatal (priority: config > defaultFatal > true)
          const isFatal = issueDetails.fatal !== undefined ? issueDetails.fatal : (defaultFatal !== undefined ? defaultFatal : true);
          // Report the issue to the context
          context.addIssue({
            code: "custom",
            ...issueDetails,
            fatal: isFatal
          });
        }
      } else {
        // Synchronous validation path
        if (!validationResult) {
          const issueDetails = normalizeMessageInput(issueConfig, inputValue);
          const isFatal = issueDetails.fatal !== undefined ? issueDetails.fatal : (defaultFatal !== undefined ? defaultFatal : true);
          context.addIssue({
            code: "custom",
            ...issueDetails,
            fatal: isFatal
          });
        }
      }
      // No explicit return needed; context is mutated for issues
    });
  }
  // If no validation function is provided, return a basic schema
  return iP.create();
}

module.exports = createCustomValidator;