import baseColors, { blue, green, yellow, red } from "./colors";
import { tint, shade } from 'polished';

// theme.js
export default {
  breakpoints: ['52em', '64em'],
  // breakpoints: ['40em', '52em', '64em', '80em'],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 78, 84, 116],
  fontWeights: [0, 300, 400, 600, 700],
  letterSpacings: [0, 1, 2, 4, 8],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
  fonts: {
    serif: '"georgia regular", athelas, times, serif',
    sansSerif: '"Inter", -apple-system, sans-serif',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  radii: ['0', '4px', '8px', '16px', '2rem'],
  width: [0, 16, 32, 64, 128, 256],
  minWidths: [0, 16, 32, 64, 128, 256],
  maxWidths: [0, 16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  heights: [0, 16, 32, 64, 128, 256],
  minHeights: [0, 16, 32, 64, 128, 256],
  maxHeights: [0, 16, 32, 64, 128, 256],
  borders: [0, '1px solid transparent',' 3px solid'],
  borderWidths: ['0', '1px', '2px', '4px'],
  shadows: [
    '0',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0 7px 14px rgba(50,50,93,.1)',
    '1px 1px 0px rgba(0,0,0,0.2)'
  ],
  opacity: {
    disabled: 0.4,
  },
  colors: {
    primary: blue.base,
    'gradient-bg': 'linear-gradient(120deg, #f6d365 0%, #ea0d73 100%)',
    'primary-light': blue.light[1],
    'primary-dark': blue.dark[1],
    bgBlue: '#0030e0',
    blue: '#0036ff',
    lightBlue: '#79f4e1',
    copyColor: '#3F3D4B',
    black: baseColors.black,
    'near-black': '#111',
    'dark-gray': '#333',
    'mid-gray': '#555',
    gray: ' #f7f7f7',
    grey: '#CCC',
    silver: '#999',
    'light-silver': '#aaa',
    'moon-gray': '#ccc',
    'light-gray': '#eee',
    'near-white': '#f4f4f4',
    white: '#fff',
    transparent: 'transparent',
    blacks: [
      'rgba(0,0,0,.0125)',
      'rgba(0,0,0,.025)',
      'rgba(0,0,0,.05)',
      'rgba(0,0,0,.1)',
      'rgba(0,0,0,.2)',
      'rgba(0,0,0,.3)',
      'rgba(0,0,0,.4)',
      'rgba(0,0,0,.5)',
      'rgba(0,0,0,.6)',
      'rgba(0,0,0,.7)',
      'rgba(0,0,0,.8)',
      'rgba(0,0,0,.9)',
    ],
    whites: [
      'rgba(255,255,255,.0125)',
      'rgba(255,255,255,.025)',
      'rgba(255,255,255,.05)',
      'rgba(255,255,255,.1)',
      'rgba(255,255,255,.2)',
      'rgba(255,255,255,.3)',
      'rgba(255,255,255,.4)',
      'rgba(255,255,255,.5)',
      'rgba(255,255,255,.6)',
      'rgba(255,255,255,.7)',
      'rgba(255,255,255,.8)',
      'rgba(255,255,255,.9)',
    ],
  },
  zIndices: [0, 9, 99, 999, 9999],
  messageStyle: {
    base: {
      color: shade(0.4, '#AAA'),
      backgroundColor: tint(0.9, '#AAA'),
      borderColor: '#AAA',
    },
    success: {
      color: shade(0.4, green.base),
      backgroundColor: tint(0.9, green.base),
      borderColor: green.base,
    },
    warning: {
      color: shade(0.4, yellow.base),
      backgroundColor: tint(0.9, yellow.base),
      borderColor: yellow.base,
    },
    danger: {
      color: shade(0.4, red.base),
      backgroundColor: tint(0.9, red.base),
      borderColor: red.base,
    },
    info: {
      color: shade(0.4, blue.base),
      backgroundColor: tint(0.9, blue.base),
      borderColor: blue.base,
    },
  },
  buttons: {
    primary: {
      color: blue.text,
      backgroundColor: blue.base,
      // use css custom props
      '--main-color': blue.base,
      '--contrast-color': blue.text,
    },
    normal: {
      color: baseColors.black,
      '--contrast-color': baseColors.black,
    },
    success: {
      '--main-color': green.base,
      '--contrast-color': green.text,
    },
    danger: {
      '--main-color': red.base,
      '--contrast-color': red.text,
    },
  },
  buttonSizes: {
    small: {
      fontSize: '0.75rem',
      height: '2rem',
      minWidth: '2rem',
      padding: '0 1rem',
    },
    medium: {
      fontSize: '1rem',
      height: '3rem',
      minWidth: '3rem',
    },
    large: {
      fontSize: '1.5rem',
      height: '4rem',
      minWidth: '4rem',
      borderRadius: '2rem'
    },
  },
};
