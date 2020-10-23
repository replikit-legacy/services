import { Command } from "@replikit/commands";
import { CommandResult } from "@replikit/commands/typings";
import { Condition } from "@replikit/core/typings";
import { fromCode } from "@replikit/messages";
import { Member, MemberRepository, User, UserRepository } from "@replikit/storage";
import {
    addPageFilter,
    isDirect,
    ManagementLocale,
    ManagementUserPermission,
    page,
    renderEntityList,
    renderMember,
    renderUser
} from "@services/management";

export class ListCommand extends Command {
    name = "list";

    page = page();

    async execute(): Promise<CommandResult> {
        const collection = this.connection.getCollection(User);
        const locale = this.getLocale(ManagementLocale);
        const user = await this.getUser();

        const listAllUsers =
            isDirect(this) && user.hasPermission(ManagementUserPermission.ListAllUsers);

        if (listAllUsers) {
            const query = addPageFilter(collection.find(), this.page);
            const users = await query.toArray();
            const total = await collection.estimatedDocumentCount();
            const message = renderEntityList(
                users.map(renderUser),
                this.page,
                total,
                locale.users,
                locale.noUsersFound
            );
            return fromCode(message);
        }

        const memberRepository = this.connection.getRepository(MemberRepository);

        const [members, totalMembers] = await memberRepository.queryAndCount(query => {
            addPageFilter(query, this.page);
            return query.filter({
                "_id.controller": this.controller.name,
                "_id.channelId": this.channel.id
            });
        });

        const userRepository = this.connection.getRepository(UserRepository);
        const users = await userRepository.findByAccounts(
            this.controller.name,
            members.map(x => x._id.accountId)
        );

        const message = renderEntityList(
            users.map(user => {
                const member = members.find(byAccount(user))!;
                return renderMember(member, user);
            }),
            this.page,
            totalMembers,
            locale.users,
            locale.noUsersFound
        );
        return fromCode(message);
    }
}

function byAccount(user: User): Condition<Member> {
    return x => user.accounts.findIndex(y => y.localId === x._id.accountId) !== -1;
}
