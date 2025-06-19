/**
 * Adds the 'fetch' operator to the provided observable source.
 *
 * @param {Object} sourceObservable - The observable to which the 'fetch' operator will be attached.
 * @returns {void}
 * @description
 * This function applies the 'fetch' operator to the given observable by calling the external 'processUrlTimingInfo' function.
 * The 'processUrlTimingInfo' function is assumed to handle the logic for attaching or enabling the 'fetch' operator on the observable.
 */
function addFetchOperatorToObservable(sourceObservable) {
  // Attach the 'fetch' operator to the observable using the external utility function
  processUrlTimingInfo(sourceObservable, "fetch");
}

module.exports = addFetchOperatorToObservable;