// Imports
const crypto = require('crypto');

// Instantiating values
const workingKey = 'big elephants';
const actualKey = crypto.createHash('md5').update(workingKey).digest();
const iv = Buffer.alloc(16, 0);
const cipherType = 'aes-128-cbc';

// Crypto functions
function encrypt(inputText) {
    const encrypter = crypto.createCipheriv(cipherType, actualKey, iv);
    let encrypted = encrypter.update(inputText, 'utf8', 'hex');
    encrypted += encrypter.final('hex');
    return encrypted;
}

function decrypt(inputText) {
    const decrypter = crypto.createDecipheriv(cipherType, actualKey, iv);
    let decrypted = decrypter.update(inputText, 'hex', 'utf8');
    decrypted += decrypter.final('utf8');
    return decrypted;
}

function hash(inputText) {
    const md5sum = crypto.createHash('md5');
    const output = md5sum.update(inputText).digest('hex');
    return output;
}

// Working functions
function main(inputText) {
    let encryptedInput = encrypt(inputText);
    console.log(encryptedInput);
    let plaintextValue = decrypt(encryptedInput);
    console.log(plaintextValue);

    // Check if URL is divisible by 32
    // Split URL into 32-char chunks
    // Decrypt 0th chunk for URL
    // Hash URL, check against 1st chunk
    // Hash 1st chunk, check against 2nd chunk...
    // Recursively ^
}


// Variables
const input = 'test value';

main(input);