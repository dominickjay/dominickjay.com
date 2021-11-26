<template>
  <main>
    <div class="container">
      <section class="content about-me">
        <div class="about-me__content">
          <h2 class="heading heading--two">{{ about.title }}</h2>
          <p>{{ about.intro }}</p>
          <nuxt-content :document="about" />
          <div class="testimonial">
            <p>
              "{{ about.testimonial[randomTestimonialNumber].testimonial }}"
            </p>
          </div>
        </div>
        <div class="about-me__skills">
          <h3 class="heading">Skills</h3>
          <div class="skill">
            <p>General</p>
            <ul class="list">
              <li v-for="skill in about.skillsGeneral" :key="skill">{{ skill }}</li>
            </ul>
          </div>
          <div class="skill">
            <p>Design</p>
            <ul class="list">
              <li v-for="skill in about.skillsDesign" :key="skill">{{ skill }}</li>
            </ul>
          </div>
          <div class="skill">
            <p>Development</p>
            <ul class="list">
              <li v-for="skill in about.skillsDevelopment" :key="skill">{{ skill }}</li>
            </ul>
          </div>
        </div>
        <div class="about-me__experience">
          <h3 class="heading">Experience</h3>
          <ul class="list">
            <li v-for="experience in about.experience" :key="experience">
              <p>{{ experience.title }}</p>
              <span>{{ experience.position }}</span> : <span>{{ experience.dateRange }}</span>
            </li>
          </ul>
        </div>
        <!-- <div
          id="joke"
          class="joke"
        >
          <h3 class="heading">Random Dad Joke</h3>
          {{ joke }}
        </div> -->
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData ({ $content, $axios }) {
    const about = await $content('about').fetch()
    // const joke = await $axios.$get('https://icanhazdadjoke.com', {
    //   headers: {'Content-Type': 'application/json'}})
    return {
      about,
      // joke
    }
  },
  data() {
    return {
      joke: [],
      about: {
        testimonial: Array
      },
      randomTestimonialNumber: null as any
    }
  },
  created () {
    function getRandomInt (min: number, max: number) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    }

    this.randomTestimonialNumber = getRandomInt(0, this.about.testimonial.length)
  }
  // mounted () {
  //   axios
  //     .get('https://icanhazdadjoke.com/', {
  //       headers: {
  //         Accept: 'application/json'
  //       }
  //     })
  //     .then((response) => {
  //       this.newJoke = response.data.joke
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // },
})
</script>

<style lang="scss">

:root {
  --skill-background: var(--clr-secondary);
  --skill-font: var(--clr-base);
  --testimonial-text: var(--clr-secondary);
}

@media (prefers-color-scheme: dark) {
  :root {
    --skill-background: var(--clr-primary);
    --skill-font: var(--clr-secondary);
    --testimonial-text: var(--clr-secondary);
  }

  :root:not([data-user-color-scheme]) {
    --skill-background: var(--clr-primary);
    --skill-font: var(--clr-secondary);
    --testimonial-text: var(--clr-secondary);
  }
}

[data-user-color-scheme='dark'] {
  --skill-background: var(--clr-primary);
  --skill-font: var(--clr-secondary);
  --testimonial-text: var(--clr-secondary);
}

.about-me {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-template-areas: "about-content about-content skills"
                        "about-content about-content skills"
                         "about-content about-content experience"
                         "about-content about-content joke";
  align-items: start;
  grid-gap: 0 calc(var(--grid-gap) * 2);
  & h2,
  & h3 {
    font-family: var(--ff-heading);
    font-size: var(--step-5);
    text-align: left;
    position: relative;
  }
  & h3 {
    font-size: var(--step-3);
    margin-top: 40px;
    margin-bottom: 0;
    &:not(:first-child) {
      margin-block: 0;
    }
  }
  &__content {
    grid-area: about-content;
    position: sticky;
    top: 0;
    & > p {
      font-weight: var(--fw-base-m);
      opacity: 0.65;
      font-size: var(--step-1);
    }
  }
  & .nuxt-content-container {
    max-width: none;
    margin-bottom: 40px;
    font-size: var(--step-0);
  }
  &__skills {
    grid-area: skills;
  }
  &__experience {
    grid-area: experience;
  }
}

.list {
  list-style: none;
  margin-block: 0;
  padding-inline: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 10px;
  & li {
    padding-block: 5px;
    padding-inline: 0;
    flex-direction: column;
  }
  p {
    font-size: var(--step-1);
    font-weight: var(--fw-base-m);
    opacity: 0.85;
    margin-block: 10px;
  }
  span:last-child {
    opacity: 0.75;
  }
}

.skill {
  &:not(:last-child) {
    margin-bottom: 40px;
  }
  & .list {
    flex-wrap: wrap;
    flex-direction: row;
  }
  & p {
    margin-block: 20px;
    font-weight: var(--fw-base-m);
    opacity: 0.65;
  }
  & li {
    background-color: var(--clr-sixth-lt);
    color: var(--clr-base-dk);
    display: flex;
    flex-direction: column;
    padding-inline: 10px;
    font-weight: var(--fw-base-m);
  }
}

.testimonial {
  font-size: var(--step-1);
  margin-top: 40px;
  padding-block: 40px;
  padding-inline: 60px;
  font-weight: var(--fw-base-m);
  background-color: var(--clr-third-lt);
  color: var(--testimonial-text);
}

.joke {
  grid-area: joke;
}

@media (max-width: 992px) {
  .about-me {
    grid-template-areas: "about-content"
                          "about-body"
                          "testimonial"
                          "skills"
                          "experience"
                          "joke";
    & h3 {
      margin-top: 20px;
    }
    &__content {
      position: relative;
    }
  }
  .testimonial {
    width: 100%;
  }

  @media (max-width: 640px) {
    .testimonial {
      padding-inline: 20px;
      padding-block: 20px;
    }
  }
}
</style>
