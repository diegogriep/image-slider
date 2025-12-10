import {
  calculateAspectRatioFit,
  calculateAxisCoordinates
} from '../../utils/index'
import ImageList from '../ImageList/ImageList'

class DrawImage {
  private readonly imagesList = new ImageList()
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  currentSlide: number
  currentX: number
  startX: number
  isDragging: boolean
  images: HTMLImageElement[]
  wasInteracted: boolean

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.context = context
    this.currentX = 0
    this.startX = 0
    this.isDragging = false
    this.currentSlide = 0
    this.images = []
    this.wasInteracted = false
  }

  _drawImageAtIndex(index: number, coordinatesX: number, isPrevious = false) {
    const w = this.canvas.width
    const h = this.canvas.height
    const img = this.images[index]
    const fittedSize = calculateAspectRatioFit(img!.width, img!.height, w, h)
    const coordinates = calculateAxisCoordinates(
      fittedSize.width,
      fittedSize.height,
      w,
      h
    )

    const xAxis = isPrevious
      ? coordinatesX - coordinates.x
      : coordinatesX + coordinates.x

    this.context.drawImage(
      img!,
      xAxis,
      coordinates.y,
      fittedSize.width,
      fittedSize.height
    )
  }

  drawImageCover() {
    if (this.images.length < this.imagesList.slides.length) return
    const w = this.canvas.width
    const h = this.canvas.height

    this.context.clearRect(0, 0, w, h)
    this.context.fillStyle = '#f0f0f0'
    this.context.fillRect(0, 0, w, h)

    this._drawImageAtIndex(this.currentSlide, this.currentX)

    if (this.currentSlide < this.imagesList.slides.length - 1) {
      this._drawImageAtIndex(this.currentSlide + 1, this.currentX + w)
    }

    if (this.currentSlide > 0) {
      this._drawImageAtIndex(this.currentSlide - 1, this.currentX - w, true)
    }
  }

  async getImages() {
    await this.imagesList._loadImages()
    this.images = this.imagesList.images

    this.drawImageCover()
  }

  loadEvents() {
    this.canvas.addEventListener('mousedown', (event) => {
      this.startX = event.clientX - this.currentX
      this.canvas.style.cursor = 'grabbing'
      this.isDragging = true
      if (!this.wasInteracted) {
        this.wasInteracted = true
        document.getElementById('instructions')!.style.display = 'none'
      }
    })

    this.canvas.addEventListener('mousemove', (event) => {
      if (!this.isDragging) return

      let dx = event.clientX - this.startX

      if (this.currentSlide === 0 && dx > 0) {
        dx = 0
      }

      if (this.currentSlide === this.imagesList.slides.length - 1 && dx < 0) {
        dx = 0
      }

      this.currentX = dx
      this.drawImageCover()
    })

    this.canvas.addEventListener('mouseup', () => this.mouseReleaseDrag())
    this.canvas.addEventListener('mouseleave', () => this.mouseReleaseDrag())
  }

  mouseReleaseDrag() {
    if (!this.isDragging) return
    this.isDragging = false

    const w = this.canvas.width
    const threshold = w * 0.5

    if (
      this.currentX < -threshold &&
      this.currentSlide < this.imagesList.slides.length - 1
    ) {
      this.currentSlide++
      this.currentX += w
    }

    if (this.currentX > threshold && this.currentSlide > 0) {
      this.currentSlide--
      this.currentX -= w
    }

    this.canvas.style.cursor = 'grab'
    this.drawImageCover()
  }
}

export default DrawImage
