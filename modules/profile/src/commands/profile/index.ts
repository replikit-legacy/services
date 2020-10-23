import { CommandContainer } from "@replikit/commands";
import { AcceptCommand } from "./accept";
import { ConnectCommand } from "./connect";
import { InfoCommand } from "./info";
import { UsernameCommand } from "./username";

export class ProfileCommand extends CommandContainer {
    name = "profile";
    default = "info";

    commands = [InfoCommand, UsernameCommand, ConnectCommand, AcceptCommand];
}
