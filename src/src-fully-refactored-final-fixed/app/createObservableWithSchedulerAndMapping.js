/**
 * Creates an observable function with optional scheduler and mapping logic.
 *
 * Depending on the provided parameters, this function returns a new function that:
 * - Applies a mapping operator to the result if a mapping function is provided.
 * - Schedules the observable on a given scheduler if provided.
 * - Otherwise, wraps a callback-based function into an Observable, handling errors and completion.
 *
 * @param {Function} sourceObservable - The source observable or callback-based function.
 * @param {Function} callbackFunction - The function to be called, typically expects a callback as the last argument.
 * @param {Function|Object} [mappingOrScheduler] - a mapping function to transform the result, or a scheduler object.
 * @param {Object} [scheduler] - Scheduler to control the execution context.
 * @returns {Function} a function that returns an Observable when invoked.
 */
function createObservableWithSchedulerAndMapping(
  sourceObservable,
  callbackFunction,
  mappingOrScheduler,
  scheduler
) {
  // If a mapping or scheduler is provided
  if (mappingOrScheduler) {
    // If the mappingOrScheduler is a scheduler, assign isBlobOrFileLikeObject to scheduler
    if (iL9.isScheduler(mappingOrScheduler)) {
      scheduler = mappingOrScheduler;
    } else {
      // If isBlobOrFileLikeObject'createInteractionAccessor a mapping function, return a function that applies the mapping
      return function (...args) {
        // Recursively create the observable without the mapping function, then apply the mapping operator
        return createObservableWithSchedulerAndMapping(
          sourceObservable,
          callbackFunction,
          scheduler
        )
          .apply(this, args)
          .pipe(sL9.mapOneOrManyArgs(mappingOrScheduler));
      };
    }
  }

  // If a scheduler is provided, return a function that schedules the observable
  if (scheduler) {
    return function (...args) {
      return createObservableWithSchedulerAndMapping(
        sourceObservable,
        callbackFunction
      )
        .apply(this, args)
        .pipe(aL9.subscribeOn(scheduler), rL9.observeOn(scheduler));
    };
  }

  // Default: wrap the callbackFunction into an Observable
  return function (...args) {
    const context = this;
    const asyncSubject = new oL9.AsyncSubject();
    let isFirstSubscription = true;

    // Return a new Observable that subscribes to the AsyncSubject
    return new nL9.Observable(function (subscriber) {
      const subjectSubscription = asyncSubject.subscribe(subscriber);

      // Only execute the callbackFunction once
      if (isFirstSubscription) {
        isFirstSubscription = false;
        let callbackInvoked = false;
        let completedSynchronously = false;

        // Call the callbackFunction with all arguments and a callback
        callbackFunction.apply(
          context,
          [
            ...lL9(args),
            function (...callbackArgs) {
              // If sourceObservable is truthy, treat the first argument as an error
              if (sourceObservable) {
                const error = callbackArgs.shift();
                if (error != null) {
                  asyncSubject.error(error);
                  return;
                }
              }
              // Emit the result(createInteractionAccessor) through the AsyncSubject
              asyncSubject.next(
                callbackArgs.length > 1 ? callbackArgs : callbackArgs[0]
              );
              completedSynchronously = true;
              if (callbackInvoked) asyncSubject.complete();
            }
          ]
        );
        // If the callback was invoked synchronously, complete the subject
        if (completedSynchronously) asyncSubject.complete();
        callbackInvoked = true;
      }
      return subjectSubscription;
    });
  };
}

module.exports = createObservableWithSchedulerAndMapping;