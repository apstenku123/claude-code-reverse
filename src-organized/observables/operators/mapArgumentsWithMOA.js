/**
 * Maps each argument through the getSourceString function and joins the results with a pipe (|), wrapped in parentheses.
 *
 * @param {...any} args - The arguments to be mapped by the getSourceString function.
 * @returns {string} a string containing the mapped arguments joined by a pipe and wrapped in parentheses.
 */
function mapArgumentsWithMOA(...args) {
  // Map each argument using the getSourceString function
  const mappedArguments = args.map(argument => getSourceString(argument));

  // Join the mapped arguments with a pipe and wrap in parentheses
  const result = `(${mappedArguments.join('|')})`;

  return result;
}

module.exports = mapArgumentsWithMOA;