/**
 * Processes input data, applies transformations, and attaches metadata.
 *
 * This function takes an input object, applies a parameter conversion,
 * performs two transformations, generates a metadata object, and if the
 * final result is not null, attaches the metadata and performs a final operation.
 *
 * @param {object} inputData - The main data object to process.
 * @param {any} parameter - The parameter to be converted and used in transformations.
 * @param {any} conversionContext - Context or options for parameter conversion.
 * @returns {void}
 */
function processAndAttachMetadata(inputData, parameter, conversionContext) {
  // Convert the parameter using the provided context
  const convertedParameter = defineProperties(conversionContext, parameter);

  // Apply the first transformation to the input data
  const transformedParameter = createNullElementCallbackEffect(inputData, convertedParameter, 1);

  // Apply the second transformation to the input data
  const transformedData = enqueueUpdate(inputData, transformedParameter, 1);

  // Generate a metadata object
  const metadata = getOrComputeValue();

  // If the transformed data is not null, attach metadata and perform final operation
  if (transformedData !== null) {
    markLanePendingAndSetEventTime(transformedData, 1, metadata); // Attach metadata
    manageSchedulerCallback(transformedData, metadata);    // Perform final operation with metadata
  }
}

module.exports = processAndAttachMetadata;