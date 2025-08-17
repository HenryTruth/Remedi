import { useState, useEffect } from 'react';

export interface Reminder {
  id: string;
  medicationName: string;
  dosage: string;
  time: string;
  isCompleted: boolean;
  createdAt: Date;
}

export const useHome = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    // Sample data - replace with actual data source
    {
      id: '1',
      medicationName: 'Antacid',
      dosage: '2 tabs',
      time: '10:00am',
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      medicationName: 'Antacid',
      dosage: '2 tabs',
      time: '10:00am',
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      medicationName: 'Antacid',
      dosage: '2 tabs',
      time: '10:00am',
      isCompleted: true,
      createdAt: new Date(),
    },
    {
        id: '4',
        medicationName: 'Antacid',
        dosage: '2 tabs',
        time: '10:00am',
        isCompleted: true,
        createdAt: new Date(),
      },
      {
        id: '5',
        medicationName: 'Antacid',
        dosage: '2 tabs',
        time: '10:00am',
        isCompleted: true,
        createdAt: new Date(),
      },
  ]);

  const upcomingReminders = reminders.filter(reminder => !reminder.isCompleted);
  const completedReminders = reminders.filter(reminder => reminder.isCompleted);

  const completeReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, isCompleted: true }
          : reminder
      )
    );
  };

  const addReminder = (newReminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    const reminder: Reminder = {
      ...newReminder,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setReminders(prev => [...prev, reminder]);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  return {
    reminders,
    upcomingReminders,
    completedReminders,
    completeReminder,
    addReminder,
    deleteReminder,
  };
};