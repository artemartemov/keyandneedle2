import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { scale, mq } from 'utils';

const ContactItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0;
  grid-auto-flow: dense;
  margin: 0 1rem 1rem;

  ${mq.tablet`
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
    margin: 0;
    grid-gap: 1rem;
  `}
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    ${scale(0.25)}
    color: #000;
    line-height: 1.7;
    margin: 1.25rem 0 0;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  p,
  a {
    ${scale(-0.4)}
    line-height: 1.45;
    margin: 0;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
    text-transform: uppercase;
  }

  ${mq.desktopWide`
    h1 {
      ${scale(0.5)}
      line-height: 1.7;
    }

    p, a {
      ${scale(-0.25)}
      line-height: 1.45;
    }
  `}
`;

const UseContactData = () => {
  const data = useStaticQuery(
    graphql`
      query ContactData {
        sanityContactPage(_id: { eq: "contactPage" }) {
          employeeListing {
            employee {
              name
              position
              email
              phoneNumber
            }
          }
        }
      }
    `
  );

  const contactData = (data && data.sanityContactPage.employeeListing) || '';

  return (
    <ContactItemContainer>
      {contactData.map(({ employee }, i) => (
        <ContactItem key={i.toString()}>
          <h1>{employee.name}</h1>
          <p>{employee.position}</p>
          <a href={`mailto:${employee.email}`}>{employee.email}</a>
          <a href={`tel:${employee.phoneNumber}`}>{employee.phoneNumber}</a>
        </ContactItem>
      ))}
    </ContactItemContainer>
  );
};

export default UseContactData;
