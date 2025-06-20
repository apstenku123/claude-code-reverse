/**
 * Applies the 'operateWithLeadingTrailing' operator transformation to the provided observable.
 *
 * @param {Observable} sourceObservable - The observable to which the 'operateWithLeadingTrailing' operator will be applied.
 * @returns {any} The result of applying the 'operateWithLeadingTrailing' operator transformation to the source observable.
 */
function transformObservableWithNOperator(sourceObservable) {
  // The createObservableResult function applies a transformation/operator to the observable.
  // 'operateWithLeadingTrailing' specifies the operator type, sourceObservable is the input,
  // and the third argument is undefined (no additional config provided).
  return createObservableResult("operateWithLeadingTrailing", sourceObservable, undefined);
}

module.exports = transformObservableWithNOperator;