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
      name: 'gearItemCount',
      type: 'number',
      title: 'Gear Quantity',
      validation: Rule => [
        Rule.integer().error('Must be a whole number'),
        Rule.max(99).error('Too many items!'),
        Rule.positive().error('Cannot have negative items')
      ]
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
