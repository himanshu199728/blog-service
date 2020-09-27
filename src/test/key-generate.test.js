'use strict';
const assert = require('assert');
const { generateKeyPairSync } = require('crypto');
const fs = require('fs');

describe('Should generate async cypher keys', () => {
    it('should generate keys', () => {

        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'Commutec@123'
            }
        });
        fs.writeFileSync('public.pem', publicKey);
        fs.writeFileSync('private.pem', privateKey);
        assert.equal(publicKey != null, true, 'Successfully created public key');
        assert.equal(privateKey != null, true, 'Successfully created private key');
    })
});
