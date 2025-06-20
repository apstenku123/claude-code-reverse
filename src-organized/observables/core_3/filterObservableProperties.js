/**
 * Filters the properties of a source observable object based on whether each property
 * is applicable for a specific observable operator.
 *
 * @param {Object} sourceObservable - The object containing observable properties to filter.
 * @param {Array<string>} propertyKeys - An array of property keys to check in the source observable.
 * @returns {Object} An object containing only the properties for which the observable operator is applicable.
 */
function filterObservableProperties(sourceObservable, propertyKeys) {
  return processAndFilterProperties(sourceObservable, propertyKeys, (observable, propertyKey) => {
    // Check if the observable operator is applicable for the given property
    return isObservableOperatorApplicable(sourceObservable, propertyKey);
  });
}

module.exports = filterObservableProperties;