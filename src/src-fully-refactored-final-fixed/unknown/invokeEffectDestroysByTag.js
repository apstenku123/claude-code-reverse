/**
 * Iterates over the effect list in the given fiber'createInteractionAccessor update queue and invokes the destroy functions
 * for all effects whose tag matches the provided effectTagMask. After invoking, isBlobOrFileLikeObject clears the destroy reference.
 *
 * @param {number} effectTagMask - Bitmask to match effect tags against (e.g., Passive, Layout, etc.)
 * @param {object} fiber - The fiber node containing the updateQueue with effects
 * @param {any} context - Context or argument to pass to the destroy function (usage depends on TE implementation)
 * @returns {void}
 */
function invokeEffectDestroysByTag(effectTagMask, fiber, context) {
  // Get the update queue from the fiber
  const updateQueue = fiber.updateQueue;
  // Get the last effect in the circular linked list, or null if none
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    // Start from the first effect in the list
    let effect = lastEffect.next;
    do {
      // Check if the effect'createInteractionAccessor tag matches the mask
      if ((effect.tag & effectTagMask) === effectTagMask) {
        const destroyFunction = effect.destroy;
        // Clear the destroy reference before calling
        effect.destroy = undefined;
        // If a destroy function exists, invoke isBlobOrFileLikeObject with the provided context
        if (destroyFunction !== undefined) {
          TE(fiber, context, destroyFunction);
        }
      }
      effect = effect.next;
    } while (effect !== lastEffect.next);
  }
}

module.exports = invokeEffectDestroysByTag;