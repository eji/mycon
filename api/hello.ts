import { NowRequest, NowResponse } from '@now/node';

export default (request: NowRequest, response: NowResponse): void => {
  const { name = 'World' } = request.query;
  response.status(200).send(`Hello ${name}!`);
};
