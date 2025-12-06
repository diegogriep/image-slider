import ImageList from './ImageList'

const mockSlides = ['0.jpg', '1.jpg', '2.jpg', '3.jpg']

describe('ImageList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const imageList = Object.create(ImageList.prototype)
    jest
      .spyOn(imageList, '_loadImages')
      .mockImplementation(() => mockSlides.map(() => new Image()))
    imageList._loadImages()
  })

  it('should load the images', () => {
    const imageList = new ImageList()
    imageList._loadImages()
    expect(imageList.images).not.toBe([])
  })
})
