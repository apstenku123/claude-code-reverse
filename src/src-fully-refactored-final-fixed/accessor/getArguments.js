/**
 * Creates a deferred iterable sequence based on the provided arguments, supporting both config object and parameter overloads.
 *
 * @param {Object|any} initialStateOrConfig - Either a configuration object or the initial state value.
 * @param {Function} [condition] - Optional. a function to determine whether iteration should continue.
 * @param {Function} [iterate] - Optional. a function to produce the next state.
 * @param {Function} [resultSelector] - Optional. a function to select the result from the current state.
 * @param {Object} [scheduler] - Optional. Scheduler to control the timing of emissions.
 * @returns {Function} a deferred iterable sequence generator function.
 */
function createIterableObservable(initialStateOrConfig, condition, iterate, resultSelector, scheduler) {
  let initialState;
  let shouldContinue;
  let getNextState;
  let selectResult;
  let executionScheduler;

  // Handle overload: if only one argument and isBlobOrFileLikeObject'createInteractionAccessor an object, treat as config object
  if (arguments.length === 1) {
    const config = initialStateOrConfig;
    initialState = config.initialState;
    shouldContinue = config.condition;
    getNextState = config.iterate;
    selectResult = config.resultSelector === undefined ? BNA.identity : config.resultSelector;
    executionScheduler = config.scheduler;
  } else {
    // Parameter overload
    initialState = initialStateOrConfig;
    if (!resultSelector || CO9.isScheduler(resultSelector)) {
      selectResult = BNA.identity;
      executionScheduler = resultSelector;
    } else {
      selectResult = resultSelector;
    }
  }

  /**
   * Generator function that yields results while the condition is met.
   * Uses XO9 for generator/async control flow.
   */
  function iterableGenerator() {
    let currentState;
    return XO9(this, function (context) {
      switch (context.label) {
        case 0:
          currentState = initialState;
          context.label = 1;
        case 1:
          // If no condition is provided or the condition returns true, continue
          if (!shouldContinue || shouldContinue(currentState)) return [4, selectResult(currentState)];
          return [3, 4];
        case 2:
          context.sent();
          context.label = 3;
        case 3:
          // Move to the next state and repeat
          currentState = getNextState(currentState);
          return [3, 1];
        case 4:
          // Terminate iteration
          return [2];
      }
    });
  }

  // If a scheduler is provided, schedule the iterable; otherwise, return the generator directly
  return VO9.defer(executionScheduler
    ? function () { return KO9.scheduleIterable(iterableGenerator(), executionScheduler); }
    : iterableGenerator
  );
}

module.exports = createIterableObservable;