export default {
  name: 'employeeReference',
  type: 'object',
  title: 'Employee reference',
  fields: [
    {
      name: 'employee',
      type: 'reference',
      to: [
        {
          type: 'employee'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'employee.name',
      media: 'employee.image.asset'
    }
  }
}
