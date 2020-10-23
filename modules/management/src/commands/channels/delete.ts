import { authorizeMember } from "@replikit/authorization";
import { Command } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { fromCode } from "@replikit/messages";
import { channel } from "@replikit/storage";
import { ManagementLocale, ManagementMemberPermission } from "@services/management";

export class DeleteCommand extends Command {
    name = "delete";

    middleware = [authorizeMember(ManagementMemberPermission.ManageChannel)];

    channelParam = channel({ name: "channel" });

    async execute(): Promise<CommandResult> {
        await this.channelParam.delete();

        const locale = this.getLocale(ManagementLocale);
        return fromCode(locale.channelDeleted);
    }
}
