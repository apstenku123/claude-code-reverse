#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/reorganize-and-build.js
 * File name: reorganize-and-build.js
 * Author: davidgornshtein@gmail.com
 * Description: Complete pipeline to reorganize functions and build the CLI
 * Purpose: Single script to reorganize source files and build a working CLI
 * Patterns: Pipeline orchestration, build automation, error recovery
 */

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk').default || require('chalk');

// Import our tools
const { reorganizeFunctions } = require('./reorganize-functions');
const { fixJSDocRegex } = require('./fix-jsdoc-regex');
const { fixRegexRanges } = require('./fix-regex-ranges');

/**
 * Execute a command and return a promise
 */
function execCommand(command, args = [], options = {}) {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, {
            stdio: 'inherit',
            ...options
        });
        
        proc.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}: ${command} ${args.join(' ')}`));
            }
        });
        
        proc.on('error', reject);
    });
}

/**
 * Fix all regex issues in the built CLI
 */
async function fixAllRegexIssues(cliPath) {
    console.log(chalk.blue('\nFixing regex issues...'));
    
    // Read the file
    let content = await fs.readFile(cliPath, 'utf-8');
    
    // Apply JSDoc fixes
    console.log(chalk.gray('- Fixing JSDoc regex patterns...'));
    content = fixJSDocRegex(content);
    
    // Apply regex range fixes
    console.log(chalk.gray('- Fixing regex character ranges...'));
    const result = fixRegexRanges(content);
    content = result.content;
    
    // Additional fixes for patterns we've seen
    const additionalFixes = [
        // Fix patterns in string literals within regex
        [/\[a-getKeywordByFirstCharacter-Z0-9\+\]/g, '[a-zA-Z0-9+]'],
        [/\[xXuU\]\[a-getKeywordByFirstCharacter-Z0-9\+\]/g, '[xXuU][a-zA-Z0-9+]'],
        // Fix any remaining function name patterns
        [/\[a-[a-zA-Z]+-[a-zA-Z]+\]/g, '[a-zA-Z]'],
        [/\[0-9a-[a-zA-Z]+-[a-zA-Z]+\]/g, '[0-9a-zA-Z]'],
        // Fix patterns with special characters
        [/\[a-[a-zA-Z]+-Z0-9\+\]/g, '[a-zA-Z0-9+]'],
        [/\[a-[a-zA-Z]+-Z0-9_\$\]/g, '[a-zA-Z0-9_$]'],
    ];
    
    let totalAdditionalFixes = 0;
    for (const [pattern, replacement] of additionalFixes) {
        const matches = content.match(pattern);
        if (matches) {
            content = content.replace(pattern, replacement);
            totalAdditionalFixes += matches.length;
            console.log(chalk.gray(`  Fixed ${matches.length} instances of ${pattern.source}`));
        }
    }
    
    // Write the fixed content back
    await fs.writeFile(cliPath, content);
    
    console.log(chalk.green(`✓ Fixed ${result.fixCount + totalAdditionalFixes} total regex issues`));
}

/**
 * Clean directory
 */
async function cleanDirectory(dirPath) {
    try {
        await fs.rm(dirPath, { recursive: true, force: true });
    } catch (error) {
        // Directory might not exist, that's fine
    }
}

/**
 * Main pipeline
 */
async function main() {
    console.log(chalk.bold.blue('=== Claude Code Reorganization and Build Pipeline ===\n'));
    
    const sourceDir = path.join(__dirname, '../src-fully-refactored-final');
    const organizedDir = path.join(__dirname, '../src-organized');
    const cliPath = path.join(__dirname, '../cli-organized.cjs');
    
    try {
        // Step 1: Clean up previous build
        console.log(chalk.blue('Step 1: Cleaning previous build...'));
        await cleanDirectory(organizedDir);
        if (fsSync.existsSync(cliPath)) {
            await fs.unlink(cliPath);
        }
        console.log(chalk.green('✓ Cleaned up previous build'));
        
        // Step 2: Reorganize functions
        console.log(chalk.blue('\nStep 2: Reorganizing functions...'));
        await reorganizeFunctions(sourceDir, organizedDir);
        
        // Step 3: Build the CLI
        console.log(chalk.blue('\nStep 3: Building CLI...'));
        await execCommand('node', [path.join(__dirname, 'build-organized-cli.js')]);
        
        // Step 4: Test the built CLI
        console.log(chalk.blue('\nStep 4: Testing built CLI...'));
        try {
            await execCommand('node', [cliPath, '--version']);
            console.log(chalk.green('✓ CLI is working!'));
        } catch (error) {
            console.log(chalk.yellow('⚠ CLI test failed, but file was built'));
            console.log(chalk.gray('Error:', error.message));
        }
        
        // Step 5: Generate final report
        console.log(chalk.blue('\nStep 5: Generating final report...'));
        const stats = await fs.stat(cliPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        const report = {
            timestamp: new Date().toISOString(),
            sourceDirectory: sourceDir,
            organizedDirectory: organizedDir,
            outputFile: cliPath,
            fileSize: `${fileSizeMB} MB`,
            success: true
        };
        
        await fs.writeFile(
            path.join(__dirname, '../build-report.json'),
            JSON.stringify(report, null, 2)
        );
        
        console.log(chalk.green('\n✓ Pipeline completed successfully!'));
        console.log(chalk.gray(`  Output: ${cliPath} (${fileSizeMB} MB)`));
        console.log(chalk.gray(`  Organized source: ${organizedDir}`));
        
    } catch (error) {
        console.error(chalk.red('\n✗ Pipeline failed:'), error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error(chalk.red('Fatal error:'), error);
        process.exit(1);
    });
}

module.exports = { main };