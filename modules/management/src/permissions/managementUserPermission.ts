import { Permission, EntityType, Enum } from "@replikit/permissions";

@Enum("management")
export class ManagementUserPermission extends Permission(EntityType.User) {
    static readonly ManagePermissions = new ManagementUserPermission();
    static readonly ListAllUsers = new ManagementUserPermission();
    static readonly ListAllChannels = new ManagementUserPermission();
}
