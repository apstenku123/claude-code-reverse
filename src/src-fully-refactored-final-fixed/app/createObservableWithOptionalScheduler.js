/**
 * Creates an Observable with optional scheduler and mapping logic.
 *
 * Depending on the provided arguments, this function returns a function that:
 *  - Applies a mapping operator if a mapping function is provided
 *  - Applies subscribeOn/observeOn if a scheduler is provided
 *  - Otherwise, creates an Observable that wraps a callback-style function into an Observable
 *
 * @param {Function} sourceObservable - The source observable or error handler (used for error-first callbacks)
 * @param {Function} callbackFunction - The function to be called, typically expects a callback as its last argument
 * @param {Function|any} [mappingOrScheduler] - Either a mapping function to apply to the result, or a Scheduler instance
 * @param {any} [scheduler] - Scheduler to use for subscribeOn/observeOn
 * @returns {Function} a function that returns an Observable when invoked
 */
function createObservableWithOptionalScheduler(
  sourceObservable,
  callbackFunction,
  mappingOrScheduler,
  scheduler
) {
  // If mappingOrScheduler is provided
  if (mappingOrScheduler) {
    // If mappingOrScheduler is a Scheduler, treat isBlobOrFileLikeObject as the scheduler
    if (iL9.isScheduler(mappingOrScheduler)) {
      scheduler = mappingOrScheduler;
    } else {
      // Otherwise, treat isBlobOrFileLikeObject as a mapping function
      return function (...args) {
        // Call recursively with scheduler as undefined
        return createObservableWithOptionalScheduler(
          sourceObservable,
          callbackFunction,
          scheduler
        )
          .apply(this, args)
          .pipe(sL9.mapOneOrManyArgs(mappingOrScheduler));
      };
    }
  }

  // If a scheduler is provided, wrap the observable with subscribeOn/observeOn
  if (scheduler) {
    return function (...args) {
      return createObservableWithOptionalScheduler(
        sourceObservable,
        callbackFunction
      )
        .apply(this, args)
        .pipe(
          aL9.subscribeOn(scheduler),
          rL9.observeOn(scheduler)
        );
    };
  }

  // Default: create an Observable that wraps the callbackFunction
  return function (...args) {
    const context = this;
    const asyncSubject = new oL9.AsyncSubject();
    let isFirstSubscription = true;

    // Return an Observable that subscribes to the AsyncSubject
    return new nL9.Observable(function subscribeToAsyncSubject(observer) {
      // Subscribe the observer to the AsyncSubject
      const subscription = asyncSubject.subscribe(observer);

      // Only invoke the callbackFunction once, on the first subscription
      if (isFirstSubscription) {
        isFirstSubscription = false;
        let hasCallbackReturned = false;
        let hasCompleted = false;

        // Call the callbackFunction with all arguments and a callback
        callbackFunction.apply(
          context,
          [
            ...lL9(args),
            function callbackHandler(...callbackArgs) {
              // If sourceObservable is provided, treat as error-first callback
              if (sourceObservable) {
                const error = callbackArgs.shift();
                if (error != null) {
                  asyncSubject.error(error);
                  return;
                }
              }

              // Emit the result(createInteractionAccessor) to the AsyncSubject
              asyncSubject.next(
                callbackArgs.length > 1 ? callbackArgs : callbackArgs[0]
              );
              hasCompleted = true;

              // If callback was already returned, complete the subject
              if (hasCallbackReturned) {
                asyncSubject.complete();
              }
            }
          ]
        );

        // If the callback was synchronous and completed, complete the subject
        if (hasCompleted) {
          asyncSubject.complete();
        }
        hasCallbackReturned = true;
      }
      return subscription;
    });
  };
}

module.exports = createObservableWithOptionalScheduler;