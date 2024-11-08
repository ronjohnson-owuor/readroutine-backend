
export const token_generator = () => {
    const token = `${(crypto.randomUUID())}-${(Date.now().toString(36))}`;
    return token;
}