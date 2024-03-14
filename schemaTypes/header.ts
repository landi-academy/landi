// schema.js
export default {
  name: 'header',
  title: 'Хедер',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Логотип',
      type: 'image',
    },
    {
      name: 'menuItems',
      title: 'Пункты меню',
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
            {
              name: 'link',
              title: 'Ссылка на пункт меню',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};
