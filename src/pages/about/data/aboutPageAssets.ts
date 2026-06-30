import { homeAssets } from '../../home/data/homeAssets'

export const aboutPageAssets = {
  hero: homeAssets.heroBg,
  portraitMain: homeAssets.aboutPortrait,
  portraitAccent: homeAssets.blogs[0],
  educationExperience: homeAssets.blogs[1],
  careerBack: homeAssets.affiliations['Government Advisory Bodies'],
  careerFront: homeAssets.aboutPortrait,
  achievementImages: [
    homeAssets.affiliations['Private Organizations'],
    homeAssets.blogs[0],
    homeAssets.affiliations['Government Advisory Bodies'],
    homeAssets.blogs[1],
    homeAssets.affiliations['European Commission'],
  ],
} as const
