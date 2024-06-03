import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const symptomsList = [
  'Hot flashes',
  'Night sweats',
  'Insomnia',
  'Mood swings, depression, or anxiety',
  'Low sex drive',
  'Vaginal pain or dryness',
  'Aches or pains',
  'Bladder control problems',
  'Brain fog',
  'Dry eyes',
  'Dry hair & skin',
  'Heart palpitations',
  'Weight gain',
];

const QuizStep3: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">3. Symptoms (check all that apply):</h2>
      <div className="space-y-4">
        {symptomsList.map((symptom, index) => (
          <Controller
            key={index}
            name="symptoms"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                className={`w-full py-2 px-4 border rounded-3xl hover:outline focus:outline-none ${
                  field.value?.includes(symptom)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => {
                  const newValue = field.value?.includes(symptom)
                    ? field.value.filter((val: string) => val !== symptom)
                    : [...(field.value || []), symptom];
                  field.onChange(newValue);
                }}
              >
                {symptom}
              </button>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizStep3;
