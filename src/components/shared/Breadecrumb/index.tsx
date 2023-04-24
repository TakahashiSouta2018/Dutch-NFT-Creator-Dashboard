import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';

// icons
import * as Icons from '@/common/Icons';

// types
type BreadCrumbItemT = {
  href: string;
  label: string;
};

const Breadcrumb: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadCrumbItemT[]>([]);

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0];
    let pathArray = pathWithoutQuery.split('/');
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== '');
    const breadcrumbs: BreadCrumbItemT[] = pathArray.map((path, index) => {
      const href = '/' + pathArray.slice(0, index + 1).join('/');
      return {
        href,
        label: path.split('-').join(' '),
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <div className="flex items-center my-4">
      <Link
        className="relative inline-flex items-center justify-center px-4 first:pl-2 last:pr-2 text-black/60 capitalize dark:text-white/60"
        href="/"
      >
        <Icons.IHome
          variant="solid"
          size="medium"
          color={theme === 'dark' ? 'white-gray' : 'dark-gray'}
        />
      </Link>

      {breadcrumbs &&
        breadcrumbs.map((breadcrumb) => (
          <Link
            className="relative inline-flex items-center justify-center px-4 first:pl-2 last:pr-2 text-black/60 capitalize dark:text-white/60"
            key={breadcrumb.href}
            href={breadcrumb.href}
          >
            {breadcrumb.label}
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumb;
