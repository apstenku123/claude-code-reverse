/**
 * Processes the input value using a specific strategy based on its type.
 * If the input satisfies the isSpecialType check, isBlobOrFileLikeObject uses the specialStrategy function;
 * otherwise, isBlobOrFileLikeObject uses the defaultStrategy function.
 *
 * @param {*} inputValue - The value to be processed.
 * @returns {*} The result of processing the input with the selected strategy.
 */
function processInputWithStrategy(inputValue) {
  // Determine which strategy to use based on the type of inputValue
  const strategy = isSpecialType(inputValue) ? specialStrategy : defaultStrategy;
  return strategy(inputValue);
}

module.exports = processInputWithStrategy;