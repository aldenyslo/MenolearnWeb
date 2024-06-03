'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import QuizStep1 from './QuizStep1';
import QuizStep2 from './QuizStep2';
import QuizStep3 from './QuizStep3';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const quizSchema = z.object({
  ageGroup: z.enum(['A', 'B', 'C', 'D']),
  menstrualCycle: z.enum(['A', 'B', 'C', 'D']),
  symptoms: z.array(
    z.enum([
      'Hot flashes',
      'Night sweats',
      'Insomnia',
      'Mood swings, depression, or anxiety',
      'Irregular periods',
      'Low sex drive',
      'Pain during sex',
      'Vaginal pain or dryness',
      'Aches or pains',
      'Bladder control problems',
      'Brain fog',
      'Dry eyes',
      'Dry hair & skin',
      'Heart palpitations',
      'Weight gain',
    ] as const)
  ).optional(),
});

type QuizData = z.infer<typeof quizSchema>;

const MultiStepQuiz: React.FC = () => {
  const methods = useForm<QuizData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      symptoms: [], // Initialize symptoms to an empty array
    },
  });

  const [step, setStep] = useState(0);
  const router = useRouter();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: QuizData) => {
    const stage = determineStage(data);
    router.push(`/quiz/result?stage=${stage}`);
  };
  

  const determineStage = (data: QuizData) => {
    const { ageGroup, menstrualCycle, symptoms } = data;

    if (ageGroup === 'A' && (menstrualCycle === 'A' || menstrualCycle === 'B') && (!symptoms || symptoms.length < 5)) {
      return 'pre-menopause';
    }
    if (ageGroup === 'A' || ageGroup === 'B' || ageGroup === 'C') {
      if (menstrualCycle === 'B' && symptoms && symptoms.length > 4) {
        return 'peri-menopause';
      }
      if (menstrualCycle === 'C' && symptoms && symptoms.length > 0) {
        return 'menopause';
      }
      if (menstrualCycle === 'D' && symptoms && symptoms.length > 0) {
        return 'post-menopause';
      }
    
    }
    if (ageGroup === 'D' && menstrualCycle === 'D') {
      return 'post-menopause';
    }

    return 'pre-menopause';
  };
  const handleNext = () => {
    if (step === 2) {
      methods.handleSubmit(onSubmit)();
    } else {
      nextStep();
    }
  };

  return (
    <main className="content-center font-inter overflow-auto w-[390px] h-[670px] border border-t-0 bg-gradient-to-t from-blue-300/30 text-blue-950">
        <FormProvider {...methods}>
        <form>
            {step === 0 && <QuizStep1 />}
            {step === 1 && <QuizStep2 />}
            {step === 2 && <QuizStep3 />}

            <div className="flex justify-between mt-8">
            {step > 0 && (
                <button
                type="button"
                onClick={prevStep}
                className="py-2 px-4 m-5 bg-gray-300 text-gray-700 rounded-3xl focus:outline-none"
                >
                ← Previous
                </button>
            )}
            <button
                type="button"
                onClick={handleNext}
                className="py-2 px-4 m-5 bg-blue-500 text-white rounded-3xl focus:outline-none"
            >
                {step === 2 ? 'Submit' : 'Next →'}
            </button>
            </div>
        </form>
        </FormProvider>
    </main>
  );
};

export default MultiStepQuiz;