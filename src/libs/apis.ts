import axios from 'axios';
import {sanityClient} from './sanity';
import * as queries from './sanityQueries';
import { Header } from '@/types/header';
import { OfferSection } from '@/types/offerSection';

export async function getHeader() {
  const result = await sanityClient.fetch<Header>(
    queries.getHeaderQuery,
    {},
    { cache: 'no-cache' }
  );

  return result;
}

export const getOfferSection = async () => {
  const result = await sanityClient.fetch<OfferSection>(
    queries.getOfferSectionQuery,
    {},
    { cache: 'no-cache' }
  );
  
  return result;
}

export const getAboutSection = async () => {
  const result = await sanityClient.fetch(
    queries.getAboutSectionQuery,
    {},
    { cache: 'no-cache' }
  );

  return result;
}