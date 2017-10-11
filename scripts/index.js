new Vue({
  el: '#app',
  data() {
    return {
      modal: false,
      points: { a: -1, b: -1, c: -1, d: -1, e: -1 }
    }
  },

  computed: {
    path() {
      return Object.keys(this.points)
        .filter(key => ~'abcde'.indexOf(key))
        .map((key, i) => [i * 100, 100 - this.points[key]])
    }
  },

  methods: {
    setPoint(key) {
      let duration = this.random(3, 5)
      let destination = this.random(0, 100)
      this.animatePoint({ key, duration, destination })
    },

    animatePoint({ key, duration, destination }) {
      TweenLite.to(this.points, duration, {
        [key]: destination,
        ease: Sine.easeInOut,
        onComplete: this.setPoint,
        onCompleteParams: [key]
      })
    },

    random(min, max) {
      return ((Math.random() * (max - min)) + min).toFixed(2)
    }
  },

  mounted() {
    Object.keys(this.points).forEach(this.setPoint)
  }
})
