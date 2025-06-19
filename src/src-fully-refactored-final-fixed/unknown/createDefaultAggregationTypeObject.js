/**
 * Returns an object with the default aggregation type from bo4.
 *
 * @param {any} sourceObservable - The source observable or input (currently unused).
 * @returns {{ type: string }} An object containing the default aggregation type.
 */
const createDefaultAggregationTypeObject = (sourceObservable) => {
  // Return an object with the default aggregation type from bo4
  return {
    type: bo4.AggregationType.DEFAULT
  };
};

module.exports = createDefaultAggregationTypeObject;
