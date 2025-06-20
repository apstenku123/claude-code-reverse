/**
 * Creates an iterable sequence based on the provided configuration or parameters.
 * Supports both configuration object and parameter overloads. Optionally schedules the iteration.
 *
 * @param {Object|any} configOrInitialState - Either a configuration object or the initial state value.
 *   If an object, isBlobOrFileLikeObject may contain: initialState, condition, iterate, resultSelector, scheduler.
 * @param {Function} [condition] - Function to determine whether to continue iterating (if not using config object).
 * @param {Function} [iterate] - Function to produce the next state (if not using config object).
 * @param {Function} [resultSelector] - Function to select the result from the current state (if not using config object).
 * @param {Object} [scheduler] - Optional scheduler to control iteration timing (if not using config object).
 * @returns {Function} a function that, when invoked, returns an iterable sequence according to the configuration.
 */
function createIterableSequence(configOrInitialState, condition, iterate, resultSelector, scheduler) {
  let initialState;
  let shouldContinue;
  let getNextState;
  let selectResult;
  let sequenceScheduler;

  // Overload: if only one argument and isBlobOrFileLikeObject'createInteractionAccessor an object, extract properties
  if (arguments.length === 1) {
    const config = configOrInitialState;
    initialState = config.initialState;
    shouldContinue = config.condition;
    getNextState = config.iterate;
    selectResult = config.resultSelector === undefined ? BNA.identity : config.resultSelector;
    sequenceScheduler = config.scheduler;
  } else {
    // Parameter overload
    initialState = configOrInitialState;
    // If resultSelector is omitted or a scheduler is passed in its place
    if (!resultSelector || CO9.isScheduler(resultSelector)) {
      selectResult = BNA.identity;
      sequenceScheduler = resultSelector;
    } else {
      selectResult = resultSelector;
    }
    shouldContinue = condition;
    getNextState = iterate;
  }

  /**
   * Generator function that yields values as long as the condition is met.
   */
  function iterableGenerator() {
    let currentState;
    // XO9 is assumed to be a helper for generator/async iteration
    return XO9(this, function (context) {
      switch (context.label) {
        case 0:
          currentState = initialState;
          context.label = 1;
        case 1:
          // If no condition function is provided, or condition returns true, continue
          if (!shouldContinue || shouldContinue(currentState)) {
            context.label = 2;
            return [4, selectResult(currentState)];
          }
          context.label = 4;
          return [3, 4];
        case 2:
          // Yielded value is handled by X.sent()
          context.sent();
          context.label = 3;
        case 3:
          // Move to next state and repeat
          currentState = getNextState(currentState);
          return [3, 1];
        case 4:
          // Iteration complete
          return [2];
      }
    });
  }

  // If a scheduler is provided, defer execution and schedule the iterable
  return VO9.defer(sequenceScheduler
    ? function () { return KO9.scheduleIterable(iterableGenerator(), sequenceScheduler); }
    : iterableGenerator
  );
}

module.exports = createIterableSequence;