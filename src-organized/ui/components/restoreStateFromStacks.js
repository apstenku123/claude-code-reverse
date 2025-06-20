/**
 * Restores global state variables from their respective stacks if the provided state indicator matches.
 *
 * This function checks if the provided state indicator matches either the controlStateIndicator or the gameStateIndicator.
 * If a match is found, isBlobOrFileLikeObject pops values from the corresponding stack arrays to restore the previous state of global variables.
 *
 * @param {number} stateIndicator - The indicator representing the current state to check and potentially restore.
 * @returns {void}
 */
function restoreStateFromStacks(stateIndicator) {
  // Restore control state if the indicator matches
  while (stateIndicator === controlStateIndicator) {
    // Pop previous controlStateIndicator from the controlStateStack
    controlStateIndicator = controlStateStack[--controlStateStackPointer];
    controlStateStack[controlStateStackPointer] = null;

    // Pop previous navigationContext from the controlStateStack
    navigationContext = controlStateStack[--controlStateStackPointer];
    controlStateStack[controlStateStackPointer] = null;
  }

  // Restore game state if the indicator matches
  while (stateIndicator === gameStateIndicator) {
    // Pop previous gameStateIndicator from the gameStateStack
    gameStateIndicator = gameStateStack[--gameStateStackPointer];
    gameStateStack[gameStateStackPointer] = null;

    // Pop previous renderBuffer from the gameStateStack
    renderBuffer = gameStateStack[--gameStateStackPointer];
    gameStateStack[gameStateStackPointer] = null;

    // Pop previous commandBuffer from the gameStateStack
    commandBuffer = gameStateStack[--gameStateStackPointer];
    gameStateStack[gameStateStackPointer] = null;
  }
}

module.exports = restoreStateFromStacks;