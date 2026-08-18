export const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85'

export const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85'

const commonsImage = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1280`

export type StrataSite = {
  id: string
  title: string
  place: string
  period: string
  image: string
  fallback: string
  description: string
}

export const SITES: StrataSite[] = [
  {
    id: 'veil',
    title: '地层面纱',
    place: '远古海床',
    period: '二叠纪至白垩纪',
    image: BG_IMAGE_1,
    fallback:
      'linear-gradient(155deg, #1d241f, #4d3922 46%, #101310 100%)',
    description:
      '长期暴露的层理面构成一条无声的边界，连接着浅海、流沙与深时缓慢的化学反应。',
  },
  {
    id: 'ash',
    title: '飘散的火山灰',
    place: '火山记录',
    period: '新生代火山灰',
    image: BG_IMAGE_2,
    fallback:
      'linear-gradient(150deg, #211b16, #6a4527 45%, #0d0f0d 100%)',
    description:
      '飘越大洲的火山灰沉降为薄如纸张的岩层，把一次次喷发写进看似寻常的石头里。',
  },
  {
    id: 'canyon',
    title: '峡谷时光',
    place: '美国亚利桑那州大峡谷',
    period: '凯巴布至苏派层',
    image: commonsImage('Grand Canyon National Park-Arizona1575.JPG'),
    fallback:
      'linear-gradient(155deg, #42271a, #8a5a2e 48%, #171310 100%)',
    description:
      '石灰岩、砂岩与页岩沿崖壁逐级而下，跨越近二十亿年，在同一个断面上展露早已消失的环境。',
  },
  {
    id: 'fold',
    title: '褶皱基底',
    place: '挪威阿斯克尔',
    period: '奥陶纪页岩',
    image: commonsImage('Cambrosiluran IMG 7843 Langaara Asker Norway.JPG'),
    fallback:
      'linear-gradient(150deg, #272a2f, #5b6873 50%, #0e1012 100%)',
    description:
      '页岩与石灰岩在造山运动中被压成直立褶皱，证明看似水平的岩层也能被翻转成高耸的褶皱。',
  },
  {
    id: 'fossil',
    title: '菊石档案',
    place: '中生代海底',
    period: '侏罗纪至白垩纪',
    image: commonsImage('Ammonite fossil.JPG'),
    fallback:
      'linear-gradient(155deg, #1b1d1a, #6b6545 48%, #0d0e0c 100%)',
    description:
      '一枚被封存在石头里的螺旋壳标记着漫长记录中的一次生命，数百万年后仍能读出它的生长纹路。',
  },
  {
    id: 'basalt',
    title: '柱状熔岩流',
    place: '韩国济州岛',
    period: '火山冷却',
    image: commonsImage('Jeju ColumnarBasalt.JPG'),
    fallback:
      'linear-gradient(150deg, #121317, #3a4652 48%, #090a0c 100%)',
    description:
      '熔岩冷却收缩时裂成整齐的多边形柱体，把一场灾难性的喷发变成玄武岩的几何秩序。',
  },
]
