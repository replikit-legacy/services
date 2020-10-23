import { descriptions } from "@replikit/help";
import { locales } from "@replikit/i18n";
import { ManagementLocale } from "@services/management";

locales.add("en", ManagementLocale, {
    users: "Users",
    noUsersFound: "No users found",
    channels: "Channels",
    noChannelsFound: "No channels found",
    channelAlreadyInitalized: "Channel already initalized.",
    channelSuccessfullyInitalized: user =>
        `Channel successfully initialized. ${user.username} assigned as admin.`,
    invalidRole: "Invalid role.",
    invalidPermission: "Invalid permission.",
    acceptableValues: "Acceptable values",
    userPermissionsUpdated: "User permissions updated.",
    notAMember: "User is not a member of the channel.",
    channelDeleted: "Channel deleted.",
    statistics: "Statistics",
    totalUsers: "Total users",
    totalChannels: "Total channels",
    channelUnavailable: "Channel unavailable",
    accounts: "Accounts",
    accountUnavailable: "Account unavailable"
});

descriptions.add("en", {
    channels: {
        list: "Displays the list of channels",
        init: "Initializes the current channel",
        delete: "Deletes the channel"
    },
    users: {
        list: "Displays the list of users",
        appoint: "Appoints the user to role",
        dismiss: "Dismisses the user from role",
        permit: "Gives permission to the user",
        revoke: "Revokes permission from the user"
    }
});
