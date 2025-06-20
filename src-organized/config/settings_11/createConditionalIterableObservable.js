/**
 * Creates an Observable that emits values by iteratively applying a resultSelector to an initial state,
 * while a condition holds, optionally using a scheduler. This is similar to a generator-based observable.
 *
 * @param {Object|any} initialStateOrConfig - Either an object with configuration properties, or the initial state value.
 * @param {Function} [condition] - a function that takes the current state and returns a boolean indicating whether iteration should continue.
 * @param {Function} [iterate] - a function that takes the current state and returns the next state.
 * @param {Function} [resultSelector] - a function that takes the current state and returns the value to emit. Defaults to identity.
 * @param {Object} [scheduler] - Optional scheduler to control the timing of emissions.
 * @returns {Observable} An Observable that emits the results of applying resultSelector to each state, as long as condition returns true.
 */
function createConditionalIterableObservable(initialStateOrConfig, condition, iterate, resultSelector, scheduler) {
  let initialState;
  let conditionFn;
  let iterateFn;
  let resultSelectorFn;
  let schedulerInstance;

  // Handle overloaded arguments: either a config object or positional arguments
  if (arguments.length === 1) {
    // Destructure config object
    const config = initialStateOrConfig;
    initialState = config.initialState;
    conditionFn = config.condition;
    iterateFn = config.iterate;
    resultSelectorFn = config.resultSelector === undefined ? BNA.identity : config.resultSelector;
    schedulerInstance = config.scheduler;
  } else {
    initialState = initialStateOrConfig;
    // If resultSelector is omitted or the 4th argument is a scheduler, use identity as resultSelector
    if (!resultSelector || CO9.isScheduler(resultSelector)) {
      resultSelectorFn = BNA.identity;
      schedulerInstance = resultSelector;
    } else {
      resultSelectorFn = resultSelector;
      schedulerInstance = scheduler;
    }
    conditionFn = condition;
    iterateFn = iterate;
  }

  /**
   * Generator function that yields values while conditionFn holds.
   * Used as the iterable for the Observable.
   */
  function generatorFunction() {
    let state = initialState;
    return XO9(this, function (context) {
      switch (context.label) {
        case 0:
          context.label = 1;
          // fallthrough
        case 1:
          // If no condition function is provided, or conditionFn(state) is true, continue
          if (!conditionFn || conditionFn(state)) {
            // Yield the resultSelectorFn applied to the current state
            return [4, resultSelectorFn(state)];
          }
          // Condition is false, exit
          return [3, 4];
        case 2:
          // After yielding, move to next state
          context.sent();
          context.label = 3;
          // fallthrough
        case 3:
          state = iterateFn(state);
          // Loop back to check condition again
          return [3, 1];
        case 4:
          // Done
          return [2];
      }
    });
  }

  // If a scheduler is provided, defer and schedule the iterable; otherwise, just defer the generator function
  return VO9.defer(schedulerInstance
    ? function () {
        return KO9.scheduleIterable(generatorFunction(), schedulerInstance);
      }
    : generatorFunction
  );
}

module.exports = createConditionalIterableObservable;