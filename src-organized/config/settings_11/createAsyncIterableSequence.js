/**
 * Creates an asynchronous iterable sequence based on the provided configuration or parameters.
 * The sequence starts from an initial state, checks a condition before each iteration, applies an iteration function,
 * and projects the result using a result selector. Optionally, a scheduler can be provided to control execution timing.
 *
 * @param {Object|any} initialStateOrConfig - Either a configuration object or the initial state value.
 * @param {Function} [condition] - Predicate function to determine whether to continue iterating.
 * @param {Function} [iterate] - Function to generate the next state from the current state.
 * @param {Function} [resultSelector] - Function to select the result from the current state.
 * @param {Object} [scheduler] - Optional scheduler to control execution timing.
 * @returns {Function} a function that, when invoked, returns an iterable or a scheduled iterable sequence.
 */
function createAsyncIterableSequence(initialStateOrConfig, condition, iterate, resultSelector, scheduler) {
  let initialState;
  let predicate;
  let iterationFn;
  let resultProjector;
  let executionScheduler;

  // Handle overloaded arguments: either a config object or individual parameters
  if (arguments.length === 1) {
    // Destructure config object
    const config = initialStateOrConfig;
    initialState = config.initialState;
    predicate = config.condition;
    iterationFn = config.iterate;
    resultProjector = config.resultSelector === undefined ? BNA.identity : config.resultSelector;
    executionScheduler = config.scheduler;
  } else {
    initialState = initialStateOrConfig;
    // If resultSelector is omitted or the 4th argument is a scheduler, default resultProjector to identity
    if (!resultSelector || CO9.isScheduler(resultSelector)) {
      resultProjector = BNA.identity;
      executionScheduler = resultSelector;
    } else {
      resultProjector = resultSelector;
    }
  }

  /**
   * The core generator function that yields values while the predicate is true.
   */
  function sequenceGenerator() {
    let currentState;
    // XO9 is assumed to be an async generator helper
    return XO9(this, function (context) {
      switch (context.label) {
        case 0:
          currentState = initialState;
          context.label = 1;
        case 1:
          // If no predicate is provided, or predicate returns true, continue
          if (!predicate || predicate(currentState)) {
            context.label = 2;
            return [4, resultProjector(currentState)];
          }
          // Predicate failed, exit
          context.label = 4;
          return [3, 4];
        case 2:
          // Await the result of resultProjector
          context.sent();
          context.label = 3;
        case 3:
          // Move to next state and repeat
          currentState = iterationFn(currentState);
          return [3, 1];
        case 4:
          // Sequence complete
          return [2];
      }
    });
  }

  // If a scheduler is provided, defer execution and schedule the iterable
  return VO9.defer(
    executionScheduler
      ? function () {
          return KO9.scheduleIterable(sequenceGenerator(), executionScheduler);
        }
      : sequenceGenerator
  );
}

module.exports = createAsyncIterableSequence;