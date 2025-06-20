/**
 * Creates a histogram bucket structure with specified boundaries.
 *
 * @param {number[]} boundaries - An array of numbers representing the bucket boundaries.
 * @returns {Object} An object containing initialized histogram bucket data.
 */
function createHistogramBuckets(boundaries) {
  // Initialize counts array with zeros, one for each boundary
  const counts = boundaries.map(() => 0);
  // Add an extra zero to counts for the overflow bucket
  counts.push(0);

  return {
    buckets: {
      boundaries: boundaries,
      counts: counts
    },
    sum: 0,           // Sum of all values added to the histogram
    count: 0,         // Total number of values added
    hasMinMax: false, // Indicates if min and max have been set
    min: Infinity,    // Minimum value seen so far
    max: -Infinity    // Maximum value seen so far
  };
}

module.exports = createHistogramBuckets;
