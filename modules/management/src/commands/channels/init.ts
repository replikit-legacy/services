import { Command } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { fromCode } from "@replikit/messages";
import { Channel, FallbackStrategy, Member } from "@replikit/storage";
import { ManagementLocale, ManagementMemberRole } from "@services/management";

export class InitCommand extends Command {
    name = "init";

    async execute(): Promise<CommandResult> {
        const locale = this.getLocale(ManagementLocale);

        const existing = await this.getChannel(FallbackStrategy.Undefined);
        if (existing) {
            return fromCode(locale.channelAlreadyInitalized);
        }

        const user = await this.getUser();

        const channels = this.connection.getRepository(Channel);
        const channel = channels.create({
            controller: this.controller.name,
            localId: this.channel.id
        });
        await channel.save();

        const members = this.connection.getRepository(Member);
        const member = members.create({
            _id: {
                controller: this.controller.name,
                channelId: this.channel.id,
                accountId: this.account.id
            },
            roles: [ManagementMemberRole.Owner.id]
        });
        await member.save();

        return fromCode(locale.channelSuccessfullyInitalized(user));
    }
}
