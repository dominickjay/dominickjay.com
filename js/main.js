import AOS from 'aos';

import './components/hero'
import './components/post'
import './components/duolingo'

import 'aos/dist/aos.css'

AOS.init({
  once: true,
  startEvent: 'DOMContentLoaded',
})