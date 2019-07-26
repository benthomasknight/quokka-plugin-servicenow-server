import {ConditionTypes, JoinTypes} from './Utils/ConditionUtils';

interface IGlideQueryConditionsInstance {
  conditions: Array<any>;
}

interface IGlideQueryConditions {
  __instanceProperties:IGlideQueryConditionsInstance;
}

/**
 * Custom object to hold conditions
 */
export class GlideQueryCondition implements IGlideQueryConditions {
  __instanceProperties: IGlideQueryConditionsInstance = {
      conditions: [],
    };

  constructor() {}

  addCondition(name: object|string, oper: ConditionTypes, value: any): GlideQueryCondition {
    // Default to equals
    if(value === undefined || value === null) {
      return this.addCondition(name, ConditionTypes.Equals, oper);
    }

    this.__instanceProperties.conditions.push({
      field: name.toString(),
      condition: oper,
      value: value,
      join: JoinTypes.And,
    });

    return this;
  }

  addOrCondition(name: object|string, oper: ConditionTypes, value: any): GlideQueryCondition {
    // Default to equals
    if(value === undefined || value === null) {
      return this.addOrCondition(name, ConditionTypes.Equals, oper);
    }

    this.__instanceProperties.conditions.push({
      field: name.toString(),
      condition: oper,
      value: value,
      join: JoinTypes.Or,
    });

    return this;
  }

  toString(): string {
    return this.__instanceProperties.conditions
      .map(v => v.join + v.field + v.condition + v.value)
      .join('');
  }
}
