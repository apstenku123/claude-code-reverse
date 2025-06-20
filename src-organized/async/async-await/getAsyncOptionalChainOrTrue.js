/**
 * Retrieves the result of an asynchronous optional chain operation.
 * If the result is null or undefined, returns true instead.
 *
 * @async
 * @function getAsyncOptionalChainOrTrue
 * @param {any} sourceValue - The value or promise to be processed by the async optional chain.
 * @returns {Promise<any|boolean>} Resolves to the result of the async optional chain, or true if the result is null or undefined.
 */
async function getAsyncOptionalChainOrTrue(sourceValue) {
  // Await the result of the async optional chain operation
  const result = await jl2._asyncOptionalChain(sourceValue);
  // If the result is null or undefined, return true; otherwise, return the result
  return result == null ? true : result;
}

module.exports = getAsyncOptionalChainOrTrue;