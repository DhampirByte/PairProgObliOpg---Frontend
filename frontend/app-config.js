export const authUrl = "https://musicrecordrestapi-hdh3dzf7d3gqc5g3.westeurope-01.azurewebsites.net/api/auth/login";
export const musicRecordsUrl = "https://musicrecordrestapi-hdh3dzf7d3gqc5g3.westeurope-01.azurewebsites.net/api/musicrecord";

export const tokenName = "userInfo";

export function getStoredUserInfo() {
    try {
        const userInfo = JSON.parse(localStorage.getItem(tokenName));
        console.log("Retrieved user info from localStorage", userInfo);
        return userInfo && userInfo.token ? userInfo : null;
    } catch {
        localStorage.removeItem(tokenName);
        return null;
    }
}

export function getErrorMessage(error) {
    const body = error.response?.data;

    if (typeof body === "string" && body.trim()) {
        return body;
    }
    if (body && typeof body === "object") {
        const message = body.message || body.detail || body.title || body.error;
        if (typeof message === "string" && message.trim()) {
            return message;
        }
        if (body.errors && typeof body.errors === "object") {
            const validationMessages = Object.values(body.errors).flat();
            if (validationMessages.length > 0) {
                return validationMessages.join(" ");
            }
        }
    }

    if (!error.response) {
        return "No response from the API. Check that it is running and allows this site's origin through CORS.";
    }

    return error.message || "An unexpected error occurred.";
}