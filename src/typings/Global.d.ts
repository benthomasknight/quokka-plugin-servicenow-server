

//import { GlideRecord } from "../GlideRecord";

declare module NodeJS  {
    interface Global {
        quokkaSnowConfig: {
          instance: string,
          username: string,
          password: string
        };
        GlideRecord: any;
    }
}
