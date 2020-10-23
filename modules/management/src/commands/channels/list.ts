import { Command } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { Condition } from "@replikit/core/typings";
import { fromCode } from "@replikit/messages";
import { Channel, Member, User } from "@replikit/storage";
import { PlainObject } from "@replikit/storage/typings";
import {
    addPageFilter,
    isDirect,
    ManagementLocale,
    ManagementUserPermission,
    page,
    renderChannel,
    renderEntityList
} from "@services/management";
import { FilterQuery } from "mongodb";

export class ListCommand extends Command {
    name = "list";

    page = page();

    async execute(): Promise<CommandResult> {
        const user = await this.getUser();
        const locale = this.getLocale(ManagementLocale);

        const memberCollection = this.connection.getCollection(Member);
        const memberQuery = memberCollection.find({
            $or: user.accounts.map(x => ({
                "_id.controller": x.controller,
                "_id.accountId": x.localId
            }))
        });

        const members = await memberQuery.toArray();
        if (!members.length) {
            return fromCode(locale.noChannelsFound);
        }

        const filter = this.createFilter(user, members);

        const channelRepository = this.connection.getRepository(Channel);
        const channels = await channelRepository.query(q => {
            addPageFilter(q, this.page);
            return q.filter(filter);
        });

        const total = await channelRepository.collection.estimatedDocumentCount(filter);

        const items = channels.map(async channel => {
            const member = members.find(byChannel(channel));
            const info = await channel.getChannelInfo();
            return renderChannel(locale, channel, info, member?.roles);
        });

        const message = renderEntityList(
            await Promise.all(items),
            this.page,
            total,
            locale.channels,
            locale.noChannelsFound
        );
        return fromCode(message);
    }

    private createFilter(user: User, members: PlainObject<Member>[]): FilterQuery<Member> {
        if (isDirect(this) && user.hasPermission(ManagementUserPermission.ListAllChannels)) {
            return {};
        }

        return {
            $or: members.map(x => ({
                controller: x._id.controller,
                localId: x._id.channelId
            }))
        };
    }
}

function byChannel(channel: Channel): Condition<PlainObject<Member>> {
    return x => x._id.controller === channel.controller && x._id.channelId === channel.localId;
}
