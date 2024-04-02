const contact = {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'contactTitle',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'contactDescription',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'contactBulletList',
      title: 'Список буллетов',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Название пункта меню',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'shortText',
      title: 'Короткий текст',
      type: 'string',
    },
    {
      name: 'priceOld',
      title: 'Price Old',
      type: 'string',
    },
    {
      name: 'priceNew',
      title: 'Price New',
      type: 'string',
    },
    {
      name: 'contactImage',
      title: 'Image',
      type: 'image',
    }
  ],
};

export default contact;