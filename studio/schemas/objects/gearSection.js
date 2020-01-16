export default {
  name: 'gearSection',
  type: 'document',
  title: 'Gear Sections',
  fields: [
    {
      type: 'string',
      name: 'sectionTitle',
      title: 'Gear Section Title'},
    {
      type: 'array',
      name: 'gearItems',
      title: 'Gear Items',
      of: [{type: 'gearItem'}]
      // options: {editModal: 'popover'}
    }
  ],

  preview: {
    select: {
      title: 'sectionTitle'
    },
    prepare ({title = 'No title'}) {
      return {
        title
      }
    }
  }
}
