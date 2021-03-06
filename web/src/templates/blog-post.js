// import React from 'react';
// import { graphql } from 'gatsby';
// import { Container, GraphQLErrorList, BlogPost, SEO } from 'components';
// import { toPlainText } from 'lib';
// import Layout from '../containers/layout';

// export const query = graphql`
//   query BlogPostTemplateQuery($id: String!) {
//     post: sanityPost(id: { eq: $id }) {
//       id
//       publishedAt
//       categories {
//         _id
//         title
//       }
//       title
//       slug {
//         current
//       }
//       _rawExcerpt(resolveReferences: { maxDepth: 5 })
//       _rawBody(resolveReferences: { maxDepth: 5 })
//       employees {
//         _key
//         employee {
//           image {
//             crop {
//               _key
//               _type
//               top
//               bottom
//               left
//               right
//             }
//             hotspot {
//               _key
//               _type
//               x
//               y
//               height
//               width
//             }
//             asset {
//               _id
//             }
//           }
//           name
//         }
//       }
//     }
//   }
// `;

// const BlogPostTemplate = props => {
//   const { data, errors } = props;
//   const post = data && data.post;
//   return (
//     <Layout>
//       {errors && <SEO title="GraphQL Error" />}
//       {post && (
//         <SEO title={post.title || 'Untitled'} description={toPlainText(post._rawExcerpt)} image={post.mainImage} />
//       )}

//       {errors && (
//         <Container>
//           <GraphQLErrorList errors={errors} />
//         </Container>
//       )}

//       {post && <BlogPost {...post} />}
//     </Layout>
//   );
// };

// export default BlogPostTemplate;
