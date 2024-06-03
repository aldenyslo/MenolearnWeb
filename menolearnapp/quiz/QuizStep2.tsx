import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const QuizStep2: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">
        2. Menstrual Cycle and Changes in the Last 12 Months:
      </h2>
      <div className="space-y-4">
        {['A', 'B', 'C', 'D'].map((value, index) => (
          <Controller
            key={index}
            name="menstrualCycle"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                className={`w-full py-2 px-4 border rounded-3xl hover:outline focus:outline-none ${
                  field.value === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => field.onChange(value)}
              >
                {value === 'A' && 'Regular cycles (every 21-35 days)'}
                {value === 'B' &&
                  'Irregular cycles (changes in cycle length, missed periods, changes in flow)'}
                {value === 'C' &&
                  'Periods have become very irregular or stopped but not for 12 consecutive months'}
                {value === 'D' && 'No periods for 12 consecutive months or more'}
              </button>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizStep2;
