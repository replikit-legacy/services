import { authorizeMember } from "@replikit/authorization";
import { Command, required } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { fromCode } from "@replikit/messages";
import { MemberRole } from "@replikit/permissions";
import { member } from "@replikit/storage";
import { ManagementLocale, ManagementMemberPermission } from "@services/management";

export class AppointMemberCommand extends Command {
    name = "appoint";

    middleware = [authorizeMember(ManagementMemberPermission.ManagePermissions)];

    member = member({ channelRequired: true, userRequired: true });
    role = required(MemberRole);

    async execute(): Promise<CommandResult> {
        const { member } = this.member;

        member.appoint(this.role);
        await member.save();

        const locale = this.getLocale(ManagementLocale);
        return fromCode(locale.userPermissionsUpdated);
    }
}
