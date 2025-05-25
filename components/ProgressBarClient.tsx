'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ProgressBar from '@badrap/bar-of-progress';

const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'z-[9999]',
  delay: 300,
});

export default function ProgressBarClient() {
  const pathname = usePathname();

  useEffect(() => {
    progress.start();
    const timeout = setTimeout(() => {
      progress.finish();
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
