import { GlideRecord } from "./GlideRecord";
import { parse } from "date-fns";
import { ServiceNow } from "./utils/ServiceNow";

interface IGlideElementProperties {
  table: string,
  display_value: string,
  value: string,
  previous: string,
  name: string,
  url?: string,
}

interface IGlideElement {
  __internalProperties: IGlideElementProperties;
}

export class GlideElement implements IGlideElement {
  public __internalProperties: IGlideElementProperties;

  constructor(table: string, name: string, display_value:string, value:string, url?: string) {
    this.__internalProperties = {
      table: table,
      display_value: display_value,
      value: value,
      previous: value,
      name: name,
      url: url,
    }
  }

  canCreate(): boolean {
    return true;
  }

  canRead(): boolean {
    return true;
  }

  canWrite(): boolean {
    return true;
  }

  changes(): boolean {
    return this.__internalProperties.value !== this.__internalProperties.previous;
  }

  changesFrom(previous: any): boolean {
    if(!this.changes()) {
      return false;
    }
    return this.__internalProperties.previous == previous.toString();
  }

  changesTo(current: any): boolean {
    if(!this.changes()) {
      return false;
    }
    return this.__internalProperties.value == current.toString();
  }

  dateNumericValue(): number|undefined {
    return parse(this.__internalProperties.value).getTime();
  }

  getAttribute(attr: string): string {
    // Note: Not tested yet.
    let sn = new ServiceNow(global.snow.instance, global.snow.username, global.snow.password, 'sys_schema_attribute_m2m')
    let res = sn.query(`schema.element=${this.__internalProperties.name}^schema.name=${this.__internalProperties.table}^attribute.name=${attr}`, 1, ['value']);

    if(res[1] > 0) {
      return res[0].result.value.value;
    }
    return '';
  }

  getBooleanAttribute(attr: string): boolean {
    return this.getAttribute(attr) == "true";
  }

  getChoices(): Array<string>;
  getChoices(dependent?: string): Array<string> {
    throw new Error("Not Implemented");
  }

  getChoiceValue(): string {
    throw new Error("Not Implemented");
  }

  getDecryptedValue(): string {
    throw new Error("Not Implemented");
  }

  getDisplayValue(): string {
    return this.__internalProperties.display_value;
  }

  getED(): string {
    throw new Error("Not Implemented");
  }

  getGlobalDisplayValue(): string {
    throw new Error("Not Implemented");
  }

  getHTMLValue(): string {
    throw new Error("Not Implemented");
  }

  getJournalEntry(recent: number): string {
    throw new Error("Not Implemented");
  }

  getLabel(): string {
    throw new Error("Not Implemented");
  }

  getName(): string {
    return this.__internalProperties.name;
  }

  getReferenceTable(): string {
    throw new Error("Not Implemented");
  }

  getRefRecord(): GlideRecord {
    throw new Error("Not Implemented");
  }

  getTableName(): string {
    throw new Error("Not Implemented");
  }

  nil(): boolean {
    return this.__internalProperties.value == null || this.__internalProperties.value == '';
  }

  setDateNumericValue(ms: number): string {
    throw new Error("Not Implemented");
  }

  setDisplayValue(value: object|string): string {
    throw new Error("Not Implemented");
  }

  setError(errorMessage: string): void {
    throw new Error("Not Implemented");
  }

  setPhoneNumber(phone: object|string, strict: boolean): void {
    throw new Error("Not Implemented");
  }

  setValue(value: object|string): void {
    //throw new Error("Not Implemented");
    this.__internalProperties.value = value.toString();
  }

  toString(): string {
    return this.__internalProperties.value.toString();
  }
}
