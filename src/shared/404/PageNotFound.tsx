import './404.css';
import Link from 'next/link';
import Image404 from '@/images/Image404';
import Image from 'next/image';
import RedirectTimer from './RedirectTimer';

type Props = {
  msg?: string;
  details?: string;
  image?: string | null;
};

const PageNotFound = ({
  msg = 'Looks like you are lost',
  details = "Why don't you go back to",
  image = null
}: Props) => {
  return (
    <main className="page-404">
      {image ? (
        <Image
          alt="under-development"
          className="under-development"
          height={600}
          src={image}
          width={600}
        />
      ) : (
        <Image404 className="page-404-image" />
      )}
      <p className="page-404-lead">{msg}</p>
      <p className="page-404-desc">
        {details}{' '}
        <Link className="link" href="/">
          home
        </Link>
        . <RedirectTimer />
      </p>
    </main>
  );
};

export default PageNotFound;
