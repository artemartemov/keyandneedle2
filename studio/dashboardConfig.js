export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {
      name: 'gatsby',
      options: {
        sites: [
          {
            siteUrl: 'http://localhost:3333'
          }
        ]
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5d5af880b4cf423fab7e72b7',
                  title: 'Sanity Studio',
                  name: 'keyandneedle2-studio',
                  apiId: 'ace942d7-0472-402b-be98-b01c14fb31a4'
                },
                {
                  buildHookId: '5d5af88076c4c158434f1d8b',
                  title: 'Blog Website',
                  name: 'keyandneedle2',
                  apiId: '609973c2-8e38-4d1b-b6c2-2d7938cd182b'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/artemartemov/keyandneedle2',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://keyandneedle2.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
