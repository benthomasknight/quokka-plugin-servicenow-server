import {startOfMonth, addMonths, format, startOfWeek, addWeeks, startOfISOWeek, startOfYear, addYears, startOfQuarter, startOfDay, endOfDay, parse, addDays, endOfMonth, endOfWeek, endOfYear, endOfQuarter, addHours, startOfHour, endOfHour, startOfMinute, addMinutes, endOfMinute, addQuarters} from 'date-fns';
import { format as StringFormat } from './utils/StringUtils';
import { ConditionTypes } from './Utils/ConditionUtils';
import { GlideRecord } from './GlideRecord';

export class GlideSystem {
  addErrorMessage(message: any): void {
    console.error(message.toString())
  }
  addInfoMessage(message: any): void {
    console.info(message.toString())
  }
  base64Decode(source: string): string {
    return atob(source);
  }
  base64Encecode(source: string): string {
    return btoa(source);
  }
  beginningOfLastMonth(): string {
    return format(startOfMonth(addMonths(new Date(), -1)), "YYYY-MM-DD HH:mm:ss");
  }
  beginningOfLastWeek(): string {
    return format(startOfWeek(addWeeks(new Date(), -1)), "YYYY-MM-DD HH:mm:ss");
  }
  beginningOfNextMonth(): string {
    return format(startOfMonth(addMonths(new Date(), 1)), "YYYY-MM-DD HH:mm:ss");
  }
  beginningOfNextWeek(): string {
    return format(startOfWeek(addWeeks(new Date(), 1)), "YYYY-MM-DD HH:mm:ss");
  }
  beginningOfNextYear(): string {
    return format(startOfYear(addYears(new Date(), 1)), "YYYY-MM-DD HH:mm:ss");
  }
  beginningOfThisMonth(): string {
    return format(startOfMonth(new Date()),"YYYY-MM-DD HH:mm:ss");
  }
  beginningOfThisQuarter(): string {
    return format(startOfQuarter(new Date()),"YYYY-MM-DD HH:mm:ss");
  }
  beginningOfThisWeek(): string {
    return format(startOfWeek(new Date()),"YYYY-MM-DD HH:mm:ss");
  }
  beginningOfThisYear(): string {
    return format(startOfYear(new Date()), "YYYY-MM-DD HH:mm:ss");
  }
  dateGenerate(date: string, range: 'start'|'end'|string): string {
    if(range == 'start') return format(startOfDay(new Date()), "YYYY-MM-DD HH:mm:ss");

    if(range == 'end') return format(endOfDay(new Date()), "YYYY-MM-DD HH:mm:ss");

    return format(parse(`${date} ${range}`), "YYYY-MM-DD HH:mm:ss");
  }
  daysAgo(days: number): string {
    return format(addDays(new Date(), -days), "YYYY-MM-DD HH:mm:ss");
  }
  daysAgoEnd(days: number): string {
    return format(endOfDay(addDays(new Date(), -days)), "YYYY-MM-DD HH:mm:ss");
  }
  daysAgoStart(days: number): string {
    return format(startOfDay(addDays(new Date(), -days)), "YYYY-MM-DD HH:mm:ss");
  }
  debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void {
    console.debug(StringFormat(message, parm1, parm2, parm3, parm4, parm5));
  }
  endOfLastMonth(): string {
    return format(endOfMonth(addMonths(new Date(), -1)), "YYYY-MM-DD HH:mm:ss");
  }
  endOfLastWeek(): string {
    return format(endOfWeek(addWeeks(new Date(), -1)), "YYYY-MM-DD HH:mm:ss");
  }
  endOfLastYear(): string {
    return format(endOfYear(addYears(new Date(), -1)), "YYYY-MM-DD HH:mm:ss");
  }
  endOfNextMonth(): string {
    return format(endOfMonth(addMonths(new Date(), 1)), "YYYY-MM-DD HH:mm:ss");
  }
  endOfNextWeek(): string {
    return format(endOfWeek(addWeeks(new Date(), 1)), "YYYY-MM-DD HH:mm:ss");
  }
  endOfNextYear(): string {
    return format(endOfYear(addYears(new Date(), 1)), "YYYY-MM-DD HH:mm:ss");
  }
  endOfThisMonth(): string {
    return format(endOfMonth(new Date()), "YYYY-MM-DD HH:mm:ss");
  }
  endOfThisQuarter(): string {
    return format(endOfQuarter(new Date()), "YYYY-MM-DD HH:mm:ss");
  }
  endOfThisWeek(): string {
    return format(endOfWeek(new Date()), "YYYY-MM-DD HH:mm:ss");
  }
  endOfThisYear(): string {
    return format(endOfYear(new Date()), "YYYY-MM-DD HH:mm:ss");
  }
  error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void {
    console.error(StringFormat(message, parm1, parm2, parm3, parm4, parm5));
  }
  eventQueue(name: string, instance: GlideRecord, parm1?: string, parm2?: string, queue?: string): void {
    throw new Error('Not implemented');
  }
  eventQueueScheduled(name: string, instance: GlideRecord, parm1?: string, parm2?: string, expiration?: any): void {
    throw new Error('Not implemented');
  }
  executeNow(job: GlideRecord): string {
    throw new Error('Not implemented');
  }
  generateGUID(): string {
    throw new Error('Not implemented');
  }
  getCallerScopeName(): string {
    throw new Error('Not implemented');
  }
  getCssCacheVersionString(): string {
    throw new Error('Not implemented');
  }
  getCurrentApplicationId(): string {
    throw new Error('Not implemented');
  }
  getCurrentScopeName(): string {
    throw new Error('Not implemented');
  }
  getErrorMessages(): string {
    throw new Error('Not implemented');
  }
  getEscapedMessage(id: string, ...args: any[]): string {
    throw new Error('Not implemented');
  }
  getMessage(id: string, ...args: any[]): string {
    return StringFormat(id, ...args);
  }
  getProperty(key: string, alt: any): string {
    return alt.toString();
  }
  getSession(): string {
    throw new Error('Not implemented');
  }
  getSessionID(): string {
    throw new Error('Not implemented');
  }
  getSessionToken(): string {
    throw new Error('Not implemented');
  }
  getTimeZoneName(): string {
    throw new Error('Not implemented');
  }
  getUrlOnStack(): string {
    throw new Error('Not implemented');
  }
  getUser(): GlideRecord {
    let gr = new GlideRecord('sys_user');
    gr.addQuery('sys_id', ConditionTypes.Dynamicly, 'bdcb83a85f220100a9ad2572f2b4773d');
    gr.query();

    if(!gr.next()) {
      throw new Error('User not found');
    }

    throw new Error("Only half implemented");
    return gr;
  }
  getUserDisplayName(): string {
    throw new Error('Not implemented');
  }
  getUserID(): string {
    throw new Error('Not implemented');
  }
  getUserName(): string {
    throw new Error('Not implemented');
  }
  hasRole(role: any): string {
    throw new Error('Not implemented');
  }
  hoursAgo(hours: number): string {
    return format(addHours(new Date(), -hours), 'YYYY-MM-DD HH:mm:ss');
  }
  hoursAgoEnd(hours: number): string {
    return format(endOfHour(addHours(new Date(), -hours)), 'YYYY-MM-DD HH:mm:ss');
  }
  hoursAgoStart(hours: number): string {
    return format(startOfHour(addHours(new Date(), -hours)), 'YYYY-MM-DD HH:mm:ss');
  }
  include(name: string): boolean {
    throw new Error("Not implemented");
  }
  info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void {
    console.info(StringFormat(message, parm1, parm2, parm3, parm4, parm5));
  }
  isDebugging(): boolean {
    throw new Error("Not implemented");
  }
  isInteractive(): boolean {
    throw new Error("Not implemented");
  }
  isLoggedIn(): boolean {
    throw new Error("Not implemented");
  }
  isMobile(): boolean {
    throw new Error("Not implemented");
  }
  minuteAgoEnd(minutes: number): string {
    return format(endOfMinute(addMinutes(new Date(), -minutes)), 'YYYY-MM-DD HH:mm:ss');
  }
  minuteAgoStart(minutes: number): string {
    return format(startOfMinute(addMinutes(new Date(), -minutes)), 'YYYY-MM-DD HH:mm:ss');
  }
  minuteAgo(minutes: number): string {
    return format(addMinutes(new Date(), -minutes), 'YYYY-MM-DD HH:mm:ss');
  }
  monthsAgoStart(months: number): string {
    return format(startOfMonth(addMonths(new Date(), -months)), 'YYYY-MM-DD HH:mm:ss');
  }
  nil(o: any): boolean {
    return o === undefined || o === null || o === '';
  }
  quartersAgoEnd(quarters: number): string {
    return format(endOfQuarter(addQuarters(new Date(), -quarters)), 'YYYY-MM-DD HH:mm:ss');
  }
  quartersAgoStart(quarters: number): string {
    return format(startOfQuarter(addQuarters(new Date(), -quarters)), 'YYYY-MM-DD HH:mm:ss');
  }
  setProperty(key: string, value: string, desc: string): void {
    throw new Error('Not implemented');
  }
  setRedirect(o: any): void {
    throw new Error('Not implemented');
  }
  tableExists(table: string): boolean {
    let gr = new GlideRecord('sys_db_object');
    gr.addQuery('name', table);
    gr.query();

    return gr.hasNext();
  }
  urlDecode(url: string): string {
    return decodeURIComponent(url);
  }
  urlEncode(url: string): string {
    return encodeURIComponent(url);
  }
  warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void {
    console.warn(StringFormat(message, parm1, parm2, parm3, parm4, parm5));
  }
  xmlToJSON(url: string): string {
    throw new Error('Not implemented');
  }
  yearsAgo(years: number): string {
    return format(addYears(new Date(), -years), 'YYYY-MM-DD HH:mm:ss');
  }
  yesterday(): string {
    return format(addDays(new Date(), -1), 'YYYY-MM-DD HH:mm:ss');
  }
}


