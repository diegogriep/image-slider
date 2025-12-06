class ImageList {
  images: HTMLImageElement[] | [] = []
  readonly slides = ['0.jpg', '1.jpg', '2.jpg', '3.jpg']

  _loadImages() {
    return Promise.all(
      this.slides.map(
        (image, index) =>
          new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => {
              this.images[index] = img
              resolve()
            }
            img.src = `assets/images/${image}`
          })
      )
    )
  }
}

export default ImageList
