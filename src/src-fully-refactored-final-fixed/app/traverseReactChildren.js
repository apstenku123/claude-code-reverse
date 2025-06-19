/**
 * Traverses all children in a React tree, applying a callback to each child and accumulating results.
 * Handles strings, numbers, arrays, iterables, and React elements, throwing for invalid objects.
 *
 * @param {*} children - The children to traverse (can be any type: primitive, array, iterable, or React element)
 * @param {Array} resultArray - The array to accumulate the results into
 * @param {string} currentKeyPrefix - The current key path prefix for uniquely identifying children
 * @param {string} currentKey - The current key for this traversal level
 * @param {function} callback - Function to apply to each child
 * @returns {number} The number of children processed
 */
function traverseReactChildren(children, resultArray, currentKeyPrefix, currentKey, callback) {
  // Determine the type of the current children
  let childrenType = typeof children;

  // If children is undefined or boolean, treat as null
  if (childrenType === "undefined" || childrenType === "boolean") {
    children = null;
  }

  let isLeafNode = false;

  // Determine if this is a leaf node (string, number, null, or React element)
  if (children === null) {
    isLeafNode = true;
  } else {
    switch (childrenType) {
      case "string":
      case "number":
        isLeafNode = true;
        break;
      case "object":
        switch (children && children.$$typeof) {
          case uc:
          case sF9:
            isLeafNode = true;
            break;
        }
        break;
    }
  }

  // Handle leaf nodes
  if (isLeafNode) {
    const processedChild = callback(children);
    // Generate a key for this child
    const key = currentKey === "" ? "." + streamAsyncIterableToWritable$1(children, 0) : currentKey;
    // If the processed child is an array, recursively traverse isBlobOrFileLikeObject
    if (JWA(processedChild)) {
      let keyPrefix = "";
      if (key != null) {
        keyPrefix = key.replace(XWA, "$&/") + "/";
      }
      // Recursively traverse the array
      traverseReactChildren(
        processedChild,
        resultArray,
        keyPrefix,
        "",
        function(child) { return child; }
      );
    } else if (processedChild != null) {
      // If the processed child is a valid React element, clone isBlobOrFileLikeObject with a new key if necessary
      if (sendHttpRequestOverSocket$1(processedChild)) {
        const newKey = currentKeyPrefix + (
          !processedChild.key || (children && children.key === processedChild.key)
            ? ""
            : ("" + processedChild.key).replace(XWA, "$&/") + "/"
        ) + key;
        resultArray.push(createReactElementLikeObject(processedChild, newKey));
      } else {
        resultArray.push(processedChild);
      }
    }
    return 1;
  }

  // Not a leaf node: handle arrays and iterables
  let childCount = 0;
  const nextKey = currentKey === "" ? "." : currentKey + ":";

  // If children is an array, traverse each element
  if (JWA(children)) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childKey = nextKey + streamAsyncIterableToWritable$1(child, i);
      childCount += traverseReactChildren(child, resultArray, currentKeyPrefix, childKey, callback);
    }
  } else {
    // If children is iterable (but not array), traverse each value
    const iteratorFn = getIteratorFunction(children);
    if (typeof iteratorFn === "function") {
      const iterator = iteratorFn.call(children);
      let step;
      let index = 0;
      while (!(step = iterator.next()).done) {
        const child = step.value;
        const childKey = nextKey + streamAsyncIterableToWritable$1(child, index++);
        childCount += traverseReactChildren(child, resultArray, currentKeyPrefix, childKey, callback);
      }
    } else if (childrenType === "object") {
      // Invalid object type for React children
      const childrenString = String(children);
      throw Error(
        "Objects are not valid as a React child (found: " +
        (childrenString === "[object Object]"
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : childrenString) +
        "). If you meant to render a collection of children, use an array instead."
      );
    }
  }
  return childCount;
}

module.exports = traverseReactChildren;