/**
 * Iterates through the effect linked list in the update queue and runs the 'create' function
 * for each effect whose tag matches the provided bitmask. The result of 'create' is stored as 'destroy'.
 *
 * @param {number} effectTagMask - Bitmask to match effect tags against.
 * @param {Object} fiber - The fiber object containing the update queue and effects.
 * @returns {void}
 */
function runEffectsWithTag(effectTagMask, fiber) {
  // Retrieve the update queue from the fiber
  const updateQueue = fiber.updateQueue;
  // Get the last effect in the queue, if any
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    // Start from the first effect in the circular linked list
    let currentEffect = lastEffect.next;
    // Store the starting node to detect when handleMissingDoctypeError'removeTrailingCharacters completed the cycle
    const firstEffect = currentEffect;
    do {
      // If the effect'createInteractionAccessor tag matches the provided mask, run its create function
      if ((currentEffect.tag & effectTagMask) === effectTagMask) {
        const createEffect = currentEffect.create;
        // Store the result of create (usually a cleanup function) as destroy
        currentEffect.destroy = createEffect();
      }
      currentEffect = currentEffect.next;
    } while (currentEffect !== firstEffect);
  }
}

module.exports = runEffectsWithTag;