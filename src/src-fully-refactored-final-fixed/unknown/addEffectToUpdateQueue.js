/**
 * Adds a new effect node to the global update queue, maintaining a circular linked list.
 *
 * @param {string} effectTag - a string representing the type or tag of the effect.
 * @param {Function} createEffect - The function to create or initialize the effect.
 * @param {Function} destroyEffect - The function to clean up or destroy the effect.
 * @param {Array} dependencies - An array of dependencies for the effect.
 * @returns {Object} The newly created effect node, now linked into the update queue.
 */
function addEffectToUpdateQueue(effectTag, createEffect, destroyEffect, dependencies) {
  // Create a new effect node
  const effectNode = {
    tag: effectTag,
    create: createEffect,
    destroy: destroyEffect,
    deps: dependencies,
    next: null
  };

  // Get the global update queue object
  let updateQueue = w9.updateQueue;

  if (updateQueue === null) {
    // If the update queue does not exist, initialize isBlobOrFileLikeObject
    updateQueue = {
      lastEffect: null,
      stores: null
    };
    w9.updateQueue = updateQueue;
    // Make the new effect node point to itself (circular list)
    updateQueue.lastEffect = effectNode.next = effectNode;
  } else {
    const lastEffectNode = updateQueue.lastEffect;
    if (lastEffectNode === null) {
      // If there are no effects yet, start the circular list
      updateQueue.lastEffect = effectNode.next = effectNode;
    } else {
      // Insert the new effect node after the last effect node
      const firstEffectNode = lastEffectNode.next;
      lastEffectNode.next = effectNode;
      effectNode.next = firstEffectNode;
      updateQueue.lastEffect = effectNode;
    }
  }

  return effectNode;
}

module.exports = addEffectToUpdateQueue;