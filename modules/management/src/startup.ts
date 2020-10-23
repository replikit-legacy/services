import { converter } from "@replikit/commands";
import { createScope, updateConfig } from "@replikit/core";
import { permissionStorage, registerPermissionsConverters } from "@replikit/permissions";

/** @internal */
export const logger = createScope("management");

updateConfig({ management: { pageSize: 20, admins: [] } });

registerPermissionsConverters(converter, permissionStorage);
