export default {
  name: 'gearItem',
  type: 'object',
  title: 'Gear Item',
  fields: [
    {
      name: 'gearItemTitle',
      type: 'string',
      title: 'Gear Item'
    },
    {
      name: 'gearSpecialRequest',
      type: 'boolean',
      title: 'By Special Request Only',
      options: {
        layout: 'checkbox'
      }
    }
  ],
  preview: {
    select: {
      title: 'gearItemTitle'
    },
    prepare ({title = 'No title'}) {
      return {
        title
      }
    }
  }
}
