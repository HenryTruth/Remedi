export interface Reminder {
  id: string;
  medicationName: string;
  dosage: string;
  times: string[];
  frequency: string;
  isCompleted: boolean;
  createdAt: Date;
}