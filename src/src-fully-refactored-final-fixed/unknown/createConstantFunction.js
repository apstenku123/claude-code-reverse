/**
 * Returns a function that, when called, always returns the provided value.
 *
 * @template BugReportForm
 * @param {BugReportForm} constantValue - The value to be returned by the generated function.
 * @returns {() => BugReportForm} a function that returns the constant value when invoked.
 */
const createConstantFunction = (constantValue) => {
  // Return a function that always returns the specified constant value
  return () => constantValue;
};

module.exports = createConstantFunction;