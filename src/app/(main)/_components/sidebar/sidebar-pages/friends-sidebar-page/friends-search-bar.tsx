'use client';

import * as React from 'react';
import { SearchBar } from '~/components/ui/search-bar';

export type FriendsSearchBarProps = {
  onSearch: (keyword: string) => void;
};

export function FriendsSearchBar(props: FriendsSearchBarProps) {
  const { onSearch } = props;

  const searchId = React.useId();

  const handleSearchAction = (formData: FormData) => {
    const searchValue = formData.get(searchId);

    if (searchValue === null) {
      throw new Error('Unable to get search value!');
    }

    if (typeof searchValue !== 'string') {
      throw new Error('Search value is not a string!');
    }

    onSearch(searchValue);
  };

  return (
    <form action={handleSearchAction}>
      <SearchBar name={searchId} placeholder='search friends' />
    </form>
  );
}
