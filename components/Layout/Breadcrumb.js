import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const convertBreadcrumb = string => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü');
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav id="breadcrumbs">
      <div className="container">
        <ul className="breadcrumb">
          <li>
            <Link href="/">
              <a className="breadbrumb__home">
                <i className="fas fa-home"></i>
              </a>
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, i) => {
            return (
              <li key={breadcrumb.href}>
                <Link href={breadcrumb.href}>
                  <a>
                    &nbsp;{convertBreadcrumb(` > ${breadcrumb.breadcrumb}`)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumbs;