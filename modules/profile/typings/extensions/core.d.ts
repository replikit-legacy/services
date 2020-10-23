import "@replikit/core/typings";
import { ProfileConfiguration } from "@services/profile/typings";

declare module "@replikit/core/typings/configuration" {
    export interface Configuration {
        profile?: ProfileConfiguration;
    }
}
