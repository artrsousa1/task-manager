import { settings } from "./settings";

export const settingsWithAuth = (accessToken?: string) => {
    return {
        ...settings,
        headers: {
            ...settings.headers,
            Authorization: `Bearer ${accessToken}`,
        }
    }
}