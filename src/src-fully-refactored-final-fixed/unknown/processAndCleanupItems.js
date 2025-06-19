/**
 * Processes each item in the i6 Set, performs cleanup and state updates.
 *
 * For each item in i6:
 *   - Retrieves a related key using BZ
 *   - If the key is not null:
 *       - Computes two derived values using mergeAndSumMapEntries with different parameters
 *       - Calls S5 on a global BugReportForm, the key, and both derived values (likely for cleanup or notification)
 *   - Removes the item from two Sets: L7 and AZ
 *
 * After processing all items, clears the i6 Set.
 *
 * @function processAndCleanupItems
 * @returns {void} No return value
 */
function processAndCleanupItems() {
  // Perform any necessary pre-processing
  Np();

  // Iterate over each item in the i6 Set
  i6.forEach(function (item) {
    // Retrieve a related key for the current item
    const relatedKey = BZ(item);

    if (relatedKey === null) {
      // If no related key, skip further processing for this item
      return;
    }

    // Compute derived values based on the item and its related key
    const derivedValue1 = mergeAndSumMapEntries(item, relatedKey, L7, n8);
    const derivedValue2 = mergeAndSumMapEntries(item, relatedKey, AZ, R7);

    // Perform cleanup or notification for global BugReportForm, the key, and both derived values
    S5(BugReportForm);
    S5(relatedKey);
    S5(derivedValue1);
    S5(derivedValue2);

    // Remove the item from L7 and AZ Sets
    L7.delete(item);
    AZ.delete(item);
  });

  // Clear all items from i6 after processing
  i6.clear();
}

module.exports = processAndCleanupItems;