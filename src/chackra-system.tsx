import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        darkblue: {
          50: { value: '#02061290' },
          100: { value: '#0b1622' },
          200: { value: '#151f2d' },
          300: { value: '#152232' },
          500: { value: '#1e3356' },
          700: { value: '#31b1ee' },
        },
      },
    },
  },
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      backgroundColor: 'darkblue.100',
    },
  },
})

export const system = createSystem(defaultConfig, config)
