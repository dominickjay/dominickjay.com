<template>

  <aside :class="type">

    <svg v-if="this.type == 'info'" class="aside__icon" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 1.895a18.107 18.107 0 1 0 18.107 18.107A18.128 18.128 0 0 0 20 1.895Zm0 32.639a14.532 14.532 0 1 1 14.532-14.532A14.548 14.548 0 0 1 20 34.534Z" fill="#222"/><path d="M19.215 14.693a2.42 2.42 0 1 0 0-4.842 2.42 2.42 0 0 0 0 4.842ZM17.63 16.86a1.44 1.44 0 0 0 .252 2.856h.142v7.971h-.77a1.231 1.231 0 0 0-1.23 1.231 1.231 1.231 0 0 0 1.23 1.232h5.492a1.232 1.232 0 0 0 1.232-1.232 1.231 1.231 0 0 0-1.232-1.23h-.761V17.511a1.243 1.243 0 0 0-1.484-1.219c-1.242.246-2.821.559-2.87.567Z" fill="#222"/></svg>

    <svg v-if="this.type == 'warning' || this.type == 'error'" class="aside__icon" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M39.534 33.577 23.978 2.466a4.445 4.445 0 0 0-7.955 0L.467 33.576a4.39 4.39 0 0 0 .2 4.312A4.445 4.445 0 0 0 4.445 40h31.111a4.432 4.432 0 0 0 3.778-2.11 4.371 4.371 0 0 0 .2-4.312Zm-19.533 1.978a3.334 3.334 0 1 1 0-6.668 3.334 3.334 0 0 1 0 6.668Zm2.177-10.68a2.222 2.222 0 0 1-4.355 0l-2.2-11.111A2.22 2.22 0 0 1 17.8 11.11h4.406a2.221 2.221 0 0 1 2.178 2.654l-2.207 11.11Z" /></g><defs><clipPath id="a"><path d="M0 0h40v40H0z"/></clipPath></defs></svg>

    <div class="aside__content">

      <p><strong>{{ heading }}</strong></p>

      <p v-html="text"></p>

    </div>

  </aside>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: null
    },
    heading: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  },
  mounted() {
    const canvas = document.getElementsByTagName('aside')

    function getRandomXPosition (index) {
      const width = canvas[index].scrollWidth
      const x = Math.floor(Math.random() * width)
      return x
    }

    function getRandomYPosition (index) {
      const height = canvas[index].offsetHeight
      const y = Math.floor(Math.random() * height)
      return y
    }

    function getRandomRadius (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    }

    function createCircles () {

        for (let index = 0; index < canvas.length; index++) {
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          const svgNS = svg.namespaceURI

          const circle = document.createElementNS(svgNS, 'circle')
          const line = document.createElementNS(svgNS, 'line')
          const fill = "rgba(255,255,255,.5)"
          const stroke = "rgba(255,255,255,.5)"
          const circlePositionx = getRandomXPosition(index)
          const circlePositiony = getRandomYPosition(index)
          const linePositionx = getRandomXPosition(index)
          const linePositiony = getRandomYPosition(index)
          const radius = getRandomRadius(50, 150)

          circle.setAttributeNS(null, 'id', 'gen-circle')
          circle.setAttributeNS(null, 'cx', circlePositionx)
          circle.setAttributeNS(null, 'cy', circlePositiony)
          circle.setAttributeNS(null, 'r', radius)

          if (index % 2 !== 0) {
            circle.setAttributeNS(null, 'fill', 'none')
            circle.setAttributeNS(null, 'stroke', stroke)
          } else {
            circle.setAttributeNS(null, 'fill', fill)
            circle.setAttributeNS(null, 'stroke', 'transparent')
          }
          circle.setAttributeNS(null, 'stroke-width', 2)

          line.setAttributeNS(null, 'id', 'gen-line')
          line.setAttribute('x1', linePositionx)
          line.setAttribute('y1', linePositiony)
          line.setAttribute('x2', linePositionx + 200)
          line.setAttribute('y2', linePositiony + 200)
          line.setAttribute('stroke', fill)
          line.setAttribute('stroke-width', 2)

          svg.appendChild(circle)
          canvas[index].appendChild(svg)
          svg.appendChild(line)
          canvas[index].appendChild(svg)
        }
    }

    createCircles()
  }
}

</script>

<style lang="scss">

// :root {
//   --aside-background: rgba(255, 255, 255, 0.15);
//   --aside-border: var(--fifth-dk);
//   --aside-icon: var(--fifth-dk);
// }

.aside__content {
  position: relative;
  z-index: 1;
  color: var(--gray-500);
}

aside {
  position: relative;
  padding: 20px 40px;
  padding-left: 80px;
  margin: 40px 0;
  & svg:not([class]) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0.35;
  }
}

.aside__icon {
  position: absolute;
  top: 25px;
  left: 20px;
}

.prerequisites {
  background: linear-gradient(to right, rgba(192,213,216,1) 0%, rgba(166,197,201,1) 100%);
  color: var(--ff-color);
  padding-left: 40px;
}

.info {
  background: linear-gradient(to right, rgba(173,195,215,1) 0%, rgba(146,175,201,1) 100%);
}

.warning {
    background: linear-gradient(to right, rgba(253,210,175,1) 0%, rgba(251,188,136,1) 100%);
    & .aside__icon {
      fill: #C55D07;
    }
}

.error {
    background: linear-gradient(to right, rgb(245, 176, 171) 0%, rgb(247, 155, 148) 100%);
    & .aside__icon {
      fill: #B42318;
    }
}
</style>
