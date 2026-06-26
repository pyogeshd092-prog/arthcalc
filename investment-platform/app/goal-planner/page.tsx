import type { Metadata } from 'next';
import { GoalPlannerClient } from '@/components/goal-planner/GoalPlannerClient';

export const metadata: Metadata = {
  title: 'Investment Goal Planner India — Plan Retirement, House, Education | ArthCalc',
  description: 'Set your financial goal — retirement, house, education, car, marriage — and see how much different investments (FD, PPF, SIP, NPS, EPF) can help you reach it. Educational tool only.',
};

export default function GoalPlannerPage() {
  return <GoalPlannerClient />;
}
