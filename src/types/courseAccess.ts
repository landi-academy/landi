export interface CourseAccess {
  _id?: string; // ID документа в Sanity, опциональный, так как не известен до создания документа
  courseId: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  createdAt: string; // ISO строка даты
  expiresAt: string; // ISO строка даты
  stripePurchaseId: string;
}