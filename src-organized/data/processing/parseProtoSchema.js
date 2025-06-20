/**
 * Parses a Protocol Buffers (.proto) schema from a token stream and builds an in-memory representation.
 *
 * @param {string} protoSource - The source string or token stream of the .proto schema.
 * @param {D_0|object} [rootOrOptions] - The root namespace object or options object.
 * @param {object} [options] - Parsing options (if not provided as the second argument).
 * @returns {object} An object containing the parsed package, imports, syntax, and root namespace.
 */
function parseProtoSchema(protoSource, rootOrOptions, options) {
  // Handle optional arguments and defaults
  let rootNamespace, parseOptions;
  if (!(rootOrOptions instanceof D_0)) {
    parseOptions = rootOrOptions;
    rootNamespace = new D_0();
  } else {
    rootNamespace = rootOrOptions;
    parseOptions = options;
  }
  if (!parseOptions) parseOptions = parseProtoSchema.defaults;

  const preferTrailingComment = parseOptions.preferTrailingComment || false;
  const tokenizer = R86(protoSource, parseOptions.alternateCommentMode || false);
  const nextToken = tokenizer.next;
  const processRecentInputEntries = tokenizer.push;
  const peekToken = tokenizer.peek;
  const skipToken = tokenizer.skip;
  const getComment = tokenizer.cmnt;

  let allowHeaderStatements = true;
  let packageName = undefined;
  let importStatements = undefined;
  let weakImportStatements = undefined;
  let syntaxVersion = undefined;
  let isProto3 = false;
  let currentNamespace = rootNamespace;

  // Case conversion function
  const caseTransform = parseOptions.keepCase ? (name) => name : tg1.camelCase;

  /**
   * Throws a formatted error for illegal tokens.
   * @param {string} token - The offending token.
   * @param {string} [expected] - The expected token type.
   * @param {boolean} [preserveFilename] - Whether to preserve the filename.
   * @returns {Error}
   */
  function throwParseError(token, expected, preserveFilename) {
    const filename = parseProtoSchema.filename;
    if (!preserveFilename) parseProtoSchema.filename = null;
    return Error(`illegal ${expected || 'token'} '${token}'${filename ? ` (${filename}, ` : ''}line ${tokenizer.line})`);
  }

  /**
   * Parses a string literal (handles both ' and ").
   * @returns {string}
   */
  function parseStringLiteral() {
    const stringParts = [];
    let quoteType;
    do {
      quoteType = nextToken();
      if (quoteType !== '"' && quoteType !== "'") throw throwParseError(quoteType);
      stringParts.push(nextToken());
      skipToken(quoteType);
      quoteType = peekToken();
    } while (quoteType === '"' || quoteType === "'");
    return stringParts.join("");
  }

  /**
   * Parses a value (string, boolean, or number).
   * @param {boolean} [allowIdentifier]
   * @returns {*}
   */
  function parseValue(allowIdentifier) {
    let token = nextToken();
    switch (token) {
      case "'":
      case '"':
        processRecentInputEntries(token);
        return parseStringLiteral();
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
      if (allowIdentifier && oz.test(token)) return token;
      throw throwParseError(token, 'value');
    }
  }

  /**
   * Parses a list of reserved or extension ranges.
   * @param {object[]} targetList - The array to push results into.
   * @param {boolean} [isReserved]
   */
  function parseReservedOrExtensions(targetList, isReserved) {
    let token, rangeStart;
    do {
      if (isReserved && ((token = peekToken()) === '"' || token === "'")) {
        targetList.push(parseStringLiteral());
      } else {
        rangeStart = parseIdOrMax(nextToken());
        if (skipToken('to', true)) {
          targetList.push([rangeStart, parseIdOrMax(nextToken())]);
        } else {
          targetList.push([rangeStart, rangeStart]);
        }
      }
    } while (skipToken(',', true));

    // Optionally parse options for the reserved/extensions statement
    const rangeObj = { options: undefined };
    rangeObj.setOption = function (key, value) {
      if (this.options === undefined) this.options = {};
      this.options[key] = value;
    };
    parseBlock(rangeObj, function (token) {
      if (token === 'option') {
        parseOption(rangeObj, token);
        skipToken(';');
      } else {
        throw throwParseError(token);
      }
    }, function () {
      parseFieldOptions(rangeObj);
    });
  }

  /**
   * Parses a number literal, handling inf/nan/hex/oct/dec/float.
   * @param {string} token
   * @param {boolean} [allowFloat]
   * @returns {number}
   */
  function parseEncodedDataWithMetadata(token, allowFloat) {
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
    throw throwParseError(token, 'number', allowFloat);
  }

  /**
   * Parses an id or 'max' for reserved/extension ranges.
   * @param {string} token
   * @param {boolean} [allowNegative]
   * @returns {number}
   */
  function parseIdOrMax(token, allowNegative) {
    switch (token) {
      case 'max':
      case 'MAX':
      case 'Max':
        return 536870911;
      case '0':
        return 0;
    }
    if (!allowNegative && token.charAt(0) === '-') throw throwParseError(token, 'id');
    if (j86.test(token)) return parseInt(token, 10);
    if (y86.test(token)) return parseInt(token, 16);
    if (f86.test(token)) return parseInt(token, 8);
    throw throwParseError(token, 'id');
  }

  /**
   * Parses a package declaration.
   */
  function parsePackage() {
    if (packageName !== undefined) throw throwParseError('package');
    packageName = nextToken();
    if (!oz.test(packageName)) throw throwParseError(packageName, 'name');
    currentNamespace = currentNamespace.define(packageName);
    skipToken(';');
  }

  /**
   * Parses an import statement.
   */
  function parseImport() {
    let importType = peekToken();
    let importList;
    switch (importType) {
      case 'weak':
        importList = weakImportStatements || (weakImportStatements = []);
        nextToken();
        break;
      case 'public':
        nextToken();
        // fall through to default
      default:
        importList = importStatements || (importStatements = []);
        break;
    }
    const importPath = parseStringLiteral();
    skipToken(';');
    importList.push(importPath);
  }

  /**
   * Parses a syntax declaration.
   */
  function parseSyntax() {
    skipToken('=');
    syntaxVersion = parseStringLiteral();
    isProto3 = syntaxVersion === 'proto3';
    if (!isProto3 && syntaxVersion !== 'proto2') throw throwParseError(syntaxVersion, 'syntax');
    rootNamespace.setOption('syntax', syntaxVersion);
    skipToken(';');
  }

  /**
   * Handles top-level statements (option, message, enum, service, extend).
   * @param {object} namespaceObj
   * @param {string} keyword
   * @returns {boolean}
   */
  function handleTopLevelStatement(namespaceObj, keyword) {
    switch (keyword) {
      case 'option':
        parseOption(namespaceObj, keyword);
        skipToken(';');
        return true;
      case 'message':
        parseMessage(namespaceObj, keyword);
        return true;
      case 'enum':
        parseEnum(namespaceObj, keyword);
        return true;
      case 'service':
        parseService(namespaceObj, keyword);
        return true;
      case 'extend':
        parseExtend(namespaceObj, keyword);
        return true;
    }
    return false;
  }

  /**
   * Parses a block (enclosed in { }) or a single statement.
   * @param {object} blockObj
   * @param {function} statementHandler
   * @param {function} [onNoBlock]
   */
  function parseBlock(blockObj, statementHandler, onNoBlock) {
    const startLine = tokenizer.line;
    if (blockObj) {
      if (typeof blockObj.comment !== 'string') blockObj.comment = getComment();
      blockObj.filename = parseProtoSchema.filename;
    }
    if (skipToken('{', true)) {
      let token;
      while ((token = nextToken()) !== '}') {
        statementHandler(token);
      }
      skipToken(';', true);
    } else {
      if (onNoBlock) onNoBlock();
      skipToken(';');
      if (blockObj && (typeof blockObj.comment !== 'string' || preferTrailingComment)) {
        blockObj.comment = getComment(startLine) || blockObj.comment;
      }
    }
  }

  /**
   * Parses a message definition.
   * @param {object} namespaceObj
   * @param {string} keyword
   */
  function parseMessage(namespaceObj, keyword) {
    let messageName = nextToken();
    if (!rz.test(messageName)) throw throwParseError(messageName, 'type name');
    const messageObj = new Y_0(messageName);
    parseBlock(messageObj, function (blockToken) {
      if (handleTopLevelStatement(messageObj, blockToken)) return;
      switch (blockToken) {
        case 'map':
          parseMapField(messageObj, blockToken);
          break;
        case 'required':
        case 'repeated':
          parseField(messageObj, blockToken);
          break;
        case 'optional':
          if (isProto3) {
            parseField(messageObj, 'proto3_optional');
          } else {
            parseField(messageObj, 'optional');
          }
          break;
        case 'oneof':
          parseOneOf(messageObj, blockToken);
          break;
        case 'extensions':
          parseReservedOrExtensions(messageObj.extensions || (messageObj.extensions = []));
          break;
        case 'reserved':
          parseReservedOrExtensions(messageObj.reserved || (messageObj.reserved = []), true);
          break;
        default:
          if (!isProto3 || !oz.test(blockToken)) throw throwParseError(blockToken);
          processRecentInputEntries(blockToken);
          parseField(messageObj, 'optional');
          break;
      }
    });
    namespaceObj.add(messageObj);
  }

  /**
   * Parses a field definition.
   * @param {object} messageObj
   * @param {string} label
   * @param {string} [extendType]
   */
  function parseField(messageObj, label, extendType) {
    let fieldType = nextToken();
    // Handle qualified type names
    if (fieldType.endsWith('.') || peekToken().startsWith('.')) {
      do {
        fieldType += nextToken();
      } while (fieldType.endsWith('.') || peekToken().startsWith('.'));
    }
    if (!oz.test(fieldType)) throw throwParseError(fieldType, 'type');
    let fieldName = nextToken();
    if (!rz.test(fieldName)) throw throwParseError(fieldName, 'name');
    fieldName = caseTransform(fieldName);
    skipToken('=');
    const fieldObj = new W_0(fieldName, parseIdOrMax(nextToken()), fieldType, label, extendType);
    parseBlock(fieldObj, function (fieldBlockToken) {
      if (fieldBlockToken === 'option') {
        parseOption(fieldObj, fieldBlockToken);
        skipToken(';');
      } else {
        throw throwParseError(fieldBlockToken);
      }
    }, function () {
      parseFieldOptions(fieldObj);
    });
    if (label === 'proto3_optional') {
      const oneofObj = new F_0('_' + fieldName);
      fieldObj.setOption('proto3_optional', true);
      oneofObj.add(fieldObj);
      messageObj.add(oneofObj);
    } else {
      messageObj.add(fieldObj);
    }
    // Set packed=false for repeated fields of non-basic types in proto2
    if (!isProto3 && fieldObj.repeated && (og1.packed[fieldType] !== undefined || og1.basic[fieldType] === undefined)) {
      fieldObj.setOption('packed', false, true);
    }
  }

  /**
   * Parses a group field.
   * @param {object} messageObj
   * @param {string} label
   */
  function parseGroupField(messageObj, label) {
    let groupName = nextToken();
    if (!rz.test(groupName)) throw throwParseError(groupName, 'name');
    let groupFieldName = tg1.lcFirst(groupName);
    if (groupName === groupFieldName) groupName = tg1.ucFirst(groupName);
    skipToken('=');
    const fieldId = parseIdOrMax(nextToken());
    const groupObj = new Y_0(groupName);
    groupObj.group = true;
    const fieldObj = new W_0(groupFieldName, fieldId, groupName, label);
    fieldObj.filename = parseProtoSchema.filename;
    parseBlock(groupObj, function (groupBlockToken) {
      switch (groupBlockToken) {
        case 'option':
          parseOption(groupObj, groupBlockToken);
          skipToken(';');
          break;
        case 'required':
        case 'repeated':
          parseField(groupObj, groupBlockToken);
          break;
        case 'optional':
          if (isProto3) {
            parseField(groupObj, 'proto3_optional');
          } else {
            parseField(groupObj, 'optional');
          }
          break;
        case 'message':
          parseMessage(groupObj, groupBlockToken);
          break;
        case 'enum':
          parseEnum(groupObj, groupBlockToken);
          break;
        default:
          throw throwParseError(groupBlockToken);
      }
    });
    messageObj.add(groupObj).add(fieldObj);
  }

  /**
   * Parses a map field.
   * @param {object} messageObj
   */
  function parseMapField(messageObj) {
    skipToken('<');
    const keyType = nextToken();
    if (og1.mapKey[keyType] === undefined) throw throwParseError(keyType, 'type');
    skipToken(',');
    const valueType = nextToken();
    if (!oz.test(valueType)) throw throwParseError(valueType, 'type');
    skipToken('>');
    let fieldName = nextToken();
    if (!rz.test(fieldName)) throw throwParseError(fieldName, 'name');
    skipToken('=');
    const mapFieldObj = new O86(caseTransform(fieldName), parseIdOrMax(nextToken()), keyType, valueType);
    parseBlock(mapFieldObj, function (blockToken) {
      if (blockToken === 'option') {
        parseOption(mapFieldObj, blockToken);
        skipToken(';');
      } else {
        throw throwParseError(blockToken);
      }
    }, function () {
      parseFieldOptions(mapFieldObj);
    });
    messageObj.add(mapFieldObj);
  }

  /**
   * Parses a oneof block.
   * @param {object} messageObj
   * @param {string} keyword
   */
  function parseOneOf(messageObj, keyword) {
    let oneofName = nextToken();
    if (!rz.test(oneofName)) throw throwParseError(oneofName, 'name');
    const oneofObj = new F_0(caseTransform(oneofName));
    parseBlock(oneofObj, function (blockToken) {
      if (blockToken === 'option') {
        parseOption(oneofObj, blockToken);
        skipToken(';');
      } else {
        processRecentInputEntries(blockToken);
        parseField(oneofObj, 'optional');
      }
    });
    messageObj.add(oneofObj);
  }

  /**
   * Parses an enum definition.
   * @param {object} namespaceObj
   * @param {string} keyword
   */
  function parseEnum(namespaceObj, keyword) {
    let enumName = nextToken();
    if (!rz.test(enumName)) throw throwParseError(enumName, 'name');
    const enumObj = new T86(enumName);
    parseBlock(enumObj, function (blockToken) {
      switch (blockToken) {
        case 'option':
          parseOption(enumObj, blockToken);
          skipToken(';');
          break;
        case 'reserved':
          parseReservedOrExtensions(enumObj.reserved || (enumObj.reserved = []), true);
          break;
        default:
          parseEnumField(enumObj, blockToken);
      }
    });
    namespaceObj.add(enumObj);
  }

  /**
   * Parses an enum field.
   * @param {object} enumObj
   * @param {string} fieldName
   */
  function parseEnumField(enumObj, fieldName) {
    if (!rz.test(fieldName)) throw throwParseError(fieldName, 'name');
    skipToken('=');
    const fieldId = parseIdOrMax(nextToken(), true);
    const fieldObj = { options: undefined };
    fieldObj.setOption = function (key, value) {
      if (this.options === undefined) this.options = {};
      this.options[key] = value;
    };
    parseBlock(fieldObj, function (blockToken) {
      if (blockToken === 'option') {
        parseOption(fieldObj, blockToken);
        skipToken(';');
      } else {
        throw throwParseError(blockToken);
      }
    }, function () {
      parseFieldOptions(fieldObj);
    });
    enumObj.add(fieldName, fieldId, fieldObj.comment, fieldObj.options);
  }

  /**
   * Parses an option statement.
   * @param {object} optionTarget
   * @param {string} keyword
   */
  function parseOption(optionTarget, keyword) {
    const hasParen = skipToken('(', true);
    let optionName = nextToken();
    if (!oz.test(optionName)) throw throwParseError(optionName, 'name');
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
    const optionValue = parseOptionValue(optionTarget, fullOptionName);
    setParsedOption(optionTarget, parsedOptionName, optionValue, extensionName);
  }

  /**
   * Parses an option value (could be a block or a single value).
   * @param {object} optionTarget
   * @param {string} optionName
   * @returns {*}
   */
  function parseOptionValue(optionTarget, optionName) {
    if (skipToken('{', true)) {
      const optionObj = {};
      while (!skipToken('}', true)) {
        let fieldName = nextToken();
        if (!rz.test(fieldName)) throw throwParseError(fieldName, 'name');
        if (fieldName === null) throw throwParseError(fieldName, 'end of input');
        let value;
        if (skipToken(':', true)) {
          if (peekToken() === '{') {
            value = parseOptionValue(optionTarget, optionName + '.' + fieldName);
          } else if (peekToken() === '[') {
            value = [];
            let arrayValue;
            if (skipToken('[', true)) {
              do {
                arrayValue = parseValue(true);
                value.push(arrayValue);
              } while (skipToken(',', true));
              skipToken(']');
              if (typeof arrayValue !== 'undefined') setOption(optionTarget, optionName + '.' + fieldName, arrayValue);
            }
          } else {
            value = parseValue(true);
            setOption(optionTarget, optionName + '.' + fieldName, value);
          }
        } else {
          value = parseValue(true);
          setOption(optionTarget, optionName + '.' + fieldName, value);
        }
        // Merge repeated fields
        const prev = optionObj[fieldName];
        if (prev) value = [].concat(prev).concat(value);
        optionObj[fieldName] = value;
        skipToken(',', true);
        skipToken(';', true);
      }
      return optionObj;
    }
    const singleValue = parseValue(true);
    setOption(optionTarget, optionName, singleValue);
    return singleValue;
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
   * Sets a parsed option on the target object (for extensions).
   * @param {object} target
   * @param {string} optionName
   * @param {*} value
   * @param {string} [extensionName]
   */
  function setParsedOption(target, optionName, value, extensionName) {
    if (target.setParsedOption) target.setParsedOption(optionName, value, extensionName);
  }

  /**
   * Parses field options (in square brackets).
   * @param {object} fieldObj
   * @returns {object}
   */
  function parseFieldOptions(fieldObj) {
    if (skipToken('[', true)) {
      do {
        parseOption(fieldObj, 'option');
      } while (skipToken(',', true));
      skipToken(']');
    }
    return fieldObj;
  }

  /**
   * Parses a service definition.
   * @param {object} namespaceObj
   * @param {string} keyword
   */
  function parseService(namespaceObj, keyword) {
    let serviceName = nextToken();
    if (!rz.test(serviceName)) throw throwParseError(serviceName, 'service name');
    const serviceObj = new P86(serviceName);
    parseBlock(serviceObj, function (blockToken) {
      if (handleTopLevelStatement(serviceObj, blockToken)) return;
      if (blockToken === 'rpc') {
        parseRpcMethod(serviceObj, blockToken);
      } else {
        throw throwParseError(blockToken);
      }
    });
    namespaceObj.add(serviceObj);
  }

  /**
   * Parses an rpc method inside a service.
   * @param {object} serviceObj
   * @param {string} keyword
   */
  function parseRpcMethod(serviceObj, keyword) {
    const rpcComment = getComment();
    let rpcKeyword = keyword;
    let rpcName = nextToken();
    if (!rz.test(rpcName)) throw throwParseError(rpcName, 'name');
    const methodName = rpcName;
    let isClientStreaming = false;
    let requestType;
    let isServerStreaming = false;
    let responseType;
    skipToken('(');
    if (skipToken('stream', true)) isClientStreaming = true;
    if (!oz.test(requestType = nextToken())) throw throwParseError(requestType);
    skipToken(')');
    skipToken('returns');
    skipToken('(');
    if (skipToken('stream', true)) isServerStreaming = true;
    if (!oz.test(responseType = nextToken())) throw throwParseError(responseType);
    skipToken(')');
    const rpcMethodObj = new S86(methodName, rpcKeyword, requestType, responseType, isClientStreaming, isServerStreaming);
    rpcMethodObj.comment = rpcComment;
    parseBlock(rpcMethodObj, function (blockToken) {
      if (blockToken === 'option') {
        parseOption(rpcMethodObj, blockToken);
        skipToken(';');
      } else {
        throw throwParseError(blockToken);
      }
    });
    serviceObj.add(rpcMethodObj);
  }

  /**
   * Parses an extend block.
   * @param {object} namespaceObj
   * @param {string} keyword
   */
  function parseExtend(namespaceObj, keyword) {
    let extendType = nextToken();
    if (!oz.test(extendType)) throw throwParseError(extendType, 'reference');
    parseBlock(null, function (blockToken) {
      switch (blockToken) {
        case 'required':
        case 'repeated':
          parseField(namespaceObj, blockToken, extendType);
          break;
        case 'optional':
          if (isProto3) {
            parseField(namespaceObj, 'proto3_optional', extendType);
          } else {
            parseField(namespaceObj, 'optional', extendType);
          }
          break;
        default:
          if (!isProto3 || !oz.test(blockToken)) throw throwParseError(blockToken);
          processRecentInputEntries(blockToken);
          parseField(namespaceObj, 'optional', extendType);
          break;
      }
    });
  }

  // Main parsing loop
  let currentToken;
  while ((currentToken = nextToken()) !== null) {
    switch (currentToken) {
      case 'package':
        if (!allowHeaderStatements) throw throwParseError(currentToken);
        parsePackage();
        break;
      case 'import':
        if (!allowHeaderStatements) throw throwParseError(currentToken);
        parseImport();
        break;
      case 'syntax':
        if (!allowHeaderStatements) throw throwParseError(currentToken);
        parseSyntax();
        break;
      case 'option':
        parseOption(currentNamespace, currentToken);
        skipToken(';');
        break;
      default:
        if (handleTopLevelStatement(currentNamespace, currentToken)) {
          allowHeaderStatements = false;
          continue;
        }
        throw throwParseError(currentToken);
    }
  }

  // Reset filename after parse
  parseProtoSchema.filename = null;

  return {
    package: packageName,
    imports: importStatements,
    weakImports: weakImportStatements,
    syntax: syntaxVersion,
    root: rootNamespace
  };
}

module.exports = parseProtoSchema;