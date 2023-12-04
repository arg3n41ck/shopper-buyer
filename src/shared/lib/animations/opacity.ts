import { Variants } from 'framer-motion'

export const animationOpacity: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: (sec) => ({
    opacity: 1,
    transition: {
      delay: sec ? sec * 0.1 : 0,
    },
  }),
}
