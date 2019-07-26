import { GlideRecord } from "./GlideRecord";

interface IGlideElementProperties {
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

  constructor(name: string, display_value:string, value:string, url?: string) {
    this.__internalProperties = {
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

  getAttribute(attr: string): string {
    throw new Error("Not Implemented");
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
