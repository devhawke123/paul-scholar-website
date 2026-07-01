import educationExperience from '../../../assets/about/educationExperience.png'
import portraitMain from '../../../assets/about/Rectangle 12398.png'
import achievement1 from '../../../assets/about/Rectangle 12436.png'
import achievement2 from '../../../assets/about/Rectangle 12437.png'
import achievement3 from '../../../assets/about/Rectangle 12438.png'
import achievement4 from '../../../assets/about/Rectangle 12439.png'
import achievement5 from '../../../assets/about/Rectangle 12440.png'
import { homeAssets } from '../../home/data/homeAssets'

export const aboutPageAssets = {
  portraitMain: homeAssets.aboutPortrait,
  portraitAccent: portraitMain,
  educationExperience,
  careerBack: homeAssets.affiliations['Government Advisory Bodies'],
  careerFront: homeAssets.aboutPortrait,
  achievementImages: [achievement1, achievement2, achievement3, achievement4, achievement5],
} as const
