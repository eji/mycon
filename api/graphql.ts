import 'reflect-metadata';
import { NowRequest, NowResponse } from '@now/node';
import { graphql } from 'graphql';
import apiSchema from '../src/graphql/apiSchema';
import diConfig from '../src/diConfig';

diConfig();

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  const requestBody = request.body;
  try {
    const result = await graphql(apiSchema, requestBody.query);
    if (result.errors != null) {
      response.status(400).send(result.errors.toString());
    }
    if (result.data != null) {
      response.status(200).send(result.data);
    }
  } catch (e) {
    console.log(e.toString());
  }
};
