import { Role, EntityType, Enum } from "@replikit/permissions";
import { ManagementMemberPermission } from "@services/management";

@Enum("management")
export class ManagementMemberRole extends Role(EntityType.Member) {
    static readonly Admin = new ManagementMemberRole();

    static readonly Owner = new ManagementMemberRole({
        permissions: [
            ManagementMemberPermission.ManagePermissions,
            ManagementMemberPermission.ManageChannel
        ],
        fallbackRoles: [ManagementMemberRole.Admin]
    });
}
