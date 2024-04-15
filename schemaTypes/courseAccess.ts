export default {
  name: 'courseAccess',
  title: 'Course Access',
  type: 'document',
  fields: [
    {
      name: 'courseId',
      title: 'Course ID',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'courseId',
        maxLength: 200,
      },
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    },
    {
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description: 'The date when the access expires',
    },
    {
      name: 'stripePurchaseId',
      title: 'Stripe Purchase ID',
      type: 'string',
    },
  ],
};
