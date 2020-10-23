import "@replikit/core/typings";
import { ManagementConfiguration } from "@services/management/typings";

declare module "@replikit/core/typings/configuration" {
    export interface Configuration {
        management?: ManagementConfiguration;
    }
}
