/**
 * Merges a given state object with a default state object, handling special cases.
 *
 * If the provided state is falsy, or matches the default state or a sentinel value,
 * the default state is returned. Otherwise, a new state object is returned that merges
 * the default state, the provided state, and deeply merges their 'promises' properties.
 *
 * @param {object} state - The state object to merge with the default state.
 * @returns {object} - The merged state object, or the default state if special cases apply.
 */
function mergeWithDefaultState(state) {
  // Return default state if input is falsy, or matches default or sentinel
  if (!state || state === jl || state === oU9) {
    return jl;
  }

  // Merge default state, input state, and deeply merge their 'promises' properties
  return {
    ...jl,
    ...state,
    promises: {
      ...jl.promises,
      ...(state.promises || {})
    }
  };
}

module.exports = mergeWithDefaultState;