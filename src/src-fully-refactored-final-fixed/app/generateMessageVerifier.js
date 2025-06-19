/**
 * Generates a verifier function for a given protobuf message type definition.
 * The generated function checks if a message object conforms to the expected structure,
 * including field types, required/repeated/map fields, and oneof constraints.
 *
 * @param {Object} messageType - The protobuf message type definition object.
 * @returns {Function} - a function that verifies a message object and returns null if valid, or an error string if invalid.
 */
function generateMessageVerifier(messageType) {
  // Create a code generator for the verifier function
  const codegen = kg1.codegen(["m"], messageType.name + "$verify");
  // Start with a type check for the input object
  const verifier = codegen(
    'if(typeof m!=="object"||m===null)'
  )(
    'return%j',
    'object expected'
  );

  const oneofsArray = messageType.oneofsArray;
  // Tracks which oneof fields have been set
  const oneofTracker = {};

  // If there are any oneof fields, initialize a tracker object in the generated code
  if (oneofsArray.length) {
    verifier('var createIterableHelper={}');
  }

  // Iterate over all fields in the message type
  for (let fieldIndex = 0; fieldIndex < messageType.fieldsArray.length; ++fieldIndex) {
    // Resolve the field definition
    const field = messageType._fieldsArray[fieldIndex].resolve();
    // Generate a safe property accessor for the field
    const fieldAccessor = 'm' + kg1.safeProp(field.name);

    // If the field is optional, wrap checks in a conditional
    if (field.optional) {
      verifier('if(%createInteractionAccessor!=null&&m.hasOwnProperty(%j)){', fieldAccessor, field.name);
    }

    if (field.map) {
      // Map field: check object type and iterate over keys
      verifier('if(!util.isObject(%createInteractionAccessor))', fieldAccessor)
        ('return%j', getExpectedTypeDescription(field, 'object'))
        ('var k=Object.keys(%createInteractionAccessor)', fieldAccessor)
        ('for(var i=0;i<k.length;++i){');
      validateKeyType(verifier, field, 'k[i]');
      generateTypeValidationCode(verifier, field, fieldIndex, fieldAccessor + '[k[i]]');
      verifier('}');
    } else if (field.repeated) {
      // Repeated field: check array type and iterate over elements
      verifier('if(!Array.isArray(%createInteractionAccessor))', fieldAccessor)
        ('return%j', getExpectedTypeDescription(field, 'array'))
        ('for(var i=0;i<%createInteractionAccessor.length;++i){', fieldAccessor);
      generateTypeValidationCode(verifier, field, fieldIndex, fieldAccessor + '[i]');
      verifier('}');
    } else {
      // Singular field
      if (field.partOf) {
        // Handle oneof constraint: ensure only one field in the group is set
        const oneofProp = kg1.safeProp(field.partOf.name);
        if (oneofTracker[field.partOf.name] === 1) {
          verifier('if(createIterableHelper%createInteractionAccessor===1)', oneofProp)
            ('return%j', field.partOf.name + ': multiple values');
        }
        oneofTracker[field.partOf.name] = 1;
        verifier('createIterableHelper%createInteractionAccessor=1', oneofProp);
      }
      generateTypeValidationCode(verifier, field, fieldIndex, fieldAccessor);
    }

    // Close optional field block
    if (field.optional) {
      verifier('}');
    }
  }

  // If all checks pass, return null (no error)
  return verifier('return null');
}

module.exports = generateMessageVerifier;