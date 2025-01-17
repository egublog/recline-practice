export const listAnimations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },

  listItem: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  }
} as const;