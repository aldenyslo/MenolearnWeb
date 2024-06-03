import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const QuizStep1: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">1. Age Group:</h2>
      <div className="space-y-4">
        {['A', 'B', 'C', 'D'].map((value, index) => (
          <Controller
            key={index}
            name="ageGroup"
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
                {value === 'A' && 'Under 40'}
                {value === 'B' && '40-45'}
                {value === 'C' && '46-55'}
                {value === 'D' && 'Over 55'}
              </button>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizStep1;
