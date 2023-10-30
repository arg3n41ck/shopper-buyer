import { Variants } from 'framer-motion'

export const animationScale = (axis?: 'Y' | 'X'): Variants => {
  const scaleAxis = axis ? 'scale' + axis : 'scale'

  return {
    hidden: {
      opacity: 0,
      [scaleAxis]: 0,
    },

    visible: (sec) => ({
      [scaleAxis]: 1,
      opacity: 1,
      transition: {
        delay: sec ? sec * 0.1 : 0,
      },
    }),
  }
}
