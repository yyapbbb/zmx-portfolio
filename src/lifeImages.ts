/// <reference types="vite/client" />

const imageModules = import.meta.glob('./assets/life/*.{jpg,jpeg,png,webp,gif,bmp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const LIFE_WALL_ITEMS = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b, 'zh-CN', { numeric: true }))
  .map(([path, image]) => {
    const fileName = path.split('/').pop() || 'image'
    const title = fileName.replace(/\.[^.]+$/, '')
    return { image, title, href: undefined as string | undefined }
  })

const thumbModules = import.meta.glob('./assets/life-thumbs/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const LIFE_WALL_THUMBS = Object.entries(thumbModules)
  .sort(([a], [b]) => a.localeCompare(b, 'zh-CN', { numeric: true }))
  .map(([path, image]) => {
    const fileName = path.split('/').pop() || 'image'
    const title = fileName.replace(/\.webp$/, '')
    return { image, title }
  })
