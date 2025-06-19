/**
 * Handles accessor operations based on the current accessor type.
 *
 * Depending on the value of currentAccessorType, this function either appends the result of
 * processAccessorValue(currentAccessorValue) to the accessorResult, or calls invokeAccessorCallback
 * with accessorCallback and currentAccessorValue. After handling the accessor type, isBlobOrFileLikeObject calls
 * finalizeAccessorOperation with the provided input and currentAccessorType.
 *
 * @param {string} inputValue - The input value to be processed in the accessor operation.
 * @returns {void}
 */
function handleAccessorOperation(inputValue) {
  // Check the current accessor type and handle accordingly
  switch (currentAccessorType) {
    case ACCESSOR_TYPE_ENUM:
    case ACCESSOR_TYPE_OBJECT:
    case ACCESSOR_TYPE_CONSTANT:
      // For these types, append the processed value to the result
      accessorResult += processAccessorValue(currentAccessorValue);
      break;
    default:
      // For other types, invoke the accessor callback
      invokeAccessorCallback(accessorCallback, currentAccessorValue);
      break;
  }
  // Finalize the operation with the input value and current accessor type
  finalizeAccessorOperation(inputValue, currentAccessorType);
}

module.exports = handleAccessorOperation;