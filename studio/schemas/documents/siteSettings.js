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
      name: 'siteUrl',
      type: 'url',
      title: 'Site URL',
      description: 'Site URL for SEO'
    },
    {
      name: 'phoneNumber',
      type: 'string',
      title: 'Telephone',
      description: 'Telephone Number for SEO [e.g. (917) 403-3408]'
    },
    {
      name: 'streetAddress',
      type: 'string',
      title: 'Street Address',
      description: 'Please enter street address for SEO [e.g. 1234 Broadway Ave #2B]'
    },
    {
      name: 'cityAddress',
      type: 'string',
      title: 'City',
      description: 'Please enter city for SEO [e.g. Detroit]'
    },
    {
      name: 'stateAddress',
      type: 'string',
      title: 'State',
      description: 'Please enter state abbreviation for SEO [e.g. MI]',
      validation: Rule => Rule.max(2).warning('Please use abbreviated state names (NY)')
    },
    {
      name: 'zipAddress',
      type: 'string',
      title: 'Zipcode',
      description: 'Please enter zip code for SEO [e.g. 48127]'
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
      name: 'instagramUrl',
      type: 'url',
      title: 'Instagram URL',
      description: 'Instagram URL for SEO'
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
