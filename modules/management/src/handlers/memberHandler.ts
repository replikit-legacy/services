import { config } from "@replikit/core";
import { MemberContext, router } from "@replikit/router";
import { NextHandler } from "@replikit/router/typings";
import { FallbackStrategy } from "@replikit/storage";
import { ManagementUserRole } from "@services/management";

async function ensureMemberCreated(context: MemberContext, next: NextHandler): Promise<unknown> {
    const user = await context.getUser(FallbackStrategy.Create);
    if (config.management.admins.includes(user.username)) {
        if (!user.hasRole(ManagementUserRole.SuperAdmin)) {
            user.appoint(ManagementUserRole.SuperAdmin);
            await user.save();
        }
    }
    await context.getMember(FallbackStrategy.Create);
    return next();
}

router.of("message:received").use(ensureMemberCreated);
router.of("member:joined").use(ensureMemberCreated);
