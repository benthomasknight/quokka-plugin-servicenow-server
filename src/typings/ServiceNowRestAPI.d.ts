declare module 'servicenow-rest-api' {
  export default class sn {
    constructor(instance: string, username: string, password: string);

    Authenticate(): void;

    getSampleData(table: string, callback: (res:any)=>any): void;

    getTableData(fields: Array<string>, filters: Array<string>, table: string, callback: (res:any)=>any): void;

    getSysId(table: string, number: string, callback: (res:any)=>any): void;

    createNewTask(data: {[key:string]: any}, table: string, callback: (res:any)=>any): void;

    UpdateTask(table: string, number: string, data: {[key:string]: any}, callback: (res:any)=>any): void;

    DeleteTask(table: string, number: string, callback: (res:any)=>any): void;
  }
}
