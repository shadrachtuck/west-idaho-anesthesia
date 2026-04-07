import { gql } from '@apollo/client';

/**
 * ACF field group "WIA Homepage & Site" (graphql_field_name: wiaHomeFields) on the WordPress front page.
 * Field names follow WPGraphQL for ACF camelCase from ACF snake_case names.
 */
export const WiaHomeFieldsFragment = gql`
  fragment WiaHomeFields on Page {
    wiaHomeFields {
      heroOrganizationName
      heroHeading
      heroServiceArea
      heroCarousel {
        slideImage {
          node {
            sourceUrl
            altText
          }
        }
        overlayText
      }
      storyParagraph1
      storyQuote1
      storyParagraph2
      storyQuote2
      storyCtaParagraph
      onlineBillPayHeading
      onlineBillPayDescription
      missionHeading
      missionBody
      missionTagline
      givesBackHeading
      givesBackText
      simulationHeading
      simulationText
      teamProvidersList
      teamSectionHeading
      contactAddressLine1
      contactAddressLine2
      contactPhone
      contactEmail
      footerOrganizationName
      socialLinks {
        linkedinLink
        instaLink
        facebookLink
      }
    }
  }
`;
