module.exports = {
  encrypt: async function encryptDES(data, secretkey) {
    try {
      var ciphertext = require("crypto-js")
        .DES.encrypt(data, secretkey.toString())
        .toString();
      return ciphertext;
    } catch (error) {
      console.error(error);
    }
  },
  decrypt: async function decryptDES(ciphertext, key) {
    try {
      var bytes = await require("crypto-js").DES.decrypt(ciphertext, key);
      var originalText = await bytes.toString(require("crypto-js").enc.Utf8);
      console.log("pop");
      return originalText;
    } catch (err) {
      console.error(err);
    }
  },
};
