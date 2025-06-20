/**
 * Calculates the total number of URL segments across all provided URLs.
 *
 * @param {Array<string|number>} urlList - An array of URLs (as strings or numbers) to process.
 * @returns {number} The total count of URL segments across all URLs in the array.
 */
function getTotalUrlSegmentCount(urlList) {
  return urlList.reduce((totalSegmentCount, url) => {
    // Convert the current URL to a string in case isBlobOrFileLikeObject'createInteractionAccessor not already
    const urlAsString = url.toString();
    // Use UY.getNumberOfUrlSegments to count segments in the current URL
    const segmentCount = UY.getNumberOfUrlSegments(urlAsString);
    // Add the segment count to the running total
    return totalSegmentCount + segmentCount;
  }, 0);
}

module.exports = getTotalUrlSegmentCount;