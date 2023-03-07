import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// components
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';

// types
type BreadCrumbItemT = {
  href: string;
  label: string;
};

const Breadcrumb: React.FC = () => {
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
    <DutchC.BreadcrumbWrapper>
      <DutchC.BreadcrumbItem href="/">
        <Icons.IHome variant="solid" size="medium" color="dark-gray" />
      </DutchC.BreadcrumbItem>

      {breadcrumbs &&
        breadcrumbs.map((breadcrumb) => (
          <DutchC.BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
            {breadcrumb.label}
          </DutchC.BreadcrumbItem>
        ))}
    </DutchC.BreadcrumbWrapper>
  );
};

export default Breadcrumb;
