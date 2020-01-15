export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'author',
      type: 'text',
      title: 'Author',
      description: 'Name of the author or this website'
    },
    {
      name: 'siteUrl',
      type: 'url',
      title: 'Site URL',
      description: 'Site URL for SEO'
    },
    {
      name: 'facebookUrl',
      type: 'url',
      title: 'Facebook URL',
      description: 'Facebook URL for SEO'
    },
    {
      name: 'twitterUrl',
      type: 'url',
      title: 'Twitter URL',
      description: 'Twitter URL for SEO'
    },
    {
      name: 'soundcloudUrl',
      type: 'url',
      title: 'Soundcloud URL',
      description: 'Soundcloud URL for SEO'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }
  ]
}
