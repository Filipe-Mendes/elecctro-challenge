import hapi from '@hapi/eslint-plugin';
import babelParser from '@babel/eslint-parser';  // Import babel parser

/** @type {import('eslint').Linter.Config} */
export default [
    // Directly include the recommended settings from hapi.configs.recommended
    ...hapi.configs.recommended,
    {
        languageOptions: {
            parser: babelParser,
            ecmaVersion: 2016,
            sourceType: 'module',
            globals: {
                es2016: true,
                node: true
            },
            parserOptions: {
                requireConfigFile: false
            }
        }
    }
];
