export default {
  name: 'employee',
  type: 'document',
  title: 'Employee Listing',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image',
      description: 'Optional, but may be used for front end purposes'
    },
    {
      name: 'position',
      type: 'string',
      title: 'Employee Position',
      description: 'Example: Engineer, Producer, Janitor, HBIC'
    },
    {
      name: 'email',
      type: 'email',
      title: 'Email',
      description: 'Example: contact@sitename.com'
    },
    {
      name: 'phoneNumber',
      type: 'string',
      title: 'Telephone Number',
      description: 'Example: 240-555-5555'
    },
    {
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biography'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image'
    }
  }
}
