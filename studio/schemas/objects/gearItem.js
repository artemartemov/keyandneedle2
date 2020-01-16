export default {
  name: 'gearItem',
  type: 'document',
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
    },
    {
      name: 'gearItemImage',
      type: 'figure',
      title: 'Gear Item Image',
      description: 'Optional, but will show an example to users on the website'
    }
  ],
  preview: {
    select: {
      title: 'gearItemTitle',
      subtitle: 'gearItemCount',
      media: 'gearItemImage'
    },
    prepare ({title = 'No title', media, subtitle = 'no inventory count'}) {
      return {
        title,
        subtitle,
        media
      }
    }
  }
}
