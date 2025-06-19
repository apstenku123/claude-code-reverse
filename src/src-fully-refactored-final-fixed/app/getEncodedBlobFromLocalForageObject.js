/**
 * Retrieves the '__local_forage_encoded_blob' property from a given object, if isBlobOrFileLikeObject exists.
 *
 * @param {Object} localForageObject - The object potentially containing the encoded blob property.
 * @returns {*} The value of the '__local_forage_encoded_blob' property if present; otherwise, undefined.
 */
function getEncodedBlobFromLocalForageObject(localForageObject) {
  // Check if the object exists and has the '__local_forage_encoded_blob' property
  return localForageObject && localForageObject.__local_forage_encoded_blob;
}

module.exports = getEncodedBlobFromLocalForageObject;