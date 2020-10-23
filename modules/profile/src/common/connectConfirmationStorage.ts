import { config } from "@replikit/core";
import { User } from "@replikit/storage";

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export class ConnectConfirmationStorage {
    private readonly confirmationMap = new Map<string, number>();

    private createConfirmationKey(targetUser: User, code: number): string {
        return `${targetUser._id}:${code}`;
    }

    createConfirmation(requestedUser: User, targetUser: User): number {
        const code = getRandomInt(100000, 999999);
        const key = this.createConfirmationKey(targetUser, code);
        this.confirmationMap.set(key, requestedUser._id);
        setTimeout(
            this.confirmationMap.delete.bind(this.confirmationMap, key),
            config.profile.confirmationTimeout
        );
        return code;
    }

    getRequestedUserId(targetUser: User, code: number): number | undefined {
        const key = this.createConfirmationKey(targetUser, code);
        const userId = this.confirmationMap.get(key);
        this.confirmationMap.delete(key);
        return userId;
    }
}

export const connectConfirmationStorage = new ConnectConfirmationStorage();
