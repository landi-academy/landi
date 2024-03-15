const aboutSection = {
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'roundImage',
      title: 'Round Image',
      type: 'image',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'profession',
      title: 'Profession',
      type: 'string',
    },
    {
      name: 'aboutBullets',
      title: 'About Bullets',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
          ]
        }
      ],
    },
    {
      name: 'shortText',
      title: 'Short Text',
      type: 'text',
    }
  ],
};

export default aboutSection;