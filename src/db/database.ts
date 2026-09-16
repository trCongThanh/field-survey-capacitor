import Dexie, { type Table } from 'dexie';

export interface SurveyRecord {
  id?: number;
  title: string;
  category: string;
  condition: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  photoBase64: string | null;
  status: 'draft' | 'synced';
  createdAt: string;
}

export class SurveyDatabase extends Dexie {
  surveys!: Table<SurveyRecord, number>;

  constructor() {
    super('Capacitor_Survey_DB');
    this.version(1).stores({
      surveys: '++id, status, createdAt'
    });
  }
}

export const db = new SurveyDatabase();