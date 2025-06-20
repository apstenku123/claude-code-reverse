#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/fix-regex-ranges.js
 * File name: fix-regex-ranges.js
 * Author: davidgornshtein@gmail.com
 * Description: Fixes invalid regex character class ranges that contain function names
 * Purpose: Resolves syntax errors caused by improper string substitution in regex patterns
 * Patterns: Regular expression fixing, character class range correction
 */

const fs = require('fs');
const path = require('path');

function fixRegexRanges(content) {
    // Fix patterns like [a-getKeywordByFirstCharacter-subscribeToObservablesSequentially]
    // These should be [a-zA-Z0-9-] or similar
    
    let fixCount = 0;
    
    // Pattern 1: Fix [a-functionName-Z_] patterns
    content = content.replace(
        /\[a-[a-zA-Z]+-Z_\]/g,
        (match) => {
            console.log(`Fixed pattern: ${match} -> [a-zA-Z_]`);
            fixCount++;
            return '[a-zA-Z_]';
        }
    );
    
    // Pattern 2: Fix [a-functionName-Z0-9_] patterns
    content = content.replace(
        /\[a-[a-zA-Z]+-Z0-9_\]/g,
        (match) => {
            console.log(`Fixed pattern: ${match} -> [a-zA-Z0-9_]`);
            fixCount++;
            return '[a-zA-Z0-9_]';
        }
    );
    
    // Pattern 3: Fix [a-functionName-Z0-9-] patterns
    content = content.replace(
        /\[a-[a-zA-Z]+-Z0-9-\]/g,
        (match) => {
            console.log(`Fixed pattern: ${match} -> [a-zA-Z0-9-]`);
            fixCount++;
            return '[a-zA-Z0-9-]';
        }
    );
    
    // Pattern 3a: Fix [a-functionName-Z_$] patterns
    content = content.replace(
        /\[a-[a-zA-Z]+-Z_\$\]/g,
        (match) => {
            console.log(`Fixed pattern: ${match} -> [a-zA-Z_$]`);
            fixCount++;
            return '[a-zA-Z_$]';
        }
    );
    
    // Pattern 3b: Fix [a-functionName-Z0-9_$] patterns
    content = content.replace(
        /\[a-[a-zA-Z]+-Z0-9_\$\]/g,
        (match) => {
            console.log(`Fixed pattern: ${match} -> [a-zA-Z0-9_$]`);
            fixCount++;
            return '[a-zA-Z0-9_$]';
        }
    );
    
    // Pattern 4: Fix simple [a-functionName] patterns
    content = content.replace(
        /\[a-[a-zA-Z]+\]/g,
        (match) => {
            // Skip valid patterns like [a-z] or [a-Z]
            if (match === '[a-z]' || match === '[a-Z]' || match === '[a-zA-Z]') {
                return match;
            }
            console.log(`Fixed pattern: ${match} -> [a-zA-Z]`);
            fixCount++;
            return '[a-zA-Z]';
        }
    );
    
    // Pattern 5: Fix specific known patterns
    const specificPatterns = {
        '/\\[a-getKeywordByFirstCharacter-subscribeToObservablesSequentially\\]/g': '[a-zA-Z]',
        '/\\[a-getKeywordByFirstCharacter-Z_\\]/g': '[a-zA-Z_]',
        '/\\[a-getKeywordByFirstCharacter-Z0-9_\\]/g': '[a-zA-Z0-9_]',
        '/\\[a-getKeywordByFirstCharacter-Z0-9-\\]/g': '[a-zA-Z0-9-]',
        '/\\[a-createModuleLoader-Z_\\]/g': '[a-zA-Z_]',
        '/\\[a-createModuleLoader-Z0-9_\\]/g': '[a-zA-Z0-9_]',
        '/\\[a-createModuleLoader\\]/g': '[a-zA-Z]'
    };
    
    for (const [pattern, replacement] of Object.entries(specificPatterns)) {
        const regex = new RegExp(pattern.slice(1, -2), 'g');
        const matches = content.match(regex);
        if (matches) {
            content = content.replace(regex, replacement);
            fixCount += matches.length;
            console.log(`Fixed ${matches.length} instances of ${pattern} -> ${replacement}`);
        }
    }
    
    console.log(`Total fixes: ${fixCount}`);
    return { content, fixCount };
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    const inputFile = args[0] || path.join(__dirname, '../cli-organized.cjs');
    const outputFile = args[1] || inputFile;
    
    console.log(`Fixing regex ranges in: ${inputFile}`);
    
    try {
        const content = fs.readFileSync(inputFile, 'utf-8');
        const result = fixRegexRanges(content);
        
        fs.writeFileSync(outputFile, result.content);
        console.log(`✓ Fixed ${result.fixCount} regex range issues`);
        
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

module.exports = { fixRegexRanges };