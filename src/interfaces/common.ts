export interface IUnitItem {
  id: string;
  title: string;
  subtitle: string;
}
export interface ISessionItem {
  id: string;
  unitId: string;
  title: string;
  subtitle: string;
}
export interface IStoryItem {
  id: string;
  sessionId: string;
  en: string;
  vn: string;
  exampleVn?: string;
}
