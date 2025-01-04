import React from 'react';
import TechStackCategory from '@/shared/techstack/TechStackCategory';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ReactPlay - Tech Stacks'
};

const TechStackCategories = [
  { categoryName: 'Frontend', categoryID: 'frontend' },
  { categoryName: 'Backend', categoryID: 'backend' },
  { categoryName: 'DevOps and Deployment', categoryID: 'devOpsAndDeployment' },
  { categoryName: 'Analytics and Monitoring', categoryID: 'analyticsAndMonitoring' },
  { categoryName: 'Programming Language', categoryID: 'programmingLanguage' }
];

const TechStacksPage = () => {
  return (
    <main className="app-body items-center">
      <h1 className="heading lg:text-5xl text-3xl">ReactPlay is proudly powered by</h1>
      <div>
        {TechStackCategories.map((category) => (
          <TechStackCategory {...category} key={category.categoryID} />
        ))}
      </div>
    </main>
  );
};

export default TechStacksPage;
