/**
 * Merges a given interaction state object with the default interaction state.
 *
 * If the provided interaction state is null, undefined, or matches either the default state (`jl`)
 * or a special sentinel value (`oU9`), the function returns the default state (`jl`).
 * Otherwise, isBlobOrFileLikeObject returns a new object that merges the default state with the provided state,
 * and deeply merges the `promises` property.
 *
 * @param {Object|null|undefined} interactionState - The interaction state object to merge with the default.
 * @returns {Object} The merged interaction state object.
 */
function mergeWithDefaultInteractionState(interactionState) {
  // Return the default state if input is falsy, or matches the default or sentinel value
  if (!interactionState || interactionState === jl || interactionState === oU9) {
    return jl;
  }

  // Merge the default state with the provided state, deeply merging the 'promises' property
  return {
    ...jl,
    ...interactionState,
    promises: {
      ...jl.promises,
      ...(interactionState.promises || {})
    }
  };
}

module.exports = mergeWithDefaultInteractionState;
