/**
 * Adds a formatted issue object to the issues array in the provided context.
 *
 * @param {Object} context - The context object containing data, path, error maps, and issues array.
 * @param {Object} issueDetails - The details of the issue to be added.
 * @returns {void}
 *
 * The function constructs an issue object using the formatIssueWithCustomErrorMessage function, passing in relevant data, path, and error maps.
 * It then pushes the resulting issue object to the context'createInteractionAccessor issues array.
 */
function setV51Accessor(context, issueDetails) {
  // Retrieve the default error map function
  const defaultErrorMap = f51();

  // Build the array of error maps, filtering out any falsy values
  const errorMaps = [
    context.common.contextualErrorMap,
    context.schemaErrorMap,
    defaultErrorMap,
    defaultErrorMap === formatValidationError ? undefined : formatValidationError
  ].filter(errorMap => Boolean(errorMap));

  // Create the issue object using formatIssueWithCustomErrorMessage
  const issueObject = formatIssueWithCustomErrorMessage({
    issueData: issueDetails,
    data: context.data,
    path: context.path,
    errorMaps: errorMaps
  });

  // Add the issue object to the issues array in the context
  context.common.issues.push(issueObject);
}

module.exports = setV51Accessor;