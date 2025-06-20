/**
 * Generates FileDescriptorProto objects from a given source namespace and appends them to the provided array.
 * Traverses nested elements (messages, enums, extensions, services, and nested namespaces) recursively.
 *
 * @param {Object} namespace - The root namespace or object to process. Should have properties like filename, fullName, nestedArray, and options.
 * @param {Array} descriptorList - The array to which generated FileDescriptorProto objects will be pushed.
 * @param {string} [syntax] - Optional syntax string (e.g., 'proto3') to set on the descriptor.
 * @returns {void}
 */
function generateFileDescriptorProtos(namespace, descriptorList, syntax) {
  // Create a new FileDescriptorProto with a generated name
  const fileDescriptor = F6.FileDescriptorProto.create({
    name: namespace.filename || (namespace.fullName.substring(1).replace(/\./g, "_") || "root") + ".proto"
  });

  // Set syntax if provided
  if (syntax) {
    fileDescriptor.syntax = syntax;
  }

  // Set package name if namespace is not an instance of Os
  if (!(namespace instanceof Os)) {
    fileDescriptor.package = namespace.fullName.substring(1);
  }

  // Traverse all nested elements in the namespace
  for (let i = 0; i < namespace.nestedArray.length; ++i) {
    const nestedElement = namespace._nestedArray[i];
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
      generateFileDescriptorProtos(nestedElement, descriptorList, syntax);
    }
  }

  // Set file options if available
  fileDescriptor.options = mapObjectFieldsToConfig(namespace.options, F6.FileOptions);

  // Only add the descriptor if isBlobOrFileLikeObject contains at least one definition
  if (
    fileDescriptor.messageType.length +
    fileDescriptor.enumType.length +
    fileDescriptor.extension.length +
    fileDescriptor.service.length
  ) {
    descriptorList.push(fileDescriptor);
  }
}

module.exports = generateFileDescriptorProtos;