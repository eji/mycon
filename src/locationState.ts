import { Location } from 'history';

type LocationState = {
  background: Location;
};

export default LocationState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isLocationState = (value: any): value is LocationState => {
  if (value == null) {
    return false;
  }

  if ('background' in value) {
    return true;
  }

  return false;
};
