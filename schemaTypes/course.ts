export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'pdfFile',
      title: 'E-Book',
      type: 'file',
      options: {
        accept: 'application/pdf'
      }
    },
    {
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        hotspot: true // Это позволит выбирать область для предварительного просмотра
      }
    }
  ]
};
