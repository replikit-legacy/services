import { CommandContainer } from "@replikit/commands";
import { AppointMemberCommand } from "./appointMember";
import { AppointUserCommand } from "./appointUser";
import { DismissMemberCommand } from "./dismissMember";
import { DismissUserCommand } from "./dismissUser";
import { ListCommand } from "./list";
import { PermitMemberCommand } from "./permitMember";
import { PermitUserCommand } from "./permitUser";
import { RevokeMemberCommand } from "./revokeMember";
import { RevokeUserCommand } from "./revokeUser";

export class UsersCommand extends CommandContainer {
    name = "users";
    aliases = ["u"];
    default = "list";

    commands = [
        ListCommand,
        AppointMemberCommand,
        AppointUserCommand,
        DismissMemberCommand,
        DismissUserCommand,
        PermitMemberCommand,
        PermitUserCommand,
        RevokeMemberCommand,
        RevokeUserCommand
    ];
}
