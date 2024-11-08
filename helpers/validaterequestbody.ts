export default function validateBodyRequest(body: any, params: string[]) {
    let result = { message: 'passed check', proceed: true };
    try {
        if (!body || typeof body !== "object") {
            throw new Error("Invalid request body.");
        }
        for (let param of params) {
            const [param_name, param_data_type] = param.split(":");
            if (!body[param_name] || (typeof body[param_name] === "string" && body[param_name].trim() === "")) {
                result = { message: `${param_name} cannot be null, undefined, or empty`, proceed: false };
                break;
            }
            if (!param_data_type) {
                throw new Error(`Missing data type for parameter "${param_name}".`);
            }
            if (typeof body[param_name] !== param_data_type) {
                result = { message: `${param_name} needs to be a ${param_data_type}`, proceed: false };
                break;
            }
        }
        return result;
    } catch (error) {
        return { message: `Error on our side, try again: ${error}`, proceed: false,};
    }
}
