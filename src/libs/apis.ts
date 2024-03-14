import axios from 'axios';
import {sanityClient} from './sanity';
import * as queries from './sanityQueries';
import { Header } from '@/types/header';

export async function getHeader() {
  const result = await sanityClient.fetch<Header>(
    queries.getHeaderQuery,
    {},
    { cache: 'no-cache' }
  );

  return result;
}