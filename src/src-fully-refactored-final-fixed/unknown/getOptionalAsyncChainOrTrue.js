/**
 * Retrieves the result of an asynchronous optional chain operation on the provided input.
 * If the result is null or undefined, returns true instead.
 *
 * @async
 * @function getOptionalAsyncChainOrTrue
 * @param {any} inputValue - The value to be passed to jl2._asyncOptionalChain for processing.
 * @returns {Promise<any>} Resolves to the result of jl2._asyncOptionalChain(inputValue), or true if the result is null or undefined.
 */
async function getOptionalAsyncChainOrTrue(inputValue) {
  // Await the result of the asynchronous optional chain operation
  const asyncChainResult = await jl2._asyncOptionalChain(inputValue);
  // If the result is null or undefined, return true; otherwise, return the result
  return asyncChainResult == null ? true : asyncChainResult;
}

module.exports = getOptionalAsyncChainOrTrue;