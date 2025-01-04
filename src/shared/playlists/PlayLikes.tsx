'use client';
import React from 'react';
import countByProp from '../utils/commonUtils';
import { useAuthenticated, useUserId } from '@nhost/nextjs';
import { PlayInfo } from './types';
import Like from '../components/Like';

type Props = {
  play: PlayInfo;
};

const PlayLikes = ({ play }: Props) => {
  const isAuthenticated = useAuthenticated();
  const userId = useUserId();

  const likeObject = () => {
    const { play_like } = play;
    const number = countByProp(play_like, 'liked', true);
    if (isAuthenticated) {
      const liked = play_like.find((i) => i.user_id === userId)?.liked;

      return { liked, number };
    }

    return { liked: false, number };
  };

  return <Like likeObj={likeObject()} />;
};

export default PlayLikes;
