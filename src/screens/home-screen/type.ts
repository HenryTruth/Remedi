export interface Reminder {
  id: string;
  medicationName: string;
  dosage: string;
  time: string;
  isCompleted: boolean;
  createdAt: Date;
}