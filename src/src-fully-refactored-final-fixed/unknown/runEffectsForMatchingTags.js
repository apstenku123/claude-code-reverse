/**
 * Iterates over the effect linked list in the update queue and runs the create function
 * for each effect whose tag matches the provided bitmask. The result of the create function
 * is stored as the destroy function for cleanup.
 *
 * @param {number} effectTagMask - Bitmask to match effect tags against.
 * @param {Object} fiberNode - The fiber node containing the updateQueue with effects.
 * @returns {void}
 */
function runEffectsForMatchingTags(effectTagMask, fiberNode) {
  // Retrieve the update queue from the fiber node
  const updateQueue = fiberNode.updateQueue;
  // Get the last effect in the circular linked list, or null if none
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    // Start from the first effect in the circular list
    let currentEffect = lastEffect.next;
    // Remember the starting effect to know when handleMissingDoctypeError'removeTrailingCharacters looped back
    const firstEffect = currentEffect;
    do {
      // If the effect'createInteractionAccessor tag matches the provided bitmask, run its create function
      if ((currentEffect.tag & effectTagMask) === effectTagMask) {
        const createArcadeHighlightConfig = currentEffect.create;
        // Store the result of create as destroy for later cleanup
        currentEffect.destroy = createArcadeHighlightConfig();
      }
      // Move to the next effect in the list
      currentEffect = currentEffect.next;
    } while (currentEffect !== firstEffect);
  }
}

module.exports = runEffectsForMatchingTags;