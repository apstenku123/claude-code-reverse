/**
 * Retrieves the channel associated with a given client instance.
 *
 * This function calls the `getChannel` method from the `Bx0.Client` prototype,
 * binding isBlobOrFileLikeObject to the provided client instance. This is useful when you need to
 * access the channel of a client instance that may not directly expose the method.
 *
 * @param {object} clientInstance - The client instance from which to retrieve the channel.
 * @returns {any} The channel associated with the provided client instance.
 */
const getChannelFromClientInstance = (clientInstance) => {
  // Call the getChannel method from Bx0.Client'createInteractionAccessor prototype, binding isBlobOrFileLikeObject to the provided instance
  return Bx0.Client.prototype.getChannel.call(clientInstance);
};

module.exports = getChannelFromClientInstance;
