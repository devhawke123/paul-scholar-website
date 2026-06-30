import aboutPortrait from '../../../assets/homepage/dr-paul.png'
import affiliationEuropean from '../../../assets/homepage/european-comission.png'
import affiliationGovernment from '../../../assets/homepage/government-advisory-bodies.png'
import affiliationPrivate from '../../../assets/homepage/private-organizations.png'
import authorAvatar from '../../../assets/homepage/dr-paul.png'
import heroBg from '../../../assets/homepage/hero-bg.jpg'
import blogCybernetic1 from '../../../assets/homepage/the-cybernetic1.jpg'
import blogCybernetic2 from '../../../assets/homepage/the-cybernetic2.png'

export const homeAssets = {
  heroBg,
  aboutPortrait,
  authorAvatar,
  affiliations: {
    'Private Organizations': affiliationPrivate,
    'Government Advisory Bodies': affiliationGovernment,
    'European Commission': affiliationEuropean,
  },
  blogs: [blogCybernetic1, blogCybernetic2],
} as const
