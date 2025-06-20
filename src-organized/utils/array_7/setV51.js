/**
 * Adds a new issue to the issues array in the provided context using the formatIssueWithCustomErrorMessage accessor.
 *
 * @param {Object} context - The context object containing data, path, error maps, and issues array.
 * @param {Object} issueConfig - The configuration object for the issue to be added.
 * @returns {void}
 *
 * The function constructs an issue object using the formatIssueWithCustomErrorMessage accessor, passing in relevant data and error maps.
 * It then pushes the constructed issue into the context'createInteractionAccessor issues array.
 */
function setV51Accessor(context, issueConfig) {
  // Retrieve the default error map (subscription)
  const defaultErrorMap = f51();

  // Build the array of error maps, filtering out any falsy values
  const errorMaps = [
    context.common.contextualErrorMap,
    context.schemaErrorMap,
    defaultErrorMap,
    defaultErrorMap === formatValidationError ? undefined : formatValidationError
  ].filter(errorMap => !!errorMap);

  // Construct the issue object using the formatIssueWithCustomErrorMessage accessor
  const issue = formatIssueWithCustomErrorMessage({
    issueData: issueConfig,
    data: context.data,
    path: context.path,
    errorMaps: errorMaps
  });

  // Add the constructed issue to the issues array
  context.common.issues.push(issue);
}

module.exports = setV51Accessor;