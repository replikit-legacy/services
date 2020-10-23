import { Command, required } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { fromCode } from "@replikit/messages";
import { UserRepository } from "@replikit/storage";
import { ProfileLocale } from "@services/profile";

export class UsernameCommand extends Command {
    name = "username";

    username = required(String);

    async execute(): Promise<CommandResult> {
        const { username } = this;

        const locale = this.getLocale(ProfileLocale);
        const user = await this.getUser();

        if (user.username === username) {
            return fromCode(locale.youAlreadyUseThisUsername);
        }

        const userRepository = this.connection.getRepository(UserRepository);
        const existing = await userRepository.findByUsername(username);

        if (existing) {
            return fromCode(locale.usernameIsTaken);
        }

        user.username = username;
        await user.save();

        return fromCode(locale.usernameUpdated);
    }
}
