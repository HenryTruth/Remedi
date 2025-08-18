import { useState } from 'react';
import {Reminder} from './type'

export const useHome = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    // Sample data - replace with actual data source
    {
      id: '1',
      medicationName: 'Antacid',
      dosage: '2 tabs',
      times: ['8am'],
      frequency: '1x',
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      medicationName: 'Vitamin D',
      dosage: '1 tablet',
      times: ['8am', '6pm'],
      frequency: '2x',
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      medicationName: 'Calcium',
      dosage: '1 pill',
      times: ['8am', '12pm', '6pm'],
      frequency: '3x',
      isCompleted: true,
      createdAt: new Date(),
    },
    {
        id: '4',
        medicationName: 'Omega-3',
        dosage: '2 capsules',
        times: ['8am'],
        frequency: '1x',
        isCompleted: true,
        createdAt: new Date(),
      },
      {
        id: '5',
        medicationName: 'Iron',
        dosage: '1 tablet',
        times: ['8am', '6pm'],
        frequency: '2x',
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