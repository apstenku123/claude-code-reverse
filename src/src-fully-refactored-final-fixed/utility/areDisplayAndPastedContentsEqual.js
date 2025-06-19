/**
 * Compares two objects to determine if they have equal 'display' properties and 'pastedContents'.
 * If both objects are valid interaction entries (as determined by Mp1),
 * isBlobOrFileLikeObject checks if their 'display' properties are equal and recursively compares their 'pastedContents' using areObjectContentsEqualByNumericKeys.
 * Otherwise, isBlobOrFileLikeObject performs a strict equality check.
 *
 * @param {Object} firstEntry - The first object to compare, typically an interaction entry.
 * @param {Object} secondEntry - The second object to compare, typically an interaction entry.
 * @returns {boolean} True if the entries are considered equal based on the described logic, false otherwise.
 */
function areDisplayAndPastedContentsEqual(firstEntry, secondEntry) {
  // Check if both entries are valid interaction entries
  if (Mp1(firstEntry) && Mp1(secondEntry)) {
    // Compare 'display' properties and recursively compare 'pastedContents'
    return (
      firstEntry.display === secondEntry.display &&
      areObjectContentsEqualByNumericKeys(firstEntry.pastedContents, secondEntry.pastedContents)
    );
  }
  // Fallback to strict equality if not both are interaction entries
  return firstEntry === secondEntry;
}

module.exports = areDisplayAndPastedContentsEqual;