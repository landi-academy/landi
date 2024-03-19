import { Rule } from '@sanity/types'

const offerSection = {
  name: 'offerSection',
  title: 'Offer Section',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'preTitle',
      title: 'Pre Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'offersList',
      title: 'Offers List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule: Rule) => Rule.required()
            },
          ]
        }
      ],
    },
    {
      name: 'bulletsList', // Исправлено здесь
      title: 'Bullets List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule: Rule) => Rule.required()
            },
          ]
        }
      ],
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'profession',
      title: 'Profession',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'priceOld',
      title: 'Price Old',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'priceNew',
      title: 'Price New',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'textButton',
      title: 'Text Button',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    }
  ]
}

export default offerSection;