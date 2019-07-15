<template>
    <svg :style="{ height: opts.height + 'px', width: opts.width + 'px' }">
        <polygon
            :fill="pColor"
            :points="polygonPoints"
        >
        </polygon>
       <polyline
           fill="none"
           :points="polylinePoints"
           :stroke="sColor"
           :stroke-width="opts.strokeWidth"
           stroke-linecap="square"
       >
       </polyline>
    </svg>
</template>
<script>
export default {
  data: function() {
    return {
      coords: [],
      opts: { strokeWidth: 1 },
      pColor: '#c6d9fd',
      sColor: '#4d89f9'
    }
  },
  props: {
    values: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    rose: {
      type: String,
      required: false
    }
  },
  created: function() {
    this.opts.width = this.width || 120
    this.opts.height = this.height || 50
    this.opts.rose = this.rose || 0
    if (parseFloat(this.opts.rose) < 0) {
      this.pColor = '#11132c'
      this.sColor = '#8090af'
    } else {
      this.pColor = '#11132c'
      this.sColor = '#8090af'
    }
    this.draw()
  },
  computed: {
    polylinePoints: function() {
      return this.coords.slice(2, this.coords.length - 2).join(' ')
    },
    polygonPoints: function() {
      this.coords = this.coords.filter(item => item.toString() != 'NaN') // 过滤NaN，解决插件在页面上报错的问题
      if (this.coords[0] != undefined) {
        return this.coords.join()
      }
    }
  },
  methods: {
    draw() {
      const opts = this.opts
      const values = this.values
      if (values.length == 1) values.push(values[0])
      let max = Math.max.apply(Math, opts.max == undefined ? values : values.concat(opts.max)),
        min = Math.min.apply(Math, opts.min == undefined ? values : values.concat(opts.min))

      let strokeWidth = opts.strokeWidth,
        width = opts.width,
        height = opts.height - strokeWidth,
        diff = max - min

      const xScale = this.x = function(input) {
        return input * (width / (values.length - 1))
      }

      const yScale = this.y = function(input) {
        let y = height

        if (diff) {
          y -= ((input - min) / diff) * height
        }

        return y + strokeWidth / 2
      }

      const zero = yScale(Math.max(min, 0))
      this.coords = []
      this.coords = [0, zero]

      for (let i = 0; i < values.length; i++) {
        this.coords.push(
            xScale(i),
            yScale(values[i])
            )
      }

      this.coords.push(width, zero)
    }
  }
}
</script>
