import axios from 'axios';
import {sanityClient} from './sanity';
import * as queries from './sanityQueries';
import { Header } from '@/types/header';
import { OfferSection } from '@/types/offerSection';

export async function getHeader() {
  const result = await sanityClient.fetch<Header>(
    queries.getHeaderQuery,
    {},
    // { cache: 'no-cache' }
    {next: { revalidate: 3600 }}
  );

  return result;
}

export const getOfferSection = async () => {
  const result = await sanityClient.fetch<OfferSection>(
    queries.getOfferSectionQuery,
    {},
    // { cache: 'no-cache' }
    {next: { revalidate: 3600 }}
  );
  
  return result;
}

export const getAboutSection = async () => {
  const result = await sanityClient.fetch(
    queries.getAboutSectionQuery,
    {},
    // { cache: 'no-cache' }
    {next: { revalidate: 3600 }}
  );

  return result;
}

export const getLearningSection = async () => {
  const result = await sanityClient.fetch(
    queries.getLearningSectionQuery,
    {},
    // { cache: 'no-cache' }
    {next: { revalidate: 3600 }}
  );

  return result;
}

export const getWhySection = async () => {
  const result = await sanityClient.fetch(
    queries.getWhySectionQuery,
    {},
    // { cache: 'no-cache' }
    {next: { revalidate: 3600 }}
  );

  return result;
}

export const getReviewsPictures = async () => {
  const result = await sanityClient.fetch(
    queries.getReviewsPicturesQuery,
    {},
    // { cache: 'no-cache' }
    {next: { revalidate: 3600 }}
  );

  return result;
}

export const getContact = async () => {
  const result = await sanityClient.fetch(
    queries.getContactQuery,
    {},
    // { cache: 'no-cache' }
    {next: { revalidate: 3600 }}
  );

  return result;
}

export const getFooter = async () => {
  const result = await sanityClient.fetch(
    queries.getFooterQuery,
    {},
    // { cache: 'no-cache' }
    {next: { revalidate: 3600 }}
  );

  return result;
}