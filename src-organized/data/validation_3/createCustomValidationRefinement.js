/**
 * Creates a custom validation refinement for a schema, allowing asynchronous or synchronous validation logic.
 * If the provided validation function returns a falsy value (or resolves to one), adds a custom issue to the context.
 *
 * @param {Function} validationFunction - a function that receives the input value and returns a boolean or a Promise<boolean> indicating validity.
 * @param {Object} [issueConfig={}] - Optional configuration object for the issue to be added if validation fails.
 * @param {boolean} [defaultFatal=true] - Optional default value for the 'fatal' property of the issue if not specified in issueConfig.
 * @returns {Object} a schema refinement object with the custom validation logic applied.
 */
function createCustomValidationRefinement(validationFunction, issueConfig = {}, defaultFatal) {
  if (validationFunction) {
    return iP.create().superRefine(async (inputValue, context) => {
      // Run the validation function (can be sync or async)
      const validationResult = validationFunction(inputValue);

      // If the validation function returns a Promise, await its result
      if (validationResult instanceof Promise) {
        const isValid = await validationResult;
        if (!isValid) {
          // Compose issue details
          const issueDetails = normalizeMessageInput(issueConfig, inputValue);
          // Determine fatal flag: issueConfig.fatal > defaultFatal > true
          const fatalFlag = issueDetails.fatal !== undefined ? issueDetails.fatal : (defaultFatal !== undefined ? defaultFatal : true);
          context.addIssue({
            code: "custom",
            ...issueDetails,
            fatal: fatalFlag
          });
        }
        return;
      }

      // Synchronous validation result
      if (!validationResult) {
        const issueDetails = normalizeMessageInput(issueConfig, inputValue);
        const fatalFlag = issueDetails.fatal !== undefined ? issueDetails.fatal : (defaultFatal !== undefined ? defaultFatal : true);
        context.addIssue({
          code: "custom",
          ...issueDetails,
          fatal: fatalFlag
        });
      }
      return;
    });
  }
  // If no validation function is provided, return a basic schema
  return iP.create();
}

module.exports = createCustomValidationRefinement;