/**
 * React hook that triggers a side effect when the provided observable changes,
 * unless the skipEffect flag is set to true.
 *
 * @param {any} observable - The observable or dependency to watch for changes.
 * @param {boolean} [skipEffect=false] - If true, the side effect is skipped.
 * @returns {void}
 */
function useEffectOnObservableChange(observable, skipEffect = false) {
  // Import React'createInteractionAccessor useEffect from the gN2 module
  gN2.useEffect(() => {
    // Only trigger the side effect if skipEffect is false
    if (!skipEffect) {
      Y71(observable);
    }
  }, [observable, skipEffect]);
}

module.exports = useEffectOnObservableChange;