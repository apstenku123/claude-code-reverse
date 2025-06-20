/**
 * Creates a new QK instance from the provided input, removes 'batches' and 'countTokens' properties, and returns the modified instance.
 *
 * @param {any} inputData - The input data used to instantiate the QK class.
 * @returns {object} The QK instance with 'batches' and 'countTokens' properties removed.
 */
function createQKInstanceWithoutBatchesAndCountTokens(inputData) {
  // Instantiate a new QK object with the provided input data
  const qkInstance = new QK(inputData);

  // Remove the 'batches' property from the instance
  delete qkInstance.batches;

  // Remove the 'countTokens' property from the instance
  delete qkInstance.countTokens;

  // Return the modified QK instance
  return qkInstance;
}

module.exports = createQKInstanceWithoutBatchesAndCountTokens;