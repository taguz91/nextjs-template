import Link from 'next/link';
import { FC } from 'react';

interface BackButtonProps {
  label?: string;
  href: string;
}

export const BackButton: FC<BackButtonProps> = ({ label = 'Volver', href }) => {
  return (
    <Link
      className="flex items-center text-lg font-bold w-full focus:outline-none py-2 text-gray-600 my-auto rounded hover:text-gray-500"
      href={href}
    >
      <svg
        className="flex-shrink-0 w-5 h-5 transition mr-2"
        fill="currentColor"
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
      </svg>

      <span className="flex-1 ml-3 mr-6 whitespace-nowrap font-medium">{label}</span>
    </Link>
  );
};
