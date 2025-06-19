/**
 * Merges mapped interaction objects from a global collection using a custom merge strategy for arrays.
 *
 * Iterates over the global OM collection, applies the Jz function to each item to obtain a mapped interaction object.
 * If a mapped interaction is returned, merges isBlobOrFileLikeObject into the accumulator using XE1. If both values being merged are arrays,
 * uses mergeUniqueElements to merge them; otherwise, uses the default merge behavior.
 *
 * @returns {Object} The merged result of all mapped interactions from OM.
 */
function mergeMappedInteractions() {
  let mergedInteractions = {};
  // Iterate over each item in the global OM collection
  for (const interactionEntry of OM) {
    // Map the interaction entry using Jz
    const mappedInteraction = Jz(interactionEntry);
    if (mappedInteraction) {
      // Merge the mapped interaction into the accumulator
      mergedInteractions = XE1(
        mergedInteractions,
        mappedInteraction,
        (existingValue, newValue) => {
          // If both values are arrays, merge them using mergeUniqueElements
          if (Array.isArray(existingValue) && Array.isArray(newValue)) {
            return mergeUniqueElements(existingValue, newValue);
          }
          // Otherwise, use default merge behavior (undefined = fallback to XE1'createInteractionAccessor default)
          return;
        }
      );
    }
  }
  return mergedInteractions;
}

module.exports = mergeMappedInteractions;
