/**
 * Creates an observable that emits values by iterating over a state, 
 * applying a condition, an iteration function, and a result selector, 
 * optionally using a scheduler.
 *
 * @param {Object|any} initialStateOrConfig - Either the initial state value or a configuration object.
 * @param {Function} [condition] - Function to determine whether to continue emitting values.
 * @param {Function} [iterate] - Function to produce the next state.
 * @param {Function} [resultSelector] - Function to select the result to emit from the current state.
 * @param {Object} [scheduler] - Optional scheduler to control the emission timing.
 * @returns {Observable} An observable that emits values as defined by the iteration logic.
 */
function createIterableObservable(initialStateOrConfig, condition, iterate, resultSelector, scheduler) {
  let initialState;
  let conditionFn;
  let iterateFn;
  let resultSelectorFn;
  let schedulerInstance;

  // Handle overloaded arguments: either a config object or individual arguments
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
    // If resultSelector is omitted or is a scheduler, use identity as resultSelector
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
   * Generator function that yields values as long as the condition is met.
   */
  function iteratorGenerator() {
    let state = initialState;
    return XO9(this, function (context) {
      switch (context.label) {
        case 0:
          context.label = 1;
          break;
        case 1:
          // If no condition function or condition passes, emit value
          if (!conditionFn || conditionFn(state)) {
            context.label = 2;
            return [4, resultSelectorFn(state)];
          }
          // Condition failed, complete
          context.label = 4;
          break;
        case 2:
          context.sent();
          context.label = 3;
          break;
        case 3:
          // Move to next state and repeat
          state = iterateFn(state);
          context.label = 1;
          break;
        case 4:
          // Complete the generator
          return [2];
      }
    });
  }

  // If a scheduler is provided, schedule the iterable, otherwise return the generator directly
  return VO9.defer(schedulerInstance
    ? function () { return KO9.scheduleIterable(iteratorGenerator(), schedulerInstance); }
    : iteratorGenerator
  );
}

module.exports = createIterableObservable;