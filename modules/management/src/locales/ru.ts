import { descriptions } from "@replikit/help";
import { locales } from "@replikit/i18n";
import { ManagementLocale } from "@services/management";

locales.add("ru", ManagementLocale, {
    users: "Пользователи",
    noUsersFound: "Пользователи не найдены",
    channels: "Каналы",
    noChannelsFound: "Каналы не найдены",
    channelAlreadyInitalized: "Канал уже инициализирован.",
    channelSuccessfullyInitalized: user =>
        `Канал успешно инициализирован. ${user.username} назначен администратором.`,
    invalidRole: "Неправильная роль.",
    invalidPermission: "Неправильное разрешение.",
    acceptableValues: "Допустимые значения",
    userPermissionsUpdated: "Права пользователя обновлены.",
    notAMember: "Пользователь не является участником канала",
    channelDeleted: "Канал удален.",
    statistics: "Статистика",
    totalUsers: "Всего пользователей",
    totalChannels: "Всего каналов",
    channelUnavailable: "Канал недоступен",
    accounts: "Аккаунты",
    accountUnavailable: "Аккаунт недоступен"
});

descriptions.add("ru", {
    channels: {
        list: "Отображает список каналов",
        init: "Инициализирует текущий канал",
        delete: "Удаляет канал"
    },
    users: {
        list: "Отображает список пользователей",
        appoint: "Выдает пользователю роль",
        dismiss: "Забирает роль у пользователя",
        permit: "Выдает пользователю разрешение",
        revoke: "Отзывает разрешение пользователя"
    }
});
