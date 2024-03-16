import { defineField } from "sanity";

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
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true, // Это позволяет пользователям определять область для кадрирования изображения
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              options: {
                isHighlighted: true // Это делает поле более заметным в интерфейсе
              }
            },
          ],
        },
      ],
      validation: Rule => Rule.required().min(3).error('Minimum 3 images'),
    }),
  ]
}

export default reviewsPictures;
