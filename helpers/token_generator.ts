import CryptoJS from "crypto-js";
export const token_generator = () => {
  const token = `${crypto.randomUUID()}-${Date.now().toString(36)}`;
  const encrypted_token = CryptoJS.AES.encrypt(
    token,
    process.env.TOKEN_ENCRYPTION_CODE!
  ).toString();
  return {token,encrypted_token};
};

export const decrypted_token = (token: string) => {
    const decrypted_token = CryptoJS.AES.encrypt(
        token,
        process.env.TOKEN_ENCRYPTION_CODE!
      ).toString();
  return decrypted_token;
};
