import { Variants } from 'framer-motion'

export const animationTranslate = (axis: 'y' | 'x' = 'y', px = -100): Variants => {
  return {
    hidden: {
      opacity: 0,
      [axis]: px,
    },

    visible: (sec) => ({
      [axis]: 0,
      opacity: 1,
      transition: {
        delay: sec ? sec * 0.1 : 0,
      },
    }),
  }
}
