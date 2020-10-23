import { descriptions } from "@replikit/help";
import { locales } from "@replikit/i18n";
import { ProfileLocale } from "@services/profile";

locales.add("en", ProfileLocale, {
    youAlreadyUseThisUsername: "You already use this username",
    usernameIsTaken: "The username is taken",
    usernameUpdated: "Username updated",
    incorrectCode: "Incorrect code or confirmation expired",
    operationCompleted: "Operation completed successfully",
    alreadyConnected: "Your account is already part of the specified profile",
    connectConfirmation: (targetUsername, command) => {
        return [
            `After this operation, you account will be transfered to the user ${targetUsername}.`,
            `Current profile will be deleted with all information that cannot be transferred automatically.`,
            `To confirm, execute the following command on behalf of one of ${targetUsername}'s accounts:`,
            command
        ].join("\n");
    },
    userConflict: username => {
        return [
            `Your username is already taken, so you have been assigned the name ${username}.`,
            "You can change it using this command: /profile username {username}"
        ].join("\n");
    }
});

descriptions.add("en", {
    profile: {
        info: "Displays the profile info",
        connect: "Connects current account to specified user",
        accept: "Accepts account connection request",
        username: "Changes username"
    }
});
