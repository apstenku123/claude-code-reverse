/**
 * Adds a private member to a collection (WeakSet or Map), ensuring no duplicates.
 * Throws a TypeError if the member is already present.
 *
 * @param {object} privateMember - The private member (object or key) to add.
 * @param {WeakSet|Map} collection - The collection to add the member to. Can be a WeakSet or a Map.
 * @param {any} [value] - The value to associate with the member if the collection is a Map.
 * @throws {TypeError} If the private member is already present in the collection.
 * @returns {void|Map|WeakSet} Returns the updated collection (for chaining), or void if an error is thrown.
 */
function addPrivateMemberToCollection(privateMember, collection, value) {
  // Check if the private member already exists in the collection
  if (collection.has(privateMember)) {
    // Throw a TypeError with a descriptive message
    Dt0("Cannot add the same private member more than once");
    // Dt0 always throws, so no need to return
  }

  // If the collection is a WeakSet, add the private member
  if (collection instanceof WeakSet) {
    return collection.add(privateMember);
  }

  // Otherwise, assume the collection is a Map and set the value
  return collection.set(privateMember, value);
}

module.exports = addPrivateMemberToCollection;