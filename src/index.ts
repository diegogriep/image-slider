import ImageSlider from './components/ImageSlider/ImageSlider'
import './styles.scss'

const canvas = document.getElementById('slider')

const imageSliderBinding = new ImageSlider(canvas!)
await imageSliderBinding.init()
