import { descriptions } from "@replikit/help";
import { locales } from "@replikit/i18n";
import { ProfileLocale } from "@services/profile";

locales.add("ru", ProfileLocale, {
    youAlreadyUseThisUsername: "Вы уже используете это имя пользователя",
    usernameIsTaken: "Имя пользователя занято",
    usernameUpdated: "Имя пользователя обновлено",
    incorrectCode: "Указан неверный код или время подтверждения истекло",
    operationCompleted: "Операция успешно завершена",
    alreadyConnected: "Ваш аккаунт уже является частью указанного профиля",
    connectConfirmation: (targetUsername, command) => {
        return [
            `После этой операции ваш аккаунт будут передан пользователю ${targetUsername}.`,
            `Текущий профиль будет удален вместе со всей информацией, которую не удастся автоматически перенести.`,
            `Для подтверждения выполните следующую команду от имени одного из аккаунтов пользователя ${targetUsername}:`,
            command
        ].join("\n");
    },
    userConflict: username => {
        return [
            `Ваше имя пользователя занято, поэтому вам присвоено имя ${username}.`,
            "Вы можете сменить его используя команду: /profile username {username}"
        ].join("\n");
    }
});

descriptions.add("ru", {
    profile: {
        info: "Отображает информацию о профиле",
        connect: "Подключает текущий профиль к указанному пользователю",
        accept: "Принимает запрос на подключение профиля",
        username: "Изменяет имя пользователя"
    }
});
