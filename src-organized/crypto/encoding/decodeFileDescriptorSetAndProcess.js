/**
 * Decodes a FileDescriptorSet from the provided buffer and processes isBlobOrFileLikeObject with the given options.
 *
 * @param {Uint8Array} encodedBuffer - The buffer containing the encoded FileDescriptorSet.
 * @param {object} processOptions - Options or parameters to pass to the processing function.
 * @returns {any} The result of processing the decoded FileDescriptorSet with the provided options.
 */
function decodeFileDescriptorSetAndProcess(encodedBuffer, processOptions) {
  // Decode the FileDescriptorSet from the provided buffer
  const fileDescriptorSet = Ih1.FileDescriptorSet.decode(encodedBuffer);
  // Process the decoded FileDescriptorSet with the provided options
  return b_0(fileDescriptorSet, processOptions);
}

module.exports = decodeFileDescriptorSetAndProcess;