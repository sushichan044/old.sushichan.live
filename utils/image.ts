const adjustAspectRatio = (width: number, height: number) => {
  // use 1200 / 630 or 1 / 1
  const ratio = width / height
  if (ratio > 1.5) {
    return '1200/630'
  }
  if (ratio > 1.5) {
    return '16/9'
  }
  if (ratio > 1.3) {
    return '4/3'
  }
  if (ratio > 1) {
    return '3/2'
  }
  if (ratio > 0.9) {
    return '1/1'
  }
  return '1/1'
}

export { adjustAspectRatio }
