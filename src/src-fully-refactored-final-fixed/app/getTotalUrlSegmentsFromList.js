/**
 * Calculates the total number of URL segments across all items in the provided array.
 * Each item is converted to a string and passed to UY.getNumberOfUrlSegments.
 *
 * @param {Array<any>} urlList - An array of items (typically URLs or objects convertible to strings).
 * @returns {number} The total count of URL segments across all items in the array.
 */
function getTotalUrlSegmentsFromList(urlList) {
  return urlList.reduce((totalSegments, item) => {
    // Convert the current item to a string and count its URL segments
    const itemAsString = item.toString();
    const segmentCount = UY.getNumberOfUrlSegments(itemAsString);
    return totalSegments + segmentCount;
  }, 0);
}

module.exports = getTotalUrlSegmentsFromList;