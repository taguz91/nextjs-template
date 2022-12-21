import { FC } from 'react';

interface LineSeparatorProps {
  label: string;
}

export const LineSeparator: FC<LineSeparatorProps> = ({ label }) => {
  return (
    <div className="flex items-center w-full my-1">
      <div className="flex-grow h-[0.8px] bg-gray-700 " />
      <span className="font-[12px] px-[20px] flex-grow-0 font-[500] text-gray-600 ">{label}</span>
      <div className="flex-grow h-[0.8px] bg-gray-700 " />
    </div>
  );
};
