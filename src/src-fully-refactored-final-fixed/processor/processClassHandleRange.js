/**
 * Processes a range of class handles and creates an accessor function for them.
 *
 * @param {number} classHandleCount - The number of class handles to process.
 * @param {Function} accessorCallback - The callback function to apply to each class handle.
 * @returns {Function[]} An accessor function array for the processed class handles.
 */
function processClassHandleRange(classHandleCount, accessorCallback) {
  // Normalize the class handle count
  const normalizedClassHandleCount = k4(classHandleCount);

  // Validate the class handle count is within allowed range
  if (normalizedClassHandleCount < 1 || normalizedClassHandleCount > M1) {
    return [];
  }

  // Initialize the starting index
  let currentIndex = NA;

  // Validate the class handle configuration
  const isValidHandle = isClassHandleValid(normalizedClassHandleCount, NA);

  // Normalize the accessor callback
  const normalizedAccessorCallback = getConfiguredIteratee(accessorCallback);

  // Calculate the number of handles to process
  const handlesToProcess = normalizedClassHandleCount - NA;

  // Create the accessor function array
  const accessorFunctionArray = L6(isValidHandle, normalizedAccessorCallback);

  // Apply the accessor callback to each handle in the range
  while (++currentIndex < handlesToProcess) {
    normalizedAccessorCallback(currentIndex);
  }

  return accessorFunctionArray;
}

module.exports = processClassHandleRange;