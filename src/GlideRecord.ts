import { GlideQueryCondition } from './GlideQueryCondition';
import { JoinTypes, ConditionTypes, GetQueryParts } from './Utils/ConditionUtils';
import {ServiceNow} from './utils/ServiceNow';
import { GlideElement } from './GlideElement';

interface IQueryResponseElement {
  display_value: string,
  value: any,
  link?: string,
}

interface IGlideRecordInternalProperties {
  api: ServiceNow,
  table: string,
  conditions: Array<GlideQueryCondition>,
  setLimit: number,
  setWorkflow: boolean,
  setAbortAction: boolean,
  chooseWindow: [number, number, boolean],

  // Data on the current table
  data: {
    canRead: boolean,
    canCreate: boolean,
    canWrite: boolean,
    canDelete: boolean,

    data: Array<{
      [key:string]: IQueryResponseElement
    }>,
    count: number,
    currentIndex: number,
    columns: Array<string>
  }
}

interface IGlideRecord {
  __internalProperties:IGlideRecordInternalProperties;
  [key: string]: GlideElement|Function|IGlideRecordInternalProperties;
}

export class GlideRecord implements IGlideRecord {
  public __internalProperties: IGlideRecordInternalProperties;
  [key: string]: GlideElement|Function|IGlideRecordInternalProperties;

  constructor(table: string) {
    const SnowApi = new ServiceNow(global.snow.instance, global.snow.username, global.snow.password, table);
    
    // Place to store all basic configuration variables
    this.__internalProperties = {
      api: SnowApi,
      table: '',
      conditions: [],
      setLimit: 10,
      setWorkflow: true,
      setAbortAction: false,
      chooseWindow: [0,0,true],

      // Data on the current table
      data: {
        canRead: true,
        canCreate: true,
        canWrite: true,
        canDelete: true,
        data: [],
        count: 0,
        currentIndex: 0,
        columns: [],
      }
    };

    if(!table) {
      throw new Error('GlideRecord requires a table.');
    }
    this.__internalProperties.table = table;

    // Get table classes
    const classes = new ServiceNow(global.snow.instance, global.snow.username, global.snow.password, "sys_db_object");
    var apiTable = [table];
    while(true) {
      let superClass = classes.query(`name=${apiTable[apiTable.length - 1]}`, 1, ["super_class"]);
      if(!superClass[0].result[0].super_class.value) {
        break;
      }

      let superClassRecord = classes.query(`sys_id=${superClass[0].result[0].super_class.value}`, 1, ["name"]);
      // Get all parent tables
      apiTable.push(superClassRecord[0].result[0].name.value);
    }

    // Get this glide records columns
    const tableApi = new ServiceNow(global.snow.instance, global.snow.username, global.snow.password, "sys_dictionary");
    let res = tableApi.query(`nameIN${apiTable.join()}^active=true^elementISNOTEMPTY`, 1000, ["element"]);
    this.__internalProperties.data.columns = res[0].result.map((v: any) => {
      return v.element.value;
    });
  }

  addActiveQuery(): GlideQueryCondition {
    return this.addQuery('active', true);
  }

  addEncodedQuery(query: string): void {
    // Split each NewQuery
    this.__internalProperties.conditions.concat(query.split(JoinTypes.NewQuery)
      .map(part => {
        // Container for each individual Query
        let queryBuilder = new GlideQueryCondition();

        // Split on each or
        part.split(JoinTypes.Or)
          .map((orSplit, orIndex) => {
            // Split on each and
            orSplit.split(JoinTypes.And)
              // separate into parts
              .map(v => GetQueryParts(v))
              .forEach((v, andIndex) => {
                // Ignore invalid query parts
                if(!v) return;
                // Add or joining conditions where split (except the first one)
                if(!andIndex && orIndex > 0) return queryBuilder.addOrCondition(...v);

                // default and condition
                queryBuilder.addCondition(...v);
              })
          })
        return queryBuilder;
      }));
  }

  addFunction(func: any) {
    throw new Error('Not Implemented');
  }

  addJoinQuery(joinTable: string, primaryField: string, joinTableField: string) {
    throw new Error('Not Implemented');
  }

  addNotNullQuery(field: string) {
    return this.addQuery(field, ConditionTypes.NotEquals, 'NULL');
  }

  addNullQuery(field: string) {
    return this.addQuery(field, 'NULL');
  }

  addQuery(query: object|string): void;
  addQuery(field: object|string, value: any): GlideQueryCondition;
  addQuery(field: object|string, oper: ConditionTypes, value: any): GlideQueryCondition;
  addQuery(field: object|string, oper?: object|string|ConditionTypes, val?: any): GlideQueryCondition|void {
    if(oper === undefined && val === undefined) {
      return this.addEncodedQuery(field.toString());
    }
    if(val === undefined) {
      return this.addQuery(field, ConditionTypes.Equals, oper);
    }

    // Wrapper for conditions.
    let cond = new GlideQueryCondition();
    cond.addCondition(field, <ConditionTypes>oper, val);

    // Store it on the clide record
    this.__internalProperties.conditions.push(cond);

    // Allow users to add conditions to this specific query
    return cond;
  }

  canCreate() {
    
  }

  canDelete() {
    throw new Error('Not Implemented.');
  }

  canRead() {
    throw new Error('Not Implemented.');
  }

