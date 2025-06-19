/**
 * Serializes a JavaScript object into a FormData instance, supporting nested objects, arrays, and special types.
 * Handles circular references, custom value conversion, and visitor logic for fine-grained control.
 *
 * @param {Object} sourceObject - The object to serialize into FormData.
 * @param {FormData} [formDataInstance] - Optional FormData instance to append to. If not provided, a new one is created.
 * @param {Object} [options] - Serialization options and visitor configuration.
 * @returns {FormData} The populated FormData instance.
 * @throws {TypeError} If sourceObject is not an object or visitor is not a function.
 * @throws {Error} If a circular reference is detected.
 */
function serializeObjectToFormData(sourceObject, formDataInstance, options) {
  if (!DA.isObject(sourceObject)) {
    throw new TypeError("target must be an object");
  }

  // Use provided FormData or create a new one
  const FormDataClass = typeof R41 !== "undefined" ? R41 : (typeof FormData !== "undefined" ? FormData : undefined);
  formDataInstance = formDataInstance || new FormDataClass();

  // Flatten options and set sensible defaults
  const flatOptions = DA.toFlatObject(
    options,
    {
      metaTokens: true,
      dots: false,
      indexes: false
    },
    false,
    function filterOptionKeys(key, optionsObject) {
      return !DA.isUndefined(optionsObject[key]);
    }
  );

  const useMetaTokens = flatOptions.metaTokens;
  const visitorFunction = flatOptions.visitor || defaultVisitor;
  const useDots = flatOptions.dots;
  const useIndexes = flatOptions.indexes;
  const supportsBlob = (flatOptions.Blob || (typeof Blob !== "undefined" && Blob)) && DA.isSpecCompliantForm(formDataInstance);

  if (!DA.isFunction(visitorFunction)) {
    throw new TypeError("visitor must be a function");
  }

  /**
   * Converts values to a suitable format for FormData.
   * Handles dates, blobs, array buffers, and typed arrays.
   * @param {*} value - The value to convert.
   * @returns {*} The converted value.
   */
  function convertValueForFormData(value) {
    if (value === null) return "";
    if (DA.isDate(value)) return value.toISOString();
    if (!supportsBlob && DA.isBlob(value)) {
      throw new Y2("Blob is not supported. Use a Buffer instead.");
    }
    if (DA.isArrayBuffer(value) || DA.isTypedArray(value)) {
      return supportsBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }

  /**
   * Default visitor function for traversing and serializing object properties.
   * Handles arrays, objects, and special cases for file lists and blobs.
   * @param {*} value - The value to visit.
   * @param {string} key - The property key.
   * @param {Array<string>} path - The property path.
   * @returns {boolean} Whether to recurse into the value.
   */
  function defaultVisitor(value, key, path) {
    let valueToProcess = value;
    if (value && !path && typeof value === "object") {
      // Handle objects ending with '{}' (serialize as JSON string)
      if (DA.endsWith(key, "{}")) {
        key = useMetaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (
        (DA.isArray(value) && EV9(value)) ||
        ((DA.isFileList(value) || DA.endsWith(key, "[]")) && (valueToProcess = DA.toArray(value)))
      ) {
        // Handle arrays and file lists
        key = removeArraySuffix(key);
        valueToProcess.forEach(function processArrayElement(element, index) {
          if (!(DA.isUndefined(element) || element === null)) {
            formDataInstance.append(
              useIndexes === true ? formatPathSegments([key], index, useDots) :
              useIndexes === null ? key :
              key + "[]",
              convertValueForFormData(element)
            );
          }
        });
        return false;
      }
    }
    if (m$1(value)) return true; // If value is visitable, recurse
    formDataInstance.append(formatPathSegments(path, key, useDots), convertValueForFormData(value));
    return false;
  }

  // Track objects to detect circular references
  const circularReferenceStack = [];
  // Compose context for visitor
  const visitorContext = Object.assign({}, UV9, {
    defaultVisitor,
    convertValue: convertValueForFormData,
    isVisitable: m$1
  });

  /**
   * Recursively traverses the object and applies the visitor function.
   * @param {*} currentValue - The value to traverse.
   * @param {Array<string>} propertyPath - The property path.
   */
  function traverseAndSerialize(currentValue, propertyPath) {
    if (DA.isUndefined(currentValue)) return;
    if (circularReferenceStack.indexOf(currentValue) !== -1) {
      throw Error("Circular reference detected in " + propertyPath.join("."));
    }
    circularReferenceStack.push(currentValue);
    DA.forEach(currentValue, function forEachProperty(propertyValue, propertyKey) {
      // Only process defined and non-null values
      if (
        !(DA.isUndefined(propertyValue) || propertyValue === null) &&
        visitorFunction.call(
          formDataInstance,
          propertyValue,
          DA.isString(propertyKey) ? propertyKey.trim() : propertyKey,
          propertyPath,
          visitorContext
        ) === true
      ) {
        traverseAndSerialize(
          propertyValue,
          propertyPath ? propertyPath.concat(propertyKey) : [propertyKey]
        );
      }
    });
    circularReferenceStack.pop();
  }

  if (!DA.isObject(sourceObject)) {
    throw new TypeError("data must be an object");
  }

  traverseAndSerialize(sourceObject);
  return formDataInstance;
}

module.exports = serializeObjectToFormData;