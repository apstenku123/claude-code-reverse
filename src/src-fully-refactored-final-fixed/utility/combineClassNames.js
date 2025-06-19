/**
 * Combines multiple class name values into a single string after processing each with getSourceString.
 *
 * @param {...string} classNames - The class name values to be processed and combined.
 * @returns {string} The combined class name string after processing each input with getSourceString.
 */
function combineClassNames(...classNames) {
  // Process each class name with getSourceString and join the results into a single string
  return classNames.map(className => getSourceString(className)).join("");
}

module.exports = combineClassNames;