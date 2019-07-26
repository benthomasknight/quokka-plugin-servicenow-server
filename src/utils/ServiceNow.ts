import request, {OptionsWithUri} from 'request-promise-native';
import encode from 'encodeurl';
import { loopWhile } from 'deasync';

interface IServiceNow {
  instance: string,
  username: string,
  password: string,
  table: string,
}

export class ServiceNow implements IServiceNow {
  constructor(public instance: string, public username: string, public password: string, public table: string) {}

  query(query: string, limit: number, fields: Array<string>): [{[key: string]: any}, number] {
    let url = `https://${this.instance}.service-now.com/api/now/v2/table/${this.table}?sysparm_query=${encode(query)}&sysparm_limit=${limit}&sysparm_display_value=all&sysparm_fields=${fields&&fields.join()}`;

    const requestOptions: OptionsWithUri = {
      uri: url,
      auth: {
        username: this.username,
        password: this.password,
      },
      json: true,
      resolveWithFullResponse: true
    }

    let results: {[key: string]: any} = {};
    let rows: number = 0;
    request(requestOptions).then((res) => {
      results = res.body;
      rows = res.headers["x-total-count"];
    }).catch((err) => {
      results = {
        result: []
      };
    });
    loopWhile(() => typeof results.result === "undefined");

    return [results, Number(rows)];
  }
}
