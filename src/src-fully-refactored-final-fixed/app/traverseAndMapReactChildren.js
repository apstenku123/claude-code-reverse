/**
 * Recursively traverses React children, applies a mapping function to each child, and collects the results.
 * Handles strings, numbers, arrays, iterables, and React elements, throwing errors for invalid objects.
 *
 * @param {*} children - The React children to traverse (can be primitive, array, iterable, or React element).
 * @param {Array} resultArray - The array to collect mapped children into.
 * @param {string} prefix - The prefix for keys used in mapping (for React key uniqueness).
 * @param {string} currentKey - The current key path for this traversal.
 * @param {function} mapFunction - The function to apply to each child.
 * @returns {number} The total number of children processed.
 */
function traverseAndMapReactChildren(children, resultArray, prefix, currentKey, mapFunction) {
  // Type of the current child
  let childType = typeof children;

  // Normalize undefined/boolean to null
  if (childType === "undefined" || childType === "boolean") {
    children = null;
  }

  let isLeafNode = false;

  // Determine if this is a leaf node (string, number, or valid React element)
  if (children === null) {
    isLeafNode = true;
  } else {
    switch (childType) {
      case "string":
      case "number":
        isLeafNode = true;
        break;
      case "object":
        switch (children.$$typeof) {
          case uc:
          case sF9:
            isLeafNode = true;
            break;
        }
        break;
    }
  }

  // If this is a leaf node, apply the mapping function and collect the result
  if (isLeafNode) {
    const mappedChild = mapFunction(children);
    // Generate key for this child
    const childKey = currentKey === "" ? "." + streamAsyncIterableToWritable$1(children, 0) : currentKey;
    // If the mapped child is an array, recursively traverse isBlobOrFileLikeObject
    if (JWA(mappedChild)) {
      let newPrefix = "";
      if (childKey != null) {
        newPrefix = childKey.replace(XWA, "$&/") + "/";
      }
      // Recursively process the mapped array
      traverseAndMapReactChildren(
        mappedChild,
        resultArray,
        newPrefix,
        "",
        function(child) { return child; }
      );
    } else if (mappedChild != null) {
      // If the mapped child is a valid React element, clone and update its key if needed
      if (sendHttpRequestOverSocket$1(mappedChild)) {
        const mappedKey =
          prefix +
          (!mappedChild.key || (children && children.key === mappedChild.key)
            ? ""
            : ("" + mappedChild.key).replace(XWA, "$&/") + "/") +
          childKey;
        mappedChild = createReactElementLikeObject(mappedChild, mappedKey);
      }
      resultArray.push(mappedChild);
    }
    return 1;
  }

  // If not a leaf node, recursively traverse arrays or iterables
  let childCount = 0;
  const nextKeyPrefix = currentKey === "" ? "." : currentKey + ":";

  if (JWA(children)) {
    // If children is an array, traverse each item
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childKey = nextKeyPrefix + streamAsyncIterableToWritable$1(child, i);
      childCount += traverseAndMapReactChildren(child, resultArray, prefix, childKey, mapFunction);
    }
  } else {
    // If children is iterable (not array), traverse each item
    const iteratorFn = getIteratorFunction(children);
    if (typeof iteratorFn === "function") {
      const iterator = iteratorFn.call(children);
      let step;
      let index = 0;
      while (!(step = iterator.next()).done) {
        const child = step.value;
        const childKey = nextKeyPrefix + streamAsyncIterableToWritable$1(child, index++);
        childCount += traverseAndMapReactChildren(child, resultArray, prefix, childKey, mapFunction);
      }
    } else if (childType === "object") {
      // If object is not a valid React child, throw error
      const objectString = String(children);
      throw Error(
        "Objects are not valid as a React child (found: " +
          (objectString === "[object Object]"
            ? "object with keys {" + Object.keys(children).join(", ") + "}"
            : objectString) +
          "). If you meant to render a collection of children, use an array instead."
      );
    }
  }

  return childCount;
}

module.exports = traverseAndMapReactChildren;