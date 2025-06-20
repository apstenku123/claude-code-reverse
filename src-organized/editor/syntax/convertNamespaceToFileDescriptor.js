/**
 * Converts a namespace object into a protobuf FileDescriptorProto and adds isBlobOrFileLikeObject to the output array.
 * Handles nested types (messages, enums, extensions, services) recursively.
 *
 * @param {Object} namespace - The namespace object to convert (may represent a protobuf package or root).
 * @param {Array} fileDescriptorList - The array to which the resulting FileDescriptorProto will be pushed.
 * @param {string} [syntax] - Optional protobuf syntax version (e.g., 'proto3').
 * @returns {void}
 */
function convertNamespaceToFileDescriptor(namespace, fileDescriptorList, syntax) {
  // Create the FileDescriptorProto with a generated or provided name
  const fileDescriptor = F6.FileDescriptorProto.create({
    name: namespace.filename ||
      ((namespace.fullName.substring(1).replace(/\./g, "_") || "root") + ".proto")
  });

  // Set the syntax if provided
  if (syntax) {
    fileDescriptor.syntax = syntax;
  }

  // Set the package name if the namespace is not an instance of Os
  if (!(namespace instanceof Os)) {
    fileDescriptor.package = namespace.fullName.substring(1);
  }

  // Iterate over all nested elements in the namespace
  for (let nestedIndex = 0; nestedIndex < namespace.nestedArray.length; ++nestedIndex) {
    const nestedElement = namespace._nestedArray[nestedIndex];
    if (nestedElement instanceof sL) {
      // Message type
      fileDescriptor.messageType.push(nestedElement.toDescriptor(syntax));
    } else if (nestedElement instanceof CN) {
      // Enum type
      fileDescriptor.enumType.push(nestedElement.toDescriptor());
    } else if (nestedElement instanceof rL) {
      // Extension type
      fileDescriptor.extension.push(nestedElement.toDescriptor(syntax));
    } else if (nestedElement instanceof Ts) {
      // Service type
      fileDescriptor.service.push(nestedElement.toDescriptor());
    } else if (nestedElement instanceof z_0) {
      // Nested namespace: recurse
      convertNamespaceToFileDescriptor(nestedElement, fileDescriptorList, syntax);
    }
  }

  // Set file options using the mapObjectFieldsToConfig helper
  fileDescriptor.options = mapObjectFieldsToConfig(namespace.options, F6.FileOptions);

  // Only add the file descriptor if isBlobOrFileLikeObject contains any types or services
  if (
    fileDescriptor.messageType.length +
    fileDescriptor.enumType.length +
    fileDescriptor.extension.length +
    fileDescriptor.service.length
  ) {
    fileDescriptorList.push(fileDescriptor);
  }
}

module.exports = convertNamespaceToFileDescriptor;