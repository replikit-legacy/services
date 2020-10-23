import { authorizeUser } from "@replikit/authorization";
import { Command, required } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { fromCode } from "@replikit/messages";
import { UserRole } from "@replikit/permissions";
import { User } from "@replikit/storage";
import { ManagementLocale, ManagementUserPermission } from "@services/management";

export class DismissUserCommand extends Command {
    name = "dismiss";

    middleware = [authorizeUser(ManagementUserPermission.ManagePermissions)];

    user = required(User);
    role = required(UserRole);

    async execute(): Promise<CommandResult> {
        const { user, role } = this;

        user.dismiss(role);
        await user.save();

        const locale = this.getLocale(ManagementLocale);
        return fromCode(locale.userPermissionsUpdated);
    }
}
