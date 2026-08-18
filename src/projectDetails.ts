import { LIFE_WALL_ITEMS } from './lifeImages'

export type ProjectDetail = {
  id: string
  path: string
  title: string
  eyebrow: string
  description: string
  imageStart: number
}

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    id: 'residence',
    path: '/projects/residence',
    title: '私宅空间',
    eyebrow: '01 / RESIDENCE',
    description: '围绕真实生活节奏建立私密、舒适与秩序。',
    imageStart: 0,
  },
  {
    id: 'commercial',
    path: '/projects/commercial',
    title: '商业空间',
    eyebrow: '02 / COMMERCIAL',
    description: '以动线和体验塑造有辨识度的商业场景。',
    imageStart: 6,
  },
  {
    id: 'cultural',
    path: '/projects/cultural',
    title: '文化空间',
    eyebrow: '03 / CULTURE',
    description: '让空间成为内容、交流与记忆的容器。',
    imageStart: 12,
  },
  {
    id: 'retail',
    path: '/projects/retail',
    title: '品牌零售',
    eyebrow: '04 / RETAIL',
    description: '将品牌语言转化为可感知的线下体验。',
    imageStart: 18,
  },
  {
    id: 'office',
    path: '/projects/office',
    title: '办公空间',
    eyebrow: '05 / OFFICE',
    description: '在效率与舒适之间建立灵活的工作场域。',
    imageStart: 24,
  },
]

export const PROJECT_ACCORDION_ITEMS = PROJECT_DETAILS.map((item, index) => ({
  image: LIFE_WALL_ITEMS[(item.imageStart + index) % LIFE_WALL_ITEMS.length].image,
  label: item.title,
  link: undefined,
}))
