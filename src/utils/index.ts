type Dimensions = {
  width: number
  height: number
}

type Axis = {
  x: number
  y: number
}

function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): Dimensions {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)

  return { width: srcWidth * ratio, height: srcHeight * ratio }
}

function calculateAxisCoordinates(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): Axis {
  const coordinates = {
    x: (maxWidth - srcWidth) / 2,
    y: (maxHeight - srcHeight) / 2
  }
  return coordinates
}

export { calculateAspectRatioFit, calculateAxisCoordinates }
