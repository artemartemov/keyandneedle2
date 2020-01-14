export default {
  name: 'gearPage',
  type: 'document',
  title: 'Gear Listing',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Page Title'
    },
    {
      type: 'array',
      name: 'gearPageSection',
      title: 'Gear Page Sections',
      of: [{type: 'gearSection'}]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare ({title = 'No title'}) {
      return {
        title
      }
    }
  }
}
