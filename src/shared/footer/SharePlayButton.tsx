'use client';
import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import SocialShare from '@/shared/components/SocialShare';
import { GoX } from 'react-icons/go';
import { useSearchContext } from '@/shared/search/search-context';

const SharePlayButton = () => {
  const { showShareModal, setShowShareModal } = useSearchContext();

  return (
    <>
      <Modal open={showShareModal} onClose={() => setShowShareModal(false)}>
        <Box className="modal-share">
          <Typography
            component="div"
            sx={{
              display: 'block',
              textAlign: 'center',
              py: 2,
              fontFamily: 'var(--ff-default)'
            }}
            variant="subtitle1"
          >
            Share about ReactPlay
          </Typography>
          <SocialShare showFB showLinkedin showReddit showTwitter />
          <Box component="div" sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <button className="modal-share-close" onClick={() => setShowShareModal(false)}>
              <GoX className="icon" size="16px" /> <span className="sr-only">Cancel</span>
            </button>
          </Box>
        </Box>
      </Modal>
      <button
        className="home-anchor home-anchor-sm"
        onClick={() => setShowShareModal(!showShareModal)}
      >
        <span className="text">Share about ReactPlay</span>
      </button>
    </>
  );
};

export default SharePlayButton;
