/**
 * Parses a Protocol Buffer schema definition from a source string or token stream, building a namespace tree and extracting package, imports, syntax, and other schema information.
 *
 * @param {string|object} source - The source string or token stream representing the proto schema.
 * @param {object} [rootNamespace] - The root namespace object to build upon. If not provided, a new one is created.
 * @param {object} [options] - Optional parsing options (e.g., preferTrailingComment, keepCase, alternateCommentMode).
 * @returns {object} An object containing the package name, imports, weakImports, syntax, and the root namespace.
 */
function parseProtoSchema(source, rootNamespace, options) {
  // If rootNamespace is not an instance of D_0, shift arguments
  if (!(rootNamespace instanceof D_0)) {
    options = rootNamespace;
    rootNamespace = new D_0();
  }
  if (!options) options = parseProtoSchema.defaults;

  const preferTrailingComment = options.preferTrailingComment || false;
  const tokenStream = R86(source, options.alternateCommentMode || false);
  const nextToken = tokenStream.next;
  const pushToken = tokenStream.push;
  const peekToken = tokenStream.peek;
  const skipToken = tokenStream.skip;
  const getComment = tokenStream.cmnt;

  let allowPackageImportSyntax = true;
  let packageName = undefined;
  let importList = undefined;
  let weakImportList = undefined;
  let syntaxVersion = undefined;
  let isProto3 = false;
  let currentNamespace = rootNamespace;

  // Case conversion function
  const convertCase = options.keepCase ? (str) => str : tg1.camelCase;

  /**
   * Throws an error for illegal tokens.
   * @param {string} token - The illegal token.
   * @param {string} [tokenType] - The type of token.
   * @param {boolean} [preserveFilename] - Whether to preserve the filename.
   */
  function throwIllegalToken(token, tokenType, preserveFilename) {
    const filename = parseProtoSchema.filename;
    if (!preserveFilename) parseProtoSchema.filename = null;
    throw Error(
      `illegal ${tokenType || 'token'} '${token}' (${filename ? filename + ', ' : ''}line ${tokenStream.line})`
    );
  }

  /**
   * Parses a quoted string (handles both single and double quotes).
   * @returns {string}
   */
  function parseQuotedString() {
    const stringParts = [];
    let quoteType;
    do {
      quoteType = nextToken();
      if (quoteType !== '"' && quoteType !== "'") throw throwIllegalToken(quoteType);
      stringParts.push(nextToken());
      skipToken(quoteType);
      quoteType = peekToken();
    } while (quoteType === '"' || quoteType === "'");
    return stringParts.join("");
  }

  /**
   * Parses a value token (string, boolean, or number).
   * @param {boolean} [allowString] - Whether to allow string values.
   * @returns {*}
   */
  function parseValueToken(allowString) {
    let token = nextToken();
    switch (token) {
      case "'":
      case '"':
        pushToken(token);
        return parseQuotedString();
      case 'true':
      case 'TRUE':
        return true;
      case 'false':
      case 'FALSE':
        return false;
    }
    try {
      return parseEncodedDataWithMetadata(token, true);
    } catch (err) {
      if (allowString && oz.test(token)) return token;
      throw throwIllegalToken(token, 'value');
    }
  }

  /**
   * Parses an extensions or reserved list.
   * @param {object[]} targetList - The array to push parsed values into.
   * @param {boolean} [allowString] - Whether to allow string values.
   */
  function parseExtensionsOrReserved(targetList, allowString) {
    let token, rangeStart;
    do {
      if (allowString && ((token = peekToken()) === '"' || token === "'")) {
        targetList.push(parseQuotedString());
      } else {
        rangeStart = parseIdString(nextToken());
        if (skipToken('to', true)) {
          targetList.push([rangeStart, parseIdString(nextToken())]);
        } else {
          targetList.push([rangeStart, rangeStart]);
        }
      }
    } while (skipToken(',', true));

    // Parse options for extensions/reserved
    const optionHolder = { options: undefined };
    optionHolder.setOption = function (key, value) {
      if (this.options === undefined) this.options = {};
      this.options[key] = value;
    };
    parseBlock(optionHolder, function parseOptionOrEnd(token) {
      if (token === 'option') {
        parseOption(optionHolder, token);
        skipToken(';');
      } else {
        throw throwIllegalToken(token);
      }
    }, function finalize() {
      parseFieldOptions(optionHolder);
    });
  }

  /**
   * Parses a number token, supporting decimal, hex, octal, inf, nan.
   * @param {string} token - The token to parse.
   * @param {boolean} [throwOnError] - Whether to throw on error.
   * @returns {number}
   */
  function parseEncodedDataWithMetadata(token, throwOnError) {
    let sign = 1;
    if (token.charAt(0) === '-') {
      sign = -1;
      token = token.substring(1);
    }
    switch (token) {
      case 'inf':
      case 'INF':
      case 'Inf':
        return sign * Infinity;
      case 'nan':
      case 'NAN':
      case 'Nan':
      case 'NaN':
        return NaN;
      case '0':
        return 0;
    }
    if (_86.test(token)) return sign * parseInt(token, 10);
    if (k86.test(token)) return sign * parseInt(token, 16);
    if (x86.test(token)) return sign * parseInt(token, 8);
    if (v86.test(token)) return sign * parseFloat(token);
    throw throwIllegalToken(token, 'number', throwOnError);
  }

  /**
   * Parses an identifier string as a number, supporting decimal, hex, octal, and 'max'.
   * @param {string} token - The token to parse.
   * @param {boolean} [allowNegative] - Whether to allow negative values.
   * @returns {number}
   */
  function parseIdString(token, allowNegative) {
    switch (token) {
      case 'max':
      case 'MAX':
      case 'Max':
        return 536870911;
      case '0':
        return 0;
    }
    if (!allowNegative && token.charAt(0) === '-') throw throwIllegalToken(token, 'id');
    if (j86.test(token)) return parseInt(token, 10);
    if (y86.test(token)) return parseInt(token, 16);
    if (f86.test(token)) return parseInt(token, 8);
    throw throwIllegalToken(token, 'id');
  }

  /**
   * Handles 'package' declaration.
   */
  function parsePackage() {
    if (packageName !== undefined) throw throwIllegalToken('package');
    packageName = nextToken();
    if (!oz.test(packageName)) throw throwIllegalToken(packageName, 'name');
    currentNamespace = currentNamespace.define(packageName);
    skipToken(';');
  }

  /**
   * Handles 'import' and 'weak'/'public' imports.
   */
  function parseImport() {
    let importType = peekToken();
    let importArray;
    switch (importType) {
      case 'weak':
        importArray = weakImportList || (weakImportList = []);
        nextToken();
        break;
      case 'public':
        nextToken();
        // fallthrough to default
      default:
        importArray = importList || (importList = []);
        break;
    }
    const importPath = parseQuotedString();
    skipToken(';');
    importArray.push(importPath);
  }

  /**
   * Handles 'syntax' declaration.
   */
  function parseSyntax() {
    skipToken('=');
    syntaxVersion = parseQuotedString();
    isProto3 = syntaxVersion === 'proto3';
    if (!isProto3 && syntaxVersion !== 'proto2') throw throwIllegalToken(syntaxVersion, 'syntax');
    rootNamespace.setOption('syntax', syntaxVersion);
    skipToken(';');
  }

  /**
   * Handles top-level keywords and delegates to the appropriate parser.
   * @param {object} namespace - The current namespace object.
   * @param {string} keyword - The keyword to handle.
   * @returns {boolean} True if handled, false otherwise.
   */
  function handleTopLevelKeyword(namespace, keyword) {
    switch (keyword) {
      case 'option':
        parseOption(namespace, keyword);
        skipToken(';');
        return true;
      case 'message':
        parseMessage(namespace, keyword);
        return true;
      case 'enum':
        parseEnum(namespace, keyword);
        return true;
      case 'service':
        parseService(namespace, keyword);
        return true;
      case 'extend':
        parseExtend(namespace, keyword);
        return true;
    }
    return false;
  }

  /**
   * Parses a block (enclosed in braces) or a single statement, handling comments and options.
   * @param {object} target - The object to attach comments/options to.
   * @param {function} statementHandler - Function to handle each statement.
   * @param {function} [finalizer] - Optional function to finalize after block.
   */
  function parseBlock(target, statementHandler, finalizer) {
    const startLine = tokenStream.line;
    if (target) {
      if (typeof target.comment !== 'string') target.comment = getComment();
      target.filename = parseProtoSchema.filename;
    }
    if (skipToken('{', true)) {
      let blockToken;
      while ((blockToken = nextToken()) !== '}') {
        statementHandler(blockToken);
      }
      skipToken(';', true);
    } else {
      if (finalizer) finalizer();
      skipToken(';');
      if (target && (typeof target.comment !== 'string' || preferTrailingComment)) {
        target.comment = getComment(startLine) || target.comment;
      }
    }
  }

  /**
   * Parses a message definition.
   * @param {object} namespace - The namespace to add the message to.
   * @param {string} keyword - The keyword ('message').
   */
  function parseMessage(namespace, keyword) {
    let messageName = nextToken();
    if (!rz.test(messageName)) throw throwIllegalToken(messageName, 'type name');
    const message = new Y_0(messageName);
    parseBlock(message, function handleMessageStatement(statement) {
      if (handleTopLevelKeyword(message, statement)) return;
      switch (statement) {
        case 'map':
          parseMapField(message, statement);
          break;
        case 'required':
        case 'repeated':
          parseField(message, statement);
          break;
        case 'optional':
          if (isProto3) parseField(message, 'proto3_optional');
          else parseField(message, 'optional');
          break;
        case 'oneof':
          parseOneOf(message, statement);
          break;
        case 'extensions':
          parseExtensionsOrReserved(message.extensions || (message.extensions = []));
          break;
        case 'reserved':
          parseExtensionsOrReserved(message.reserved || (message.reserved = []), true);
          break;
        default:
          if (!isProto3 || !oz.test(statement)) throw throwIllegalToken(statement);
          pushToken(statement);
          parseField(message, 'optional');
          break;
      }
    });
    namespace.add(message);
  }

  /**
   * Parses a field definition.
   * @param {object} message - The message object to add the field to.
   * @param {string} label - The label ('required', 'optional', 'repeated', 'proto3_optional').
   * @param {string} [extendType] - The type for 'extend' fields.
   */
  function parseField(message, label, extendType) {
    let fieldType = nextToken();
    if (fieldType === 'group') {
      parseGroupField(message, label);
      return;
    }
    // Handle qualified type names
    while (fieldType.endsWith('.') || peekToken().startsWith('.')) {
      fieldType += nextToken();
    }
    if (!oz.test(fieldType)) throw throwIllegalToken(fieldType, 'type');
    let fieldName = nextToken();
    if (!rz.test(fieldName)) throw throwIllegalToken(fieldName, 'name');
    fieldName = convertCase(fieldName);
    skipToken('=');
    const field = new W_0(fieldName, parseIdString(nextToken()), fieldType, label, extendType);
    parseBlock(field, function handleFieldOption(optionToken) {
      if (optionToken === 'option') {
        parseOption(field, optionToken);
        skipToken(';');
      } else {
        throw throwIllegalToken(optionToken);
      }
    }, function finalizeField() {
      parseFieldOptions(field);
    });
    if (label === 'proto3_optional') {
      const oneof = new F_0('_' + fieldName);
      field.setOption('proto3_optional', true);
      oneof.add(field);
      message.add(oneof);
    } else {
      message.add(field);
    }
    // For proto2, repeated fields of non-basic types are not packed by default
    if (!isProto3 && field.repeated && (og1.packed[fieldType] !== undefined || og1.basic[fieldType] === undefined)) {
      field.setOption('packed', false, true);
    }
  }

  /**
   * Parses a group field definition.
   * @param {object} message - The message object.
   * @param {string} label - The label ('required', 'optional', 'repeated').
   */
  function parseGroupField(message, label) {
    let groupName = nextToken();
    if (!rz.test(groupName)) throw throwIllegalToken(groupName, 'name');
    const groupFieldName = tg1.lcFirst(groupName);
    if (groupName === groupFieldName) groupName = tg1.ucFirst(groupName);
    skipToken('=');
    const fieldId = parseIdString(nextToken());
    const groupMessage = new Y_0(groupName);
    groupMessage.group = true;
    const groupField = new W_0(groupFieldName, fieldId, groupName, label);
    groupField.filename = parseProtoSchema.filename;
    parseBlock(groupMessage, function handleGroupStatement(statement) {
      switch (statement) {
        case 'option':
          parseOption(groupMessage, statement);
          skipToken(';');
          break;
        case 'required':
        case 'repeated':
          parseField(groupMessage, statement);
          break;
        case 'optional':
          if (isProto3) parseField(groupMessage, 'proto3_optional');
          else parseField(groupMessage, 'optional');
          break;
        case 'message':
          parseMessage(groupMessage, statement);
          break;
        case 'enum':
          parseEnum(groupMessage, statement);
          break;
        default:
          throw throwIllegalToken(statement);
      }
    });
    message.add(groupMessage).add(groupField);
  }

  /**
   * Parses a map field definition.
   * @param {object} message - The message object.
   */
  function parseMapField(message) {
    skipToken('<');
    const keyType = nextToken();
    if (og1.mapKey[keyType] === undefined) throw throwIllegalToken(keyType, 'type');
    skipToken(',');
    const valueType = nextToken();
    if (!oz.test(valueType)) throw throwIllegalToken(valueType, 'type');
    skipToken('>');
    let fieldName = nextToken();
    if (!rz.test(fieldName)) throw throwIllegalToken(fieldName, 'name');
    skipToken('=');
    const mapField = new O86(convertCase(fieldName), parseIdString(nextToken()), keyType, valueType);
    parseBlock(mapField, function handleMapOption(optionToken) {
      if (optionToken === 'option') {
        parseOption(mapField, optionToken);
        skipToken(';');
      } else {
        throw throwIllegalToken(optionToken);
      }
    }, function finalizeMapField() {
      parseFieldOptions(mapField);
    });
    message.add(mapField);
  }

  /**
   * Parses a oneof definition.
   * @param {object} message - The message object.
   */
  function parseOneOf(message) {
    let oneofName = nextToken();
    if (!rz.test(oneofName)) throw throwIllegalToken(oneofName, 'name');
    const oneof = new F_0(convertCase(oneofName));
    parseBlock(oneof, function handleOneOfStatement(statement) {
      if (statement === 'option') {
        parseOption(oneof, statement);
        skipToken(';');
      } else {
        pushToken(statement);
        parseField(oneof, 'optional');
      }
    });
    message.add(oneof);
  }

  /**
   * Parses an enum definition.
   * @param {object} namespace - The namespace to add the enum to.
   */
  function parseEnum(namespace) {
    let enumName = nextToken();
    if (!rz.test(enumName)) throw throwIllegalToken(enumName, 'name');
    const enumObj = new T86(enumName);
    parseBlock(enumObj, function handleEnumStatement(statement) {
      switch (statement) {
        case 'option':
          parseOption(enumObj, statement);
          skipToken(';');
          break;
        case 'reserved':
          parseExtensionsOrReserved(enumObj.reserved || (enumObj.reserved = []), true);
          break;
        default:
          parseEnumValue(enumObj, statement);
      }
    });
    namespace.add(enumObj);
  }

  /**
   * Parses an enum value definition.
   * @param {object} enumObj - The enum object.
   * @param {string} valueName - The name of the enum value.
   */
  function parseEnumValue(enumObj, valueName) {
    if (!rz.test(valueName)) throw throwIllegalToken(valueName, 'name');
    skipToken('=');
    const valueId = parseIdString(nextToken(), true);
    const valueObj = { options: undefined };
    valueObj.setOption = function (key, value) {
      if (this.options === undefined) this.options = {};
      this.options[key] = value;
    };
    parseBlock(valueObj, function handleEnumValueOption(optionToken) {
      if (optionToken === 'option') {
        parseOption(valueObj, optionToken);
        skipToken(';');
      } else {
        throw throwIllegalToken(optionToken);
      }
    }, function finalizeEnumValue() {
      parseFieldOptions(valueObj);
    });
    enumObj.add(valueName, valueId, valueObj.comment, valueObj.options);
  }

  /**
   * Parses an option statement.
   * @param {object} target - The object to set the option on.
   * @param {string} optionKeyword - The 'option' keyword.
   */
  function parseOption(target, optionKeyword) {
    const hasParen = skipToken('(', true);
    let optionName = nextToken();
    if (!oz.test(optionName)) throw throwIllegalToken(optionName, 'name');
    let fullOptionName = optionName;
    let parsedOptionName = fullOptionName;
    let extensionName;
    if (hasParen) {
      skipToken(')');
      fullOptionName = '(' + fullOptionName + ')';
      parsedOptionName = fullOptionName;
      optionName = peekToken();
      if (b86.test(optionName)) {
        extensionName = optionName.slice(1);
        fullOptionName += optionName;
        nextToken();
      }
    }
    skipToken('=');
    const optionValue = parseOptionValue(target, fullOptionName);
    setParsedOption(target, parsedOptionName, optionValue, extensionName);
  }

  /**
   * Parses an option value (could be a block or a single value).
   * @param {object} target - The object to set the option on.
   * @param {string} optionName - The name of the option.
   * @returns {*}
   */
  function parseOptionValue(target, optionName) {
    if (skipToken('{', true)) {
      const optionObject = {};
      while (!skipToken('}', true)) {
        let fieldName = nextToken();
        if (!rz.test(fieldName)) throw throwIllegalToken(fieldName, 'name');
        if (fieldName === null) throw throwIllegalToken(fieldName, 'end of input');
        let value;
        if (skipToken(':', true)) {
          if (peekToken() === '{') {
            value = parseOptionValue(target, optionName + '.' + fieldName);
          } else if (peekToken() === '[') {
            value = [];
            let lastValue;
            if (skipToken('[', true)) {
              do {
                lastValue = parseValueToken(true);
                value.push(lastValue);
              } while (skipToken(',', true));
              skipToken(']');
              if (typeof lastValue !== 'undefined') setOption(target, optionName + '.' + fieldName, lastValue);
            }
          } else {
            value = parseValueToken(true);
            setOption(target, optionName + '.' + fieldName, value);
          }
        } else {
          value = parseValueToken(true);
          setOption(target, optionName + '.' + fieldName, value);
        }
        // Merge repeated fields
        const existing = optionObject[fieldName];
        if (existing) value = [].concat(existing).concat(value);
        optionObject[fieldName] = value;
        skipToken(',', true);
        skipToken(';', true);
      }
      return optionObject;
    }
    const value = parseValueToken(true);
    setOption(target, optionName, value);
    return value;
  }

  /**
   * Sets an option on the target object.
   * @param {object} target
   * @param {string} optionName
   * @param {*} value
   */
  function setOption(target, optionName, value) {
    if (target.setOption) target.setOption(optionName, value);
  }

  /**
   * Sets a parsed option on the target object.
   * @param {object} target
   * @param {string} optionName
   * @param {*} value
   * @param {string} [extensionName]
   */
  function setParsedOption(target, optionName, value, extensionName) {
    if (target.setParsedOption) target.setParsedOption(optionName, value, extensionName);
  }

  /**
   * Parses field options (e.g., [packed=true]).
   * @param {object} target
   * @returns {object}
   */
  function parseFieldOptions(target) {
    if (skipToken('[', true)) {
      do {
        parseOption(target, 'option');
      } while (skipToken(',', true));
      skipToken(']');
    }
    return target;
  }

  /**
   * Parses a service definition.
   * @param {object} namespace - The namespace to add the service to.
   */
  function parseService(namespace) {
    let serviceName = nextToken();
    if (!rz.test(serviceName)) throw throwIllegalToken(serviceName, 'service name');
    const service = new P86(serviceName);
    parseBlock(service, function handleServiceStatement(statement) {
      if (handleTopLevelKeyword(service, statement)) return;
      if (statement === 'rpc') {
        parseRpcMethod(service, statement);
      } else {
        throw throwIllegalToken(statement);
      }
    });
    namespace.add(service);
  }

  /**
   * Parses an RPC method definition inside a service.
   * @param {object} service - The service object.
   * @param {string} rpcKeyword - The 'rpc' keyword.
   */
  function parseRpcMethod(service, rpcKeyword) {
    const comment = getComment();
    let methodKeyword = rpcKeyword;
    let methodName = nextToken();
    if (!rz.test(methodName)) throw throwIllegalToken(methodName, 'name');
    let rpcName = methodName;
    let isClientStreaming = false;
    let requestType;
    let responseType;
    let isServerStreaming = false;
    if (skipToken('(') && skipToken('stream', true)) isClientStreaming = true;
    if (!oz.test(methodName = nextToken())) throw throwIllegalToken(methodName);
    requestType = methodName;
    skipToken(')');
    skipToken('returns');
    skipToken('(');
    if (skipToken('stream', true)) isServerStreaming = true;
    if (!oz.test(methodName = nextToken())) throw throwIllegalToken(methodName);
    responseType = methodName;
    skipToken(')');
    const rpcMethod = new S86(rpcName, methodKeyword, requestType, responseType, isClientStreaming, isServerStreaming);
    rpcMethod.comment = comment;
    parseBlock(rpcMethod, function handleRpcOption(optionToken) {
      if (optionToken === 'option') {
        parseOption(rpcMethod, optionToken);
        skipToken(';');
      } else {
        throw throwIllegalToken(optionToken);
      }
    });
    service.add(rpcMethod);
  }

  /**
   * Parses an 'extend' block.
   * @param {object} namespace - The namespace to add extensions to.
   * @param {string} extendType - The type being extended.
   */
  function parseExtend(namespace, extendType) {
    let referenceType = nextToken();
    if (!oz.test(referenceType)) throw throwIllegalToken(referenceType, 'reference');
    const baseType = referenceType;
    parseBlock(null, function handleExtendStatement(statement) {
      switch (statement) {
        case 'required':
        case 'repeated':
          parseField(namespace, statement, baseType);
          break;
        case 'optional':
          if (isProto3) parseField(namespace, 'proto3_optional', baseType);
          else parseField(namespace, 'optional', baseType);
          break;
        default:
          if (!isProto3 || !oz.test(statement)) throw throwIllegalToken(statement);
          pushToken(statement);
          parseField(namespace, 'optional', baseType);
          break;
      }
    });
  }

  // Main parsing loop
  let currentToken;
  while ((currentToken = nextToken()) !== null) {
    switch (currentToken) {
      case 'package':
        if (!allowPackageImportSyntax) throw throwIllegalToken(currentToken);
        parsePackage();
        break;
      case 'import':
        if (!allowPackageImportSyntax) throw throwIllegalToken(currentToken);
        parseImport();
        break;
      case 'syntax':
        if (!allowPackageImportSyntax) throw throwIllegalToken(currentToken);
        parseSyntax();
        break;
      case 'option':
        parseOption(currentNamespace, currentToken);
        skipToken(';');
        break;
      default:
        if (handleTopLevelKeyword(currentNamespace, currentToken)) {
          allowPackageImportSyntax = false;
          continue;
        }
        throw throwIllegalToken(currentToken);
    }
  }

  parseProtoSchema.filename = null;
  return {
    package: packageName,
    imports: importList,
    weakImports: weakImportList,
    syntax: syntaxVersion,
    root: rootNamespace
  };
}

module.exports = parseProtoSchema;
