import { GitHubRepository, GitHubUser } from './types';

type Response<T> = {
  data?: T;
  error?: Error;
};

export const getPlayGithubRepo = async (): Promise<Response<GitHubRepository>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PLAY_API_URL}/react-play`);
    const data = await response.json();

    return {
      data
    };
  } catch (err) {
    console.error(err);

    return {
      error: err
    };
  }
};

export const getPlayGithubContributors = async (
  sorted?: boolean
): Promise<Response<GitHubUser[]>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PLAY_API_URL}/react-play/contributors`);

    const responseData = await response.json();

    if (responseData?.message) {
      throw new Error(responseData?.message);
    }
    // Remove the bots
    const contributors: GitHubUser[] = (responseData ?? [])?.filter(
      (contributor: GitHubUser) => contributor.type !== 'Bot'
    );

    // Sort it by the contributions
    return {
      data: sorted ? contributors?.sort((a, b) => b.contributions - a.contributions) : contributors
    };
  } catch (err) {
    console.error(err);

    return {
      data: [],
      error: err
    };
  }
};
