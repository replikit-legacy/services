import { Command, required } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { fromCode } from "@replikit/messages";
import { StorageLocale, User } from "@replikit/storage";
import { connectConfirmationStorage, ProfileLocale } from "@services/profile";

export class AcceptCommand extends Command {
    name = "accept";

    code = required(Number, { positive: true, min: 100000, max: 999999 });

    async execute(): Promise<CommandResult> {
        const locale = this.getLocale(ProfileLocale);

        const user = await this.getUser();
        const requestedUserId = connectConfirmationStorage.getRequestedUserId(user, this.code);

        if (!requestedUserId) {
            return fromCode(locale.incorrectCode);
        }

        const userRepository = this.connection.getRepository(User);
        const requestedUser = await userRepository.findOne({ _id: requestedUserId });

        if (!requestedUser) {
            const storageLocale = this.getLocale(StorageLocale);
            return fromCode(storageLocale.userNotFound);
        }

        user.accounts.push(...requestedUser.accounts);

        await user.save();
        await requestedUser.delete();

        return fromCode(locale.operationCompleted);
    }
}
