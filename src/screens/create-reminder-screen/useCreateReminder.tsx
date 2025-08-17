import { useState } from 'react';

export interface CreateReminderForm {
  pillName: string;
  selectedTimes: string[];
  frequency: string;
}

export const useCreateReminder = () => {
  const [form, setForm] = useState<CreateReminderForm>({
    pillName: '',
    selectedTimes: [],
    frequency: '1x',
  });

  const timeOptions = ['8am', '12pm', '6pm'];
  const frequencyOptions = ['1x', '2x', '3x'];

  // Smart time suggestions based on frequency
  const getRecommendedTimes = (frequency: string): string[] => {
    switch (frequency) {
      case '1x':
        return ['8am']; // Morning dose
      case '2x':
        return ['8am', '6pm']; // Morning and evening
      case '3x':
        return ['8am', '12pm', '6pm']; // Morning, noon, and evening
      default:
        return [];
    }
  };

  const updatePillName = (pillName: string) => {
    setForm(prev => ({ ...prev, pillName }));
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
      selectedTimes: recommendedTimes // Auto-select recommended times
    }));
  };

  const isFormValid = () => {
    const requiredSelections = parseInt(form.frequency.replace('x', ''));
    return form.pillName.trim() !== '' && form.selectedTimes.length === requiredSelections;
  };

  const resetForm = () => {
    setForm({
      pillName: '',
      selectedTimes: [],
      frequency: '1x',
    });
  };

  const submitForm = () => {
    if (isFormValid()) {
      console.log('Submitting form:', form);
      return form;
    }
    return null;
  };

  return {
    form,
    timeOptions,
    frequencyOptions,
    updatePillName,
    updateSelectedTimes,
    updateFrequency,
    isFormValid,
    resetForm,
    submitForm,
    getRecommendedTimes,
  };
};