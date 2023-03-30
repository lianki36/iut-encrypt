'use strict';

module.exports = {
    scheme: 'jwt',
    options: {
        keys: 'password-token-hyper-secret',
        verify: {
            aud: 'urn:audience:iut',
            iss: 'urn:issuer:iut',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {
            console.log(artifacts)
            return {
                isValid: true,
                credentials: artifacts.decoded.payload
            };
        }
    }
};
