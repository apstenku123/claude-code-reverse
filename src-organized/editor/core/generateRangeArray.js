/**
 * Generates an array of consecutive integers from (start - offset) to (start + offset), inclusive.
 *
 * @param {number} start - The central number of the range.
 * @param {number} offset - The offset to subtract from and add to the start to determine the range bounds.
 * @returns {number[]} An array containing all integers from (start - offset) to (start + offset), inclusive.
 */
function generateRangeArray(start, offset) {
  const rangeArray = [];
  const rangeStart = start - offset;
  const rangeEnd = start + offset;

  // Loop from rangeStart to rangeEnd (inclusive) and push each number into the array
  for (let current = rangeStart; current <= rangeEnd; current++) {
    rangeArray.push(current);
  }

  return rangeArray;
}

module.exports = generateRangeArray;
