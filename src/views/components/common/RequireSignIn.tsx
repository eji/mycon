import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import * as O from 'fp-ts/lib/Option';
import userContext from '../../../app/contexts/userContext';

type Props = {
  children: ReactNode;
};

const RequireSignIn: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const history = useHistory();
  const currentUser = userContext.getCurrentUser();

  if (O.isNone(currentUser)) {
    history.replace('/sign-in');
    return <></>;
  }

  return <>{children}</>;
};

export default RequireSignIn;
