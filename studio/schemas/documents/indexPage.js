export default {
  name: 'indexPage',
  type: 'document',
  title: 'Homepage',
  __experimental_actions: [/* 'create', */ 'update' /* 'delete', */, 'publish'],
  fields: [
    {
      type: 'array',
      name: 'bgImages',
      title: 'Homepage Background Images',
      of: [{type: 'figure'}],
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'headlineText',
      title: 'Headline Text',
      type: 'text',
      rows: 2
    },
    {
      name: 'subhead',
      title: 'Sub-Headline Text',
      type: 'bioPortableText'
    },
    {
      name: 'buttonText',
      title: 'Main Button Text',
      type: 'text',
      rows: 1
    },
    {
      title: 'Studio Location',
      name: 'location',
      type: 'geopoint'
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
