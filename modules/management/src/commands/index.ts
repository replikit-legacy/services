import { commands } from "@replikit/commands";
import { ChannelsCommand } from "./channels";
import { UsersCommand } from "./users";

commands.register(ChannelsCommand);
commands.register(UsersCommand);
