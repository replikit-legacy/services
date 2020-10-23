import { Command } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { config } from "@replikit/core";
import { fromCode } from "@replikit/messages";
import { user } from "@replikit/storage";
import { connectConfirmationStorage, ProfileLocale } from "@services/profile";

export class ConnectCommand extends Command {
    name = "connect";

    user = user({ required: true });

    async execute(): Promise<CommandResult> {
        const { user } = this;

        const requestedUser = await this.getUser();
        const locale = this.getLocale(ProfileLocale);

        if (user._id === requestedUser._id) {
            return fromCode(locale.alreadyConnected);
        }

        const code = connectConfirmationStorage.createConfirmation(requestedUser, user);
        const prefix = config.commands?.prefix ?? "/";
        const command = `${prefix}profile accept ${code}`;
        return fromCode(locale.connectConfirmation(user.username, command));
    }
}
