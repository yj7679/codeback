import { AxiosError } from 'axios';
import { INTERNAL_SERVER_ERROR } from 'common/string-template';

export function handleServerError(error: AxiosError) {
  if (error.response && error.response.status >= 500) {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
}
