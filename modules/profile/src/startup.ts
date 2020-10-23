import { createScope, updateConfig } from "@replikit/core";

updateConfig({ profile: { confirmationTimeout: 60000 } });

/** @internal */
export const logger = createScope("profile");
