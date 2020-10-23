import { authorizeUser } from "@replikit/authorization";
import { Command, required } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { fromCode } from "@replikit/messages";
import { UserPermission } from "@replikit/permissions";
import { User } from "@replikit/storage";
import { ManagementLocale, ManagementUserPermission } from "@services/management";

export class PermitUserCommand extends Command {
    name = "permit";

    middleware = [authorizeUser(ManagementUserPermission.ManagePermissions)];

    user = required(User);
    permission = required(UserPermission);

    async execute(): Promise<CommandResult> {
        const { user, permission } = this;

        user.permit(permission);
        await user.save();

        const locale = this.getLocale(ManagementLocale);
        return fromCode(locale.userPermissionsUpdated);
    }
}
