import { User, Channel, Member } from "@replikit/storage";
import { Cursor } from "mongodb";
import { config, ChannelType } from "@replikit/core";
import { ChannelInfo, AccountInfo } from "@replikit/core/typings";
import { PlainObject } from "@replikit/storage/typings";
import { commandComposer, createParameterAccessor } from "@replikit/commands";
import { permissionStorage, EntityType } from "@replikit/permissions";
import { ManagementLocale } from "@services/management";
import { CommandContext } from "@replikit/commands/typings";

export function renderUser(user: PlainObject<User>): string {
    const accountSection = user.accounts.map(x => x.controller).join(", ");
    const roleSection = renderRoles(EntityType.User, user.roles);
    return `[${user._id}] [${accountSection}] [${roleSection}] ${user.username}`;
}

export function renderMember(member: Member, user: User): string {
    const roleSection = renderRoles(EntityType.Member, member.roles);
    return `[${user._id}] [${roleSection}] ${user.username}`;
}

export function renderChannel(
    locale: ManagementLocale,
    channel: Channel,
    info?: ChannelInfo,
    roles?: string[]
): string {
    const roleSection = renderRoles(EntityType.Member, roles);
    const title = info?.title ?? locale.channelUnavailable;
    return `[${channel._id}] [${roleSection}] [${channel.controller}] ${title}`;
}

export function renderRoles(type: EntityType, roles?: string[]): string {
    if (!roles) {
        return "None";
    }
    if (!roles.length) {
        return "User";
    }
    const roleInfos = permissionStorage.roles.filter(x => roles.includes(x.id) && x.type === type);
    return roleInfos.map(x => x.name).join(", ") || "User";
}

export function renderList(items: string[], title: string): string {
    return `${title}:\n${items.map(x => `- ${x}`).join("\n")}`;
}

export function renderEntityList(
    items: string[],
    page: number,
    totalItems: number,
    title: string,
    emptyMessage: string
): string {
    if (!items.length) {
        return emptyMessage;
    }
    const totalPages = Math.ceil(totalItems / config.management.pageSize);
    return `${title} [${page}/${totalPages}]:\n${items.join("\n")}`;
}

export function addPageFilter<T>(query: Cursor<T>, page: number): Cursor<T> {
    const pageSize = config.management.pageSize;
    return query.skip((page - 1) * pageSize).limit(pageSize);
}

export function page(): number {
    return commandComposer.compose((builder, field) => {
        builder.optional(field, Number, { positive: true, default: 1 });
        return { get: createParameterAccessor(field) };
    });
}

export function isDirect(context: CommandContext): boolean {
    return context.channel.type === ChannelType.Direct;
}

function isChannelInfo(info: AccountInfo | ChannelInfo): info is ChannelInfo {
    return "type" in info;
}

export function renderDisplayName(info: AccountInfo | ChannelInfo): string {
    if (isChannelInfo(info)) {
        return info.title ?? "Unnamed";
    }
    if (info.firstName) {
        if (info.lastName) {
            return `${info.firstName} ${info.lastName}`;
        }
        return `${info.firstName}`;
    }
    return info.username ?? "Unnamed";
}
