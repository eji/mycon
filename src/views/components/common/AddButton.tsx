import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

type OnClickHandler = (() => void) | (() => Promise<void>);

type Props = {
  onClick: OnClickHandler;
};

const AddButton: React.FC<Props> = (props: Props) => {
  const { onClick } = props;

  return (
    <IconButton aria-label="add" onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;
