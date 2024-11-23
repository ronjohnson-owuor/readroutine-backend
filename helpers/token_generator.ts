import CryptoJS from "crypto-js";
export const token_generator = () => {
  const token = `${crypto.randomUUID()}-${Date.now().toString(36)}`;
  const encrypted_token = CryptoJS.AES.encrypt(
    token,
    process.env.TOKEN_ENCRYPTION_CODE!
  ).toString();
  return encrypted_token;
};
