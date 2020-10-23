import { hook } from "@replikit/core";
import { fromCode } from "@replikit/messages";
import { ChannelContext } from "@replikit/router";
import { ProfileLocale } from "@services/profile";

hook("storage:user:conflict", ({ context, user }) => {
    if (context instanceof ChannelContext) {
        const locale = context.getLocale(ProfileLocale);
        const message = locale.userConflict(user.username);
        void context.reply(fromCode(message));
    }
});
