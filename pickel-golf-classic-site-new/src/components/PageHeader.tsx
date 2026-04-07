import React from 'react';

interface PageHeaderProps {
  annualNumber: number;
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ annualNumber, title }) => {
  const ordinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="bg-primary-color border-b-2 border-secondary-color py-11 text-center">
      <p className="overline mb-2">{ordinal(annualNumber)} Annual Pickel Golf Classic</p>
      <h1 className="font-display font-semibold text-3xl md:text-[2.4rem] text-white">{title}</h1>
    </div>
  );
};

export default PageHeader;
