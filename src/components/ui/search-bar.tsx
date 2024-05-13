import * as React from 'react';

import { cn } from '~/utils/shadcn';
import { Button } from './button';
import { Input } from './input';
import { LoaderCircleIcon, SearchIcon } from 'lucide-react';

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, type, disabled, loading, ...props }, ref) => (
    <div className='flex w-full rounded-md border border-input bg-transparent text-sm shadow-sm'>
      <Input
        className={cn(
          'h-auto rounded-r-none border-none shadow-none',
          className,
        )}
        type={type}
        ref={ref}
        disabled={disabled}
        {...props}
      />

      <Button
        size='sm'
        variant='ghost'
        type='submit'
        aria-label='Search Friends'
        className='rounded-l-none text-slate-500'
        disabled={disabled}
      >
        {loading ? (
          <LoaderCircleIcon size={20} className='animate-spin' />
        ) : (
          <SearchIcon size={20} />
        )}
      </Button>
    </div>
  ),
);
SearchBar.displayName = 'SearchBar';

export { SearchBar };
