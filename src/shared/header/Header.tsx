'use client';
import HeaderNav from './HeaderNav';
import { Suspense, useMemo } from 'react';
import './header.css';
import { SearchBox } from '@/shared/search/SearchBox';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ActivityCountdown from './ActivityCountdown';
import clsx from 'clsx';

const Header = () => {
  const pathName = usePathname();

  // const reset = { search: false, filter: false };

  const showHideBits = useMemo(() => {
    // if (pathName !== '/plays') {
    //   setReset({ search: false, filter: false });
    // }
    if (pathName === '/') {
      return {
        showSearch: false,
        showBrowse: true,
        setHeaderStyle: false,
        showActivityTimer: true
      };
    } else if (pathName === '/ideas' || pathName === '/tech-stacks') {
      return {
        showSearch: false,
        showBrowse: true,
        setHeaderStyle: true
      };
    } else if (pathName.startsWith('/plays')) {
      return {
        showSearch: true,
        showBrowse: false,
        setHeaderStyle: true
      };
    } else if (pathName.startsWith('/leaderboard')) {
      return {
        showSearch: false,
        showBrowse: true,
        setHeaderStyle: true
      };
    }

    return {
      showSearch: false,
      showBrowse: false,
      setHeaderStyle: true,
      showActivityTimer: false
    };
  }, [pathName]);

  return (
    <>
      {process.env.NEXT_PUBLIC_ACTIVITIES_ON === 'true' && showHideBits.showActivityTimer && (
        <ActivityCountdown date={new Date(1675209600000)} />
      )}
      <header
        className={clsx('app-header', {
          'app-header-home': !showHideBits.setHeaderStyle,
          'app-header-home--promo':
            !showHideBits.setHeaderStyle &&
            process.env.NEXT_PUBLIC_ACTIVITIES_ON === 'true' &&
            showHideBits.showActivityTimer
        })}
        data-testid="app-header"
      >
        <span className="pl-0 md:pl-[50px]">
          <Link className="app-logo" data-testid="app-logo" href="/">
            <span className="sr-only">React Play</span>
          </Link>
        </span>
        <div className="app-header-search pl-0 xl:pl-[130px]">
          {showHideBits.showSearch && (
            <Suspense>
              <SearchBox />
            </Suspense>
          )}
        </div>

        <HeaderNav showBrowse={showHideBits.showBrowse} />
      </header>
    </>
  );
};

export default Header;
