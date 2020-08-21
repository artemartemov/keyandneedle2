export default {
  name: 'clientInfo',
  type: 'object',
  Title: 'Client information',
  fields: [
    {
      name: 'linkedIn',
      type: 'string',
      title: 'LinkedIn'
    },
    {
      name: 'twitter',
      type: 'string',
      title: 'Twitter handle',
      validation: Rule => Rule.regex(/^@.*/).warning('Handle should begin with @')
    },
    {
      name: 'email',
      type: 'email',
      title: 'Email'
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone'
    },
    {
      name: 'website',
      type: 'string',
      title: 'Website'
    }
  ]
}
