import { Permission, EntityType, Enum } from "@replikit/permissions";

@Enum("management")
export class ManagementMemberPermission extends Permission(EntityType.Member) {
    static readonly ManagePermissions = new ManagementMemberPermission();
    static readonly ManageChannel = new ManagementMemberPermission();
}
