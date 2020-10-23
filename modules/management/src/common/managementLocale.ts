import { User } from "@replikit/storage";

export class ManagementLocale {
    static readonly namespace = "management";

    channelUnavailable: string;
    notAMember: string;
    users: string;
    noUsersFound: string;
    channels: string;
    noChannelsFound: string;
    channelAlreadyInitalized: string;
    invalidPermission: string;
    invalidRole: string;
    acceptableValues: string;
    userPermissionsUpdated: string;
    channelDeleted: string;
    statistics: string;
    totalUsers: string;
    totalChannels: string;
    accounts: string;
    accountUnavailable: string;

    channelSuccessfullyInitalized: (user: User) => string;
}
