import { SplitAllByAll, SortByLengthDesc } from './ArrayUtils';

/**
 * Join Types in an Encoded Query
 */
export enum JoinTypes {
  NewQuery = '^NQ',
  Or = '^OR',
  And = '^',
}
Object.freeze(JoinTypes);

/**
 * Join Types in an Encoded Query
 */
export enum ConditionTypes {
  Equals = '=',
  NotEquals = '!=',
  LessThan = '<',
  LessThanOrEqual = '<=',
  GreaterThan = '>',
  GreaterThanOrEqual = '>=',
  In = 'IN',
  StartsWith = 'STARTSWITH',
  EndsWith = 'ENDSWITH',
  Contains = 'CONTAINS',
  DoesNotContain = 'DOESNOTCONTAIN',
}
Object.freeze(JoinTypes);

export function GetQueryParts(query: string): [string, ConditionTypes, string]|null {
  const conditions = Object.values(ConditionTypes).sort(SortByLengthDesc);
  
  for(let i = 0; i < conditions.length; i++) {
    const spl = query.split(conditions[i]);

    if(spl.length > 1) {
      return [spl[0], conditions[i], spl[1]];
    }
  }

  return null;
}

