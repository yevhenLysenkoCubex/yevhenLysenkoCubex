import React from 'react';
import Popover from '@mui/material/Popover';

interface IPopoverWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
  anchorEl?: () => HTMLElement;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PopoverWrapper = (props: IPopoverWrapperProps): JSX.Element => {
  const { children, isOpen, anchorEl, handleClose } = props;
  return (
    <Popover
      sx={{ p: '20px', background: '#FFFFFF', borderRadius: '20px' }}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      {children}
    </Popover>
  );
};

export default PopoverWrapper;
