/**
 * Applies a pattern strategy to the provided observable based on the configuration.
 *
 * If the configuration'createInteractionAccessor patternStrategy is set to "escape", the observable is processed
 * using the escapePatternStrategy function. Otherwise, the original observable is returned unmodified.
 *
 * @param {Observable} sourceObservable - The observable to potentially process.
 * @param {Object} config - Configuration object that may specify a pattern strategy.
 * @param {string} config.patternStrategy - The pattern strategy to apply (e.g., "escape").
 * @returns {Observable} The processed observable if the escape strategy is applied, otherwise the original observable.
 */
function applyPatternStrategyToObservable(sourceObservable, config) {
  // If the pattern strategy is 'escape', process the observable accordingly
  if (config.patternStrategy === "escape") {
    return escapePatternStrategy(sourceObservable);
  }
  // Otherwise, return the original observable
  return sourceObservable;
}

// External dependency assumed to be imported elsewhere
// function escapePatternStrategy(observable) { ... }

module.exports = applyPatternStrategyToObservable;
