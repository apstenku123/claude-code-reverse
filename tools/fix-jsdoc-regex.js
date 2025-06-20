#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/fix-jsdoc-regex.js
 * File name: fix-jsdoc-regex.js
 * Author: davidgornshtein@gmail.com
 * Description: Fixes JSDoc comments with regex patterns in default parameters
 * Purpose: Resolves syntax errors caused by regex literals in JSDoc
 * Patterns: Regular expression escaping, JSDoc comment processing
 */

const fs = require('fs');
const path = require('path');

function fixJSDocRegex(content) {
    // Fix JSDoc comments with regex in default parameters
    // Pattern: [paramName=[/.*/]] should become [paramName]
    return content.replace(
        /(\@param\s+\{[^}]+\}\s+\[[^\]]+)=\[\/[^\]]+\/\]\]/g,
        '$1]'
    );
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    const inputFile = args[0] || path.join(__dirname, '../cli-organized.cjs');
    const outputFile = args[1] || inputFile;
    
    console.log(`Fixing JSDoc regex patterns in: ${inputFile}`);
    
    try {
        const content = fs.readFileSync(inputFile, 'utf-8');
        const fixed = fixJSDocRegex(content);
        
        // Count fixes
        const originalMatches = content.match(/=\[\/[^\]]+\/\]\]/g) || [];
        const fixedMatches = fixed.match(/=\[\/[^\]]+\/\]\]/g) || [];
        const fixCount = originalMatches.length - fixedMatches.length;
        
        fs.writeFileSync(outputFile, fixed);
        console.log(`✓ Fixed ${fixCount} JSDoc regex patterns`);
        
        if (outputFile === inputFile) {
            console.log('✓ File updated in place');
        } else {
            console.log(`✓ Output written to: ${outputFile}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

module.exports = { fixJSDocRegex };