  canWrite() {
    throw new Error('Not Implemented.');
  }

  chooseWindow() {
    throw new Error('Not Implemented.');
  }

  dateNumericValue() {
    throw new Error('Not Implemented.');
  }

  deleteMultiple() {
    throw new Error('Not Implemented.');
  }

  deleteRecord() {
    throw new Error('Not Implemented.');
  }

  get(sysId: object|string): boolean;
  get(name: object|string, value: any): boolean;
  get(name: object|string, value?: any): boolean {
    this.__internalProperties.conditions = [];

    if(value) {
      this.addQuery(name.toString(), value);
    }
    else {
      this.addQuery("sys_id", name);
    }

    this.query()
    return this.__internalProperties.data.count > 0;
  }

  getAttribute(field: string) {
    throw new Error('Not Implemented.');
  }

  getClassDisplayValue() {
    throw new Error('Not Implemented.');
  }

  getDisplayValue() {
    throw new Error('Not Implemented.');
  }

  getED() {
    throw new Error('Not Implemented.');
  }

  getElement(field: string) {
    throw new Error('Not Implemented.');
  }

  getEncodedQuery() {
    return this.__internalProperties.conditions.map(v => v.toString()).join('');
  }

  getLabel() {
    throw new Error('Not Implemented.');
  }

  getLastErrorMessage() {
    throw new Error('Not Implemented.');
  }

  getLink() {
    throw new Error('Not Implemented.');
  }

  getRecordClassName() {
    return this.__internalProperties.table;
  }

  getRowCount() {
    throw new Error('Not Implemented.');
  }

  getTableName() {
    return this.__internalProperties.table;
  }

  getUniqueValue() {
    throw new Error('Not Implemented.');
  }

  getValue(name: string) {
    throw new Error('Not Implemented.');
  }

  hasNext(): boolean {
    if(this.__internalProperties.data.currentIndex >= this.__internalProperties.setLimit) {
      if(this.__internalProperties.data.count > this.__internalProperties.setLimit) {
        throw new Error(`Limit set to ${this.__internalProperties.setLimit} but more results were returned. Either increase the limit using setLimit or use a more specific query.`);
      }
      return false;
    }

    return this.__internalProperties.data.count > this.__internalProperties.data.currentIndex;
  }

  initialize() {
    throw new Error('Not Implemented.');
  }

  insert() {
    throw new Error('Not Implemented.');
  }

  isActionAborted() {
    throw new Error('Not Implemented.');
  }

  isEncodedQueryValid() {
    throw new Error('Not Implemented.');
  }

  isNewRecord() {
    throw new Error('Not Implemented.');
  }

  isValid() {
    throw new Error('Not Implemented.');
  }

  isValidField() {
    throw new Error('Not Implemented.');
  }

  isValidRecord() {
    throw new Error('Not Implemented.');
  }

  newRecord() {
    throw new Error('Not Implemented.');
  }

  _next() {
    this.next();
  }

  next() {
    if(!this.hasNext()) {
      return false;
    }

    this.__internalProperties.data.columns.forEach(c => {
      const row = this.__internalProperties.data.data[this.__internalProperties.data.currentIndex];

      if(typeof row[c] === "undefined") {
        // current user doesnt have read access to the column, so remove it from the list
        this.__internalProperties.data.columns = this.__internalProperties.data.columns.filter(v => v !== c);
        return;
      }

      const {display_value, value, link} = row[c];
      this[c] = new GlideElement(c, display_value, value, link);
    });

    this.__internalProperties.data.currentIndex++;
    return true;
  }

  operation() {
    throw new Error('Not Implemented.');
  }

  orderBy() {
    throw new Error('Not Implemented.');
  }

  orderByDesc() {
    throw new Error('Not Implemented.');
  }

  _query(): void;
  _query(field?: object|string, value?: object|string): void;
  _query(field?:object|string|undefined, value?: object|string|undefined): void {
    return this.query(field, value);
  }
  query(): void;
  query(field?: object|string, value?: object|string): void;
  query(field?:object|string|undefined, value?: object|string|undefined): void {
    // Reset all query related fields
    this.__internalProperties.data.currentIndex = 0;

    if(field !== undefined && value !== undefined) {
      this.addQuery(field, value);
    }
    
    //throw new Error("Not Implemented");
    let res = this.__internalProperties.api.query(this.getEncodedQuery(), this.__internalProperties.setLimit, this.__internalProperties.data.columns);

    this.__internalProperties.data.data = res[0].result;
    this.__internalProperties.data.count = Math.min(res[1], this.__internalProperties.setLimit);
  }

  setAbortAction(abort: boolean) {
    throw new Error('Not Implemented.');
  }

  setDateNumericValue(milliseconds: number) {
    throw new Error('Not Implemented.');
  }

  setLimit(max: number) {
    throw new Error('Not Implemented.');
  }

  setNewGuidValue(guid: string) {
    throw new Error('Not Implemented.');
  }

  setValue(field: object|string, value: any) {
    throw new Error('Not Implemented.');
  }

  setWorkflow(work: boolean) {
    throw new Error('Not Implemented.');
  }

  update(reason: string) {
    throw new Error('Not Implemented.');
  }

  updateMultiple() {
    throw new Error('Not Implemented.');
  }
}
