const whySection = {
  name: "whySection",
  title: "Why Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: 'bodyLeft',
      title: 'Body Left',
      type: 'blockContent',
      description: 'The left side of the body',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'bodyRight',
      title: 'Body Right',
      type: 'blockContent',
      description: 'The right side of the body',
    },
  ],
};

export default whySection;