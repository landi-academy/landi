import { defineField } from "sanity"

const reviewsPictures = {
  name: 'reviewsPictures',
  title: 'Reviews Pictures',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'url', type: 'url', title: 'URL' },
            { name: 'file', type: 'file', title: 'File' },
            { name: 'alt', type: 'string', title: 'Alt' },
          ]
        }
      ],
      validation: Rule => Rule.required().min(3).error('Minimum 3 images'),
    }),
  ]
}

export default reviewsPictures;