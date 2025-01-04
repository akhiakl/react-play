import { GitHubUser } from '@/actions/github/types';
import Image from 'next/image';

type Props = {
  contributors: GitHubUser[];
  error?: string;
};

const Contributors = async ({ contributors, error }: Props) => {
  return (
    <>
      <h2 className="title-primary">
        <strong>
          <span>Big Thanks</span>
        </strong>
        <br /> to All Contributors!
      </h2>
      <ul className="list-contributors">
        {error && <li>Error: {error}</li>}
        {contributors &&
          contributors.map((contributor) => (
            <li
              className="contributor"
              data-testid={`contributor-${contributor.id}`}
              key={contributor.id}
            >
              <a
                className="contributor-anchor"
                href={contributor.html_url}
                rel="noopener noreferrer"
                target="_blank"
                title={`${contributor.login}(${contributor.contributions} contributions)`}
              >
                <Image
                  alt={contributor.login}
                  className="contributor-thumb"
                  height={160}
                  loading="lazy"
                  src={contributor.avatar_url}
                  width={160}
                />
              </a>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Contributors;
