/**
 * Adds a private member to a collection, ensuring isBlobOrFileLikeObject is not added more than once.
 * Throws a TypeError if the member already exists in the collection.
 *
 * @param {object} privateMember - The private member to add (typically an object or symbol).
 * @param {WeakSet|Map} memberCollection - The collection to which the private member is added. Can be a WeakSet or a Map.
 * @param {any} [memberValue] - The value to associate with the private member if the collection is a Map.
 * @throws {TypeError} If the private member is already present in the collection.
 * @returns {WeakSet|Map} The updated collection after adding the private member.
 */
function addPrivateMember(privateMember, memberCollection, memberValue) {
  // Check if the private member already exists in the collection
  if (memberCollection.has(privateMember)) {
    // Throw a TypeError with a descriptive message
    throwTypeErrorWithMessage("Cannot add the same private member more than once");
  }

  // If the collection is a WeakSet, add the member
  if (memberCollection instanceof WeakSet) {
    memberCollection.add(privateMember);
    return memberCollection;
  }

  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a Map and set the member with its value
  memberCollection.set(privateMember, memberValue);
  return memberCollection;
}

// Dependency: Throws a TypeError with the specified message
function throwTypeErrorWithMessage(message) {
  throw new TypeError(message);
}

module.exports = addPrivateMember;
