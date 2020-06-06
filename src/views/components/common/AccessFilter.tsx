import React, { ReactNode } from 'react';
import * as F from 'fp-ts/lib/function';
import RequireSignIn from './RequireSignIn';
import RequireInitApp from './RequireInitApp';

const filterSignIn = (
  requireSignIn?: boolean
): ((children: ReactNode) => ReactNode) => (children): ReactNode => {
  if (requireSignIn) {
    return <RequireSignIn>{children}</RequireSignIn>;
  }
  return children;
};

const filterInitApp = (
  requireInitApp?: boolean
): ((children: ReactNode) => ReactNode) => (children): ReactNode => {
  if (requireInitApp) {
    return <RequireInitApp>{children}</RequireInitApp>;
  }
  return children;
};

type Props = {
  requireSignIn?: boolean;
  requireInitApp?: boolean;
  children: ReactNode;
};

const AccessFilter: React.FC<Props> = (props: Props) => {
  const { requireSignIn, requireInitApp, children } = props;

  const filter = F.flow(
    filterInitApp(requireInitApp),
    filterSignIn(requireSignIn)
  );

  return <>{filter(children)}</>;
};

export default AccessFilter;
