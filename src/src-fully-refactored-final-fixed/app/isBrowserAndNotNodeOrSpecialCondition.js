/**
 * Checks if the current environment is a browser and either not Node.js or meets a special condition.
 *
 * This function determines if the code is running in a browser environment (i.e., 'window' is defined),
 * and then checks if the environment is not Node.js, or if a special condition (defined by 'isSpecialBrowserConditionMet') is true.
 *
 * @returns {boolean} Returns true if running in a browser and either not Node.js or the special condition is met; otherwise, false.
 */
function isBrowserAndNotNodeOrSpecialCondition() {
  // Check if 'window' is defined, indicating a browser environment
  const isBrowser = typeof window !== "undefined";

  // Check if the current environment is Node.js
  const isNodeEnvironment = ju2.isNodeEnv();

  // Check if the special browser condition is met (implementation of yu2)
  const isSpecialBrowserConditionMet = yu2();

  // Return true if in browser and (not Node.js or special condition is met)
  return isBrowser && (!isNodeEnvironment || isSpecialBrowserConditionMet);
}

module.exports = isBrowserAndNotNodeOrSpecialCondition;