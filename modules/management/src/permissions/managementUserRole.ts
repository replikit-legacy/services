import { Role, EntityType, Enum } from "@replikit/permissions";
import { ManagementUserPermission } from "@services/management";

@Enum("management")
export class ManagementUserRole extends Role(EntityType.User) {
    static readonly Admin = new ManagementUserRole({
        permissions: [
            ManagementUserPermission.ListAllUsers,
            ManagementUserPermission.ListAllChannels
        ]
    });

    static readonly SuperAdmin = new ManagementUserRole({
        permissions: [ManagementUserPermission.ManagePermissions],
        fallbackRoles: [ManagementUserRole.Admin]
    });
}
