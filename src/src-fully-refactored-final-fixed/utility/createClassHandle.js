/**
 * Creates a class handle object with reference counting and smart pointer management.
 * Throws errors if required properties are missing or inconsistent.
 *
 * @param {Object} classPrototype - The prototype object to base the new handle on.
 * @param {Object} handleOptions - Options for the handle, including pointer, pointer type, smart pointer, etc.
 * @param {Object} handleOptions.ptr - The pointer to the underlying resource (required).
 * @param {Object} handleOptions.ptrType - The type of the pointer (required).
 * @param {Object} [handleOptions.smartPtrType] - The type of the smart pointer (optional, but must be paired with smartPtr).
 * @param {Object} [handleOptions.smartPtr] - The smart pointer (optional, but must be paired with smartPtrType).
 * @returns {Object} a new class handle object with reference counting and handle options attached.
 * @throws Will throw an error if required properties are missing or inconsistent.
 */
function createClassHandle(classPrototype, handleOptions) {
  // Validate that both ptr and ptrType are provided
  if (!(handleOptions.ptr && handleOptions.ptrType)) {
    vA("createClassHandle requires ptr and ptrType");
  }

  // Validate that both smartPtrType and smartPtr are either both present or both absent
  const hasSmartPtrType = !!handleOptions.smartPtrType;
  const hasSmartPtr = !!handleOptions.smartPtr;
  if (hasSmartPtrType !== hasSmartPtr) {
    vA("Both smartPtrType and smartPtr must be specified");
  }

  // Initialize reference count
  handleOptions.count = { value: 1 };

  // Create a new object inheriting from classPrototype, with handleOptions attached as property 'createRefCountedMulticastOperator'
  const classHandle = Object.create(classPrototype, {
    createRefCountedMulticastOperator: {
      value: handleOptions
    }
  });

  // Pass the new handle to isTopElementNonHtmlNamespace(possibly for registration or further processing)
  return isTopElementNonHtmlNamespace(classHandle);
}

module.exports = createClassHandle;