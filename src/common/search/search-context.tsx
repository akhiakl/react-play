'use client';
import React, { useContext, useState } from 'react';

type ContextDat = {
  filterQuery: {
    level_id: any[];
    tags: any[];
    owner_user_id: any[];
    language: any[];
  };
  setFilterQuery: React.Dispatch<
    React.SetStateAction<{
      level_id: any[];
      tags: any[];
      owner_user_id: any[];
      language: any[];
    }>
  >;
  showShareModal: boolean;
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = React.createContext<ContextDat>({
  filterQuery: {
    level_id: [],
    tags: [],
    owner_user_id: [],
    language: []
  },
  setFilterQuery: () => {},
  showShareModal: false,
  setShowShareModal: () => {}
});

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [filterQuery, setFilterQuery] = useState({
    level_id: [],
    tags: [],
    owner_user_id: [],
    language: []
  });

  const value = {
    filterQuery,
    setFilterQuery,
    showShareModal,
    setShowShareModal
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => useContext(SearchContext);
