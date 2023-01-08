// eslint-disable-next-line prettier/prettier, no-irregular-whitespace
​module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
 };