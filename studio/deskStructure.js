import S from '@sanity/desk-tool/structure-builder'

import {Home, Mic, Mail, Settings, Users} from 'react-feather'

const hiddenDocTypes = listItem =>
  !['indexPage', 'category', 'post', 'siteSettings', 'gearSection', 'gearPage', 'contactPage', 'employee'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings & SEO')
        .icon(Settings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Homepage')
        .icon(Home)
        .child(
          S.editor()
            .id('indexPage')
            .schemaType('indexPage')
            .documentId('indexPage')
        ),
      S.listItem()
        .title('Gear Listing')
        .icon(Mic)
        .child(
          S.editor()
            .id('gearPage')
            .schemaType('gearPage')
            .documentId('gearPage')
        ),
      S.divider(),
      S.listItem()
        .title('Contact Info Modal')
        .icon(Mail)
        .child(
          S.editor()
            .id('contactPage')
            .schemaType('contactPage')
            .documentId('contactPage')
        ),
      S.listItem()
        .title('Employees')
        .icon(Users)
        .child(
          S.documentTypeList('employee')
            .title('Employee List')
        ),
      // S.listItem()
      //   .title('Blog posts')
      //   .schemaType('post')
      //   .child(S.documentTypeList('post').title('Blog posts')),
      // S.listItem()
      //   .title('Authors')
      //   .icon(MdPerson)
      //   .schemaType('author')
      //   .child(S.documentTypeList('author').title('Authors')),
      // S.listItem()
      //   .title('Categories')
      //   .schemaType('category')
      //   .child(S.documentTypeList('category').title('Categories')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
