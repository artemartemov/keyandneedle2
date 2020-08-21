export default {
  name: 'client',
  type: 'document',
  title: 'Client',
  fields: [
    {
      name: 'clientName',
      type: 'string',
      title: 'Client Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Client slug for metadata',
      options: {
        source: 'clientName',
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
      }
    },
    {
      name: 'clientImage',
      title: 'Image',
      type: 'figure'
    },
    {
      name: 'clientInfo',
      type: 'clientInfo',
      title: 'Client information'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'bioPortableText'
    }
  ],
  preview: {
    select: {
      title: 'clientName',
      media: 'clientImage'
    }
  }
}
