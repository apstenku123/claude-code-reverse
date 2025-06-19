/**
 * Returns an object representing the default aggregation type.
 *
 * @param {any} sourceObservable - The source observable or input (currently unused).
 * @returns {{ type: string }} An object with the default aggregation type.
 */
const createDefaultAggregationType = (sourceObservable) => {
  // Return the default aggregation type from the bo4 module
  return {
    type: bo4.AggregationType.DEFAULT
  };
};

module.exports = createDefaultAggregationType;
