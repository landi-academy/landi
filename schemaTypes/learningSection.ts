// schema.js
export default {
  name: 'learningSection',
  title: 'Learning Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'text',
    },
    {
      name: 'theoryList',
      title: 'Теория',
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
              name: 'subMenu',
              title: 'Пункты подменю',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'subLabel',
                      title: 'Название пункта подменю',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'practiceList',
      title: 'Практика',
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
              name: 'subMenu',
              title: 'Пункты подменю',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'subLabel',
                      title: 'Название пункта подменю',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
