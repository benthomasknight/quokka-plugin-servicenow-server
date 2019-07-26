

//import { GlideRecord } from "../GlideRecord";

declare module NodeJS  {
    interface Global {
        snow: {
          instance: string,
          username: string,
          password: string
        };
        GlideRecord: any;
    }
}
