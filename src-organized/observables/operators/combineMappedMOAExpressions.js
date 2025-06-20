/**
 * Combines multiple input values by mapping each through the getSourceString function and joining them with a pipe (|) inside parentheses.
 *
 * @param {...any} values - The values to be mapped and combined.
 * @returns {string} a string containing all mapped values, separated by '|', and wrapped in parentheses.
 */
function combineMappedMOAExpressions(...values) {
  // Map each input value using the getSourceString function
  const mappedValues = values.map(value => getSourceString(value));
  // Join the mapped values with a pipe and wrap in parentheses
  return `(${mappedValues.join('|')})`;
}

module.exports = combineMappedMOAExpressions;