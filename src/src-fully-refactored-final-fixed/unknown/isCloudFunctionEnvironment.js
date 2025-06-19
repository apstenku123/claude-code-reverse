/**
 * Determines if the current Node.js process is running in a Google Cloud Functions environment.
 *
 * This function checks for the presence of either the FUNCTION_NAME or FUNCTION_TARGET
 * environment variables, which are set by Google Cloud Functions at runtime.
 *
 * @returns {boolean} Returns true if running in a Google Cloud Functions environment, otherwise false.
 */
function isCloudFunctionEnvironment() {
  // Check for the existence of either FUNCTION_NAME or FUNCTION_TARGET environment variables
  const hasFunctionName = Boolean(process.env.FUNCTION_NAME);
  const hasFunctionTarget = Boolean(process.env.FUNCTION_TARGET);

  return hasFunctionName || hasFunctionTarget;
}

module.exports = isCloudFunctionEnvironment;