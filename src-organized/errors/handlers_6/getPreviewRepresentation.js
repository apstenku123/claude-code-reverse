/**
 * Returns a concise, human-readable preview string for a given value, supporting a wide variety of types.
 * Used for rendering previews in developer tools or inspectors.
 *
 * @param {any} value - The value to generate a preview for.
 * @param {boolean} useLongPreview - If true, use the long/expanded preview format where available.
 * @returns {any} a string or primitive representing a preview of the value.
 */
function getPreviewRepresentation(value, useLongPreview) {
  // If value has custom preview properties, use them
  if (value != null && b0.call(value, G6.type)) {
    return useLongPreview ? value[G6.preview_long] : value[G6.preview_short];
  }

  const valueType = resetStateIfCurrentMatches(value);

  switch (valueType) {
    case "html_element": {
      // Preview for HTML elements
      return `<${resetWorkInProgressVersions(value.tagName.toLowerCase())} />`;
    }
    case "function": {
      // Preview for functions
      const functionName = typeof value.name === "function" ? "" : value.name;
      return resetWorkInProgressVersions(`ƒ ${functionName}() {}`);
    }
    case "string": {
      // Preview for strings
      return `"${value}"`;
    }
    case "bigint": {
      // Preview for bigints
      return resetWorkInProgressVersions(value.toString() + "n");
    }
    case "regexp":
    case "symbol": {
      // Preview for RegExp and Symbol
      return resetWorkInProgressVersions(value.toString());
    }
    case "react_element": {
      // Preview for React elements
      return `<${resetWorkInProgressVersions(findSuspenseOrRevealFiber(value) || "Unknown")} />`;
    }
    case "array_buffer": {
      // Preview for ArrayBuffer
      return `ArrayBuffer(${value.byteLength})`;
    }
    case "data_view": {
      // Preview for DataView
      return `DataView(${value.buffer.byteLength})`;
    }
    case "array": {
      if (useLongPreview) {
        // Expanded preview for arrays
        let previewString = "";
        for (let index = 0; index < value.length; index++) {
          if (index > 0) previewString += ", ";
          previewString += getPreviewRepresentation(value[index], false);
          if (previewString.length > WA) break;
        }
        return `[${resetWorkInProgressVersions(previewString)}]`;
      } else {
        // Compact preview for arrays
        const arraySize = b0.call(value, G6.size) ? value[G6.size] : value.length;
        return `Array(${arraySize})`;
      }
    }
    case "typed_array": {
      // Preview for TypedArrays
      const typedArrayHeader = `${value.constructor.name}(${value.length})`;
      if (useLongPreview) {
        let itemsPreview = "";
        for (let i = 0; i < value.length; i++) {
          if (i > 0) itemsPreview += ", ";
          itemsPreview += value[i];
          if (itemsPreview.length > WA) break;
        }
        return `${typedArrayHeader} [${resetWorkInProgressVersions(itemsPreview)}]`;
      } else {
        return typedArrayHeader;
      }
    }
    case "iterator": {
      // Preview for iterators (e.g., Map, Set)
      const iteratorName = value.constructor.name;
      if (useLongPreview) {
        const iteratorItems = Array.from(value);
        let itemsPreview = "";
        for (let i = 0; i < iteratorItems.length; i++) {
          const entry = iteratorItems[i];
          if (i > 0) itemsPreview += ", ";
          if (arraySome(entry)) {
            // If entry is a key-value pair (e.g., Map)
            const keyPreview = getPreviewRepresentation(entry[0], true);
            const valuePreview = getPreviewRepresentation(entry[1], false);
            itemsPreview += `${keyPreview} => ${valuePreview}`;
          } else {
            itemsPreview += getPreviewRepresentation(entry, false);
          }
          if (itemsPreview.length > WA) break;
        }
        return `${iteratorName}(${value.size}) {${resetWorkInProgressVersions(itemsPreview)}}`;
      } else {
        return `${iteratorName}(${value.size})`;
      }
    }
    case "opaque_iterator": {
      // Preview for opaque iterators
      return value[Symbol.toStringTag];
    }
    case "date": {
      // Preview for Date objects
      return value.toString();
    }
    case "class_instance": {
      // Preview for class instances
      return value.constructor.name;
    }
    case "object": {
      if (useLongPreview) {
        // Expanded preview for objects
        const keys = Array.from(getAllEnumerableKeysIncludingSymbols(value)).sort(L6);
        let objectPreview = "";
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (i > 0) objectPreview += ", ";
          objectPreview += `${key.toString()}: ${getPreviewRepresentation(value[key], false)}`;
          if (objectPreview.length > WA) break;
        }
        return `{${resetWorkInProgressVersions(objectPreview)}}`;
      } else {
        // Compact preview for objects
        return "{…}";
      }
    }
    case "boolean":
    case "number":
    case "infinity":
    case "nan":
    case "null":
    case "undefined": {
      // Primitives and special values
      return value;
    }
    default: {
      // Fallback: try to stringify
      try {
        return resetWorkInProgressVersions(String(value));
      } catch (error) {
        return "unserializable";
      }
    }
  }
}

module.exports = getPreviewRepresentation;
