import { Command } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { MessageBuilder } from "@replikit/messages";
import { EntityType } from "@replikit/permissions";
import { ManagementLocale, renderDisplayName, renderRoles } from "@services/management";

export class InfoCommand extends Command {
    name = "info";

    async execute(): Promise<CommandResult> {
        const user = await this.getUser();
        const locale = this.getLocale(ManagementLocale);

        const accountInfoPromises = user.accounts.map(async account => {
            const info = await account.getAccountInfo();
            const displayName = info ? renderDisplayName(info) : locale.accountUnavailable;
            return `[${account.controller}] ${displayName}`;
        });

        const roles = renderRoles(EntityType.User, user.roles);
        const header = `[${user._id}] [${roles}] ${user.username}`;
        const accountInfos = await Promise.all(accountInfoPromises);
        const text = `${header}\n${locale.accounts}:\n${accountInfos.join("\n")}`;
        return new MessageBuilder().addCode(text);
    }
}
