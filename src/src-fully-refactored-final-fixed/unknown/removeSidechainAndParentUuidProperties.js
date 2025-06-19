/**
 * Removes 'isSidechain' and 'parentUuid' properties from each object in the input array.
 *
 * @param {Array<Object>} items - Array of objects, each possibly containing 'isSidechain' and 'parentUuid' properties.
 * @returns {Array<Object>} New array of objects with 'isSidechain' and 'parentUuid' properties removed from each object.
 */
function removeSidechainAndParentUuidProperties(items) {
  return items.map((item) => {
    // Destructure to remove 'isSidechain' and 'parentUuid', collect the rest into 'remainingProperties'
    const { isSidechain, parentUuid, ...remainingProperties } = item;
    return remainingProperties;
  });
}

module.exports = removeSidechainAndParentUuidProperties;