import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="app-footer text-center">
        <hr className="separater" />
        <div className="flex justify-center items-center py-2">
          <p className="app-footer-text">
            ReactPlay - The MIT License (MIT) Copyright &copy;
            {year} . Powered by{' '}
            <Link className="text-link-default" href="/tech-stacks">
              Top Notch Tech Stacks
            </Link>
            .
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
