/**
 * Decodes a FileDescriptorSet from the provided buffer and processes isBlobOrFileLikeObject with the given options.
 *
 * @param {Uint8Array} fileDescriptorBuffer - The buffer containing the encoded FileDescriptorSet.
 * @param {object} processingOptions - Options or configuration to be passed to the processing function.
 * @returns {any} The result of processing the decoded FileDescriptorSet with the provided options.
 */
function decodeFileDescriptorAndProcess(fileDescriptorBuffer, processingOptions) {
  // Decode the FileDescriptorSet from the provided buffer
  const fileDescriptorSet = Ih1.FileDescriptorSet.decode(fileDescriptorBuffer);
  // Process the decoded FileDescriptorSet with the given options
  return b_0(fileDescriptorSet, processingOptions);
}

module.exports = decodeFileDescriptorAndProcess;