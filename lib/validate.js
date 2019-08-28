// Imports
const crypto = require('crypto');

class Validator {

    constructor() {
        let workingKey = 'big elephants';
        this.actualKey = crypto.createHash('md5').update(workingKey).digest();
        this.iv = Buffer.alloc(16, 0);
        this.cipherType = 'aes-128-cbc';
    }

    // Crypto functions
    encrypt(inputText) {
        const encrypter = crypto.createCipheriv(this.cipherType, this.actualKey, this.iv);
        let encrypted = encrypter.update(inputText, 'utf8', 'hex');
        encrypted += encrypter.final('hex');
        return encrypted;
    }

    decrypt(inputText) {
        const decrypter = crypto.createDecipheriv(this.cipherType, this.actualKey, this.iv);
        let decrypted = decrypter.update(inputText, 'hex', 'utf8');
        decrypted += decrypter.final('utf8');
        return decrypted;
    }

    hash(inputText) {
        const md5sum = crypto.createHash('md5');
        const output = md5sum.update(inputText).digest('hex');
        return output;
    }

    // Working functions
    do_validation(inputText) {
        // Check if URL is divisible by 32
        if (inputText.length % 32 == 0) {
            // Split URL into 32-char chunks
            let chunks = new Array();
            for (let i = 0; i < inputText.length; i += 32) {
                chunks[i / 32] = inputText.substring(i, i + 32);
            }

            // Decrypt 0th chunk for URL
            // Hash URL, check against 1st chunk
            let URL = this.decrypt(chunks[0]);

            let valid = true;
            let prevHash = this.hash(URL);

            // Hash 1st chunk, check against 2nd chunk...
            // Recursively ^
            for (let i = 1; i < chunks.length && valid; i++) {
                valid = (prevHash == chunks[i]);
                prevHash = this.hash(chunks[i]);
            }

            return valid;
        }
        return false;
    }

    generate(inputText, length) {
        let encrypted = this.encrypt(inputText);
        let previous = inputText;

        for (let i = 0; i < length; i++) {
            previous = this.hash(previous);
            encrypted += previous;
        }

        return encrypted;
    }
}

module.exports = Validator;