import { Reminder } from "../home-screen/type";

export interface ReminderFormData {
  pillName: string;
  selectedTimes: string[];
  frequency: string;
}

export interface UseReminderFormProps {
  editingReminder?: Reminder;
  isEditMode?: boolean;
}