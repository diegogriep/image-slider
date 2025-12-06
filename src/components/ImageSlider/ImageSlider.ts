import DrawImage from '../DrawImage/DrawImage'

class ImageSlider {
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLElement) {
    this.canvas = canvas as HTMLCanvasElement
  }

  async init() {
    const context = this.canvas.getContext('2d')!

    const rect = this.canvas.getBoundingClientRect()

    this.canvas.width = rect.width
    this.canvas.height = rect.height
    context.fillStyle = '#f0f0f0'
    context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    const drawImageCover = new DrawImage(this.canvas, context)
    drawImageCover.getImages()
    drawImageCover.loadEvents()
  }
}

export default ImageSlider
