import { CommandContainer } from "@replikit/commands";
import { ListCommand } from "./list";
import { InitCommand } from "./init";
import { DeleteCommand } from "./delete";

export class ChannelsCommand extends CommandContainer {
    name = "channels";
    aliases = ["c"];
    default = "list";

    commands = [ListCommand, InitCommand, DeleteCommand];
}
