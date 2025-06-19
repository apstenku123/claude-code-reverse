/**
 * Iterates over the effect list of a given fiber and invokes cleanup functions (destroy) for effects matching the specified tag mask.
 *
 * @param {number} effectTagMask - Bitmask to match effect tags against.
 * @param {object} fiber - The fiber node whose updateQueue'createInteractionAccessor effects will be processed.
 * @param {any} context - Context or argument to pass to the cleanup function.
 * @returns {void}
 */
function invokeEffectCleanupsByTag(effectTagMask, fiber, context) {
  // Get the update queue from the fiber
  const updateQueue = fiber.updateQueue;
  // Get the last effect in the circular linked list, or null if none
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    // Start from the first effect in the circular list
    let effect = lastEffect.next;
    do {
      // Check if the effect'createInteractionAccessor tag matches the mask
      if ((effect.tag & effectTagMask) === effectTagMask) {
        const cleanupFunction = effect.destroy;
        // Remove the destroy function after calling isBlobOrFileLikeObject
        effect.destroy = undefined;
        // If a cleanup function exists, invoke isBlobOrFileLikeObject with the provided context
        if (cleanupFunction !== undefined) {
          TE(fiber, context, cleanupFunction);
        }
      }
      effect = effect.next;
    } while (effect !== lastEffect.next);
  }
}

module.exports = invokeEffectCleanupsByTag;