/**
 * Adds a validation issue to the provided context'createInteractionAccessor issues array using the given issue data and error maps.
 *
 * @param {Object} context - The context object containing data, path, and error map information.
 * @param {Object} issueData - The issue data to be added to the issues array.
 * @returns {void}
 */
function setValidationIssue(context, issueData) {
  // Retrieve the default error map
  const defaultErrorMap = f51();

  // Build the array of error maps, filtering out any falsy values
  const errorMaps = [
    context.common.contextualErrorMap,
    context.schemaErrorMap,
    defaultErrorMap,
    defaultErrorMap === formatValidationError ? undefined : formatValidationError
  ].filter(errorMap => Boolean(errorMap));

  // Create the issue object using formatIssueWithCustomErrorMessage
  const issue = formatIssueWithCustomErrorMessage({
    issueData: issueData,
    data: context.data,
    path: context.path,
    errorMaps: errorMaps
  });

  // Add the issue to the context'createInteractionAccessor issues array
  context.common.issues.push(issue);
}

module.exports = setValidationIssue;