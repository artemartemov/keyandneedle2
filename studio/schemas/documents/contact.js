export default {
  name: 'contactPage',
  type: 'document',
  title: 'Contact',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Page Title'
    },
    {
      type: 'array',
      name: 'employeeListing',
      title: 'Employees',
      of: [{type: 'employeeReference'}]
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
