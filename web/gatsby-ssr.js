export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const components = getHeadComponents();
  for (let i = 0, n = components.length; i < n; i += 1) {
    const component = components[i];
    if (component.type === 'link' && component.props && component.props.rel === 'preload') {
      component.props.crossorigin = '';
    }
  }

  // WARNING: if multiple plugins implement this API it’s the last plugin that “wins”.
  // See https://www.gatsbyjs.org/docs/ssr-apis/
  replaceHeadComponents(components);
};
