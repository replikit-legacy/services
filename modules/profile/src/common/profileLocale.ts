export class ProfileLocale {
    static readonly namespace = "profile";

    youAlreadyUseThisUsername: string;
    usernameIsTaken: string;
    usernameUpdated: string;
    incorrectCode: string;
    operationCompleted: string;
    alreadyConnected: string;

    userConflict: (username: string) => string;
    connectConfirmation: (targetUsername: string, command: string) => string;
}
