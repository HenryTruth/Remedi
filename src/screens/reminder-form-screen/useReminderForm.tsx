import { useState, useEffect } from 'react';
import { ReminderFormData, UseReminderFormProps } from './type';
import reminderService from '../../services/reminderService/reminderService';



export const useReminderForm = ({ editingReminder, isEditMode = false }: UseReminderFormProps = {}) => {
  const [form, setForm] = useState<ReminderFormData>({
    pillName: '',
    dosage: '',
    selectedTimes: [],
    frequency: '1x',
  });

  useEffect(() => {
    if (isEditMode && editingReminder) {
      setForm({
        pillName: editingReminder.medicationName,
        dosage: editingReminder.dosage,
        selectedTimes: editingReminder.times,
        frequency: editingReminder.frequency,
      });
    }
  }, [isEditMode, editingReminder]);

  const timeOptions = ['8am', '12pm', '6pm'];
  const frequencyOptions = ['1x', '2x', '3x'];

  const getRecommendedTimes = (frequency: string): string[] => {
    switch (frequency) {
      case '1x':
        return ['8am'];
      case '2x':
        return ['8am', '6pm'];
      case '3x':
        return ['8am', '12pm', '6pm'];
      default:
        return [];
    }
  };

  const updatePillName = (pillName: string) => {
    setForm(prev => ({ ...prev, pillName }));
  };

  const updateDosage = (dosage: string) => {
    setForm(prev => ({ ...prev, dosage }));
  };

  const updateSelectedTimes = (time: string) => {
    setForm(prev => {
      const isSelected = prev.selectedTimes.includes(time);
      const maxSelections = parseInt(prev.frequency.replace('x', ''));
      
      if (isSelected) {
        return {
          ...prev,
          selectedTimes: prev.selectedTimes.filter(t => t !== time)
        };
      } else {
        if (prev.selectedTimes.length < maxSelections) {
          return {
            ...prev,
            selectedTimes: [...prev.selectedTimes, time]
          };
        }
        return prev;
      }
    });
  };

  const updateFrequency = (frequency: string) => {
    const recommendedTimes = getRecommendedTimes(frequency);
    setForm(prev => ({ 
      ...prev, 
      frequency,
      selectedTimes: recommendedTimes
    }));
  };

  const isFormValid = () => {
    const requiredSelections = parseInt(form.frequency.replace('x', ''));
    return form.pillName.trim() !== '' && 
           form.dosage.trim() !== '' && 
           form.selectedTimes.length === requiredSelections;
  };

  const resetForm = () => {
    setForm({
      pillName: '',
      dosage: '',
      selectedTimes: [],
      frequency: '1x',
    });
  };

  const submitForm = async () => {
    if (!isFormValid()) {
      return null;
    }

    try {
      const reminderData = {
        medicationName: form.pillName,
        dosage: form.dosage,
        times: form.selectedTimes,
        frequency: form.frequency,
        isCompleted: false,
      };

      if (isEditMode && editingReminder) {
        const updatedReminder = await reminderService.updateReminder(
          editingReminder.id,
          reminderData
        );
        console.log('Updated reminder:', updatedReminder);
        return updatedReminder;
      } else {
        const newReminder = await reminderService.addReminder(reminderData);
        console.log('Created new reminder:', newReminder);
        return newReminder;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return {
    form,
    timeOptions,
    frequencyOptions,
    updatePillName,
    updateDosage,
    updateSelectedTimes,
    updateFrequency,
    isFormValid,
    resetForm,
    submitForm,
    getRecommendedTimes,
    isEditMode,
    editingReminder,
  };
};