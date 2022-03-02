export interface TodoModel {
  id: string;
  title: string;
  isClosed: boolean;
  lastUpdate: Date;
  description?: string;
}
