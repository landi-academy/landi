import { CourseAccess } from "@/types/courseAccess";
import { sanityClient } from "./sanity";

export async function saveCourseAccess(courseId: string, slug: string, stripePurchaseId: string) {
  const doc = {
    _type: 'courseAccess',
    courseId: courseId,
    slug: {
      _type: 'slug',
      current: slug,
    },
    createdAt: new Date().toISOString(),
    stripePurchaseId: stripePurchaseId,
  };

  try {
    const result = await sanityClient.create(doc);
    console.log('Course access saved:', result);
  } catch (error) {
    console.error('Failed to save course access:', error);
  }
}

export async function checkCourseAccess(slug: string): Promise<boolean> {
  const query = `*[slug.current == $slug][0]`;
  const params = { slug };

  try {
    const courseAccess = await sanityClient.fetch(query, params);
    if (!courseAccess) {
      return false;
    }
    
    const createdAt = new Date(courseAccess.createdAt);
    const expiryDate = new Date(createdAt.setDate(createdAt.getDate() + 14));
    const now = new Date();
    
    return now < expiryDate;
  } catch (error) {
    console.error('Failed to check course access:', error);
    return false;
  }
}
