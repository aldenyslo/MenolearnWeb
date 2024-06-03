'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const stages = {
  'pre-menopause': {
    title: 'You are in Pre-Menopause',
    description: 'In the pre-menopausal stage, women generally have regular menstrual cycles and may not experience any symptoms of menopause.',
    details: 'This stage occurs several years before menopause. During this time, estrogen and progesterone levels are stable, and there are no significant changes in menstrual cycles or symptoms associated with menopause.',
    image: '/MenoLearnLogo.svg',
  },
  'peri-menopause': {
    title: 'You are in Peri-Menopause',
    description: 'In the peri-menopausal stage, women often experience irregular menstrual cycles and symptoms such as hot flashes and mood changes.',
    details: 'This stage can last for several years and is characterized by fluctuating hormone levels. Common symptoms include hot flashes, night sweats, and irregular periods.',
    image: '/MenoLearnLogo.svg',
  },
  menopause: {
    title: 'You are in Menopause',
    description: 'In the menopausal stage, women experience the cessation of menstrual periods for 12 consecutive months.',
    details: 'Menopause marks the end of a woman’s reproductive years. Symptoms such as hot flashes, night sweats, and vaginal dryness are common as the body adjusts to lower hormone levels.',
    image: '/MenoLearnLogo.svg',
  },
  'post-menopause': {
    title: 'You are in Post-Menopause',
    description: 'In the post-menopausal stage, women commonly experience more intense hot flashes and night sweats compared to other stages.',
    details: 'Although you no longer have menstrual periods, your body still produces hormones like estrogen, albeit in fluctuating levels. These levels are generally on a decline and stabilize at a lower baseline as you progress through postmenopause.',
    image: '/MenoLearnLogo.svg',
  },
};

const Results: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as keyof typeof stages) || 'pre-menopause'; // Default to pre-menopause if undefined
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const stageInfo = stages[stage];

  return (
    <main className="content-center font-inter overflow-auto w-[390px] h-[670px] border border-t-0 bg-gradient-to-t from-blue-300/30 text-blue-950">
        <div className="container mx-auto p-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">{stageInfo.title}</h2>
            <Image src="/MenoLearnLogo.svg" width={200} height={200} className="mx-auto mb-4" alt={''} />
            <p className="mb-4">{stageInfo.description}</p>
            <button onClick={toggleExpanded} className="text-blue-500 focus:outline-none">
            {expanded ? 'Hide Details' : 'Read More'}
            </button>
            <br></br>
                {expanded && <p className="mt-4">{stageInfo.details}</p>}
            <button onClick={() => router.push('/')} className="mt-8 py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none">
                Continue
            </button>
        </div>
    </main>
  );
};

export default Results;
