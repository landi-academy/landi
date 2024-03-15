export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'footerTitle',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'footerLogo',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'footerMenuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'footerSocialMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'footerCopyRight',
      title: 'Copyright',
      type: 'string',
    }
  ]
}