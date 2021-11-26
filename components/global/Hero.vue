<template>
  <div
    v-if="isHome"
    class="hero"
  >
    <span class="hero__fact">
      <div class="hero__heading">
        <p data-hero-heading="Leave it better">Leave it better</p>
        <p data-hero-heading="Than you found it">Than you found it</p>
      </div>
      <p>This is a place of
        <span class="typing">
          {{ fact }}
        </span>
      </p>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          text: 'Experimenting'
        },
        {
          text: 'Writing'
        }
      ],
      fact: 'Learning'
    }
  },
  computed: {
    isHome () {
      return this.$route.name === 'index'
    }
  },
  mounted () {
    setInterval(() => {
      const chosenNumber = Math.floor(Math.random() * this.list.length)
      this.fact = this.list[chosenNumber].text
    }, 15000)
  }
}
</script>

<style lang="scss">

:root {
  --leave-it-text: var(--clr-fifth-dk);
  --hero-fact: var(--clr-fifth);
}

.hero {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: var(--grid-gap);
    align-items: center;
    position: relative;
    padding: 40px 0 20px;
    margin: 0;
    width: 100%;
    &__heading {
        font-size: 5rem;
        text-transform: lowercase;
        line-height: 0.25;
        color: var(--leave-it-text);
        & p {
            position: relative;
            margin: 0;
            line-height: 1.25;
            font-weight: var(--fw-base-xl);
        }
        & p::before {
            content: attr(data-hero-heading);
            position: absolute;
            top: -5px;
            left: -5px;
            color: var(--clr-primary);
            text-shadow: 0 1px 0 #ccc, 0 0px 0 #ccc, 0 2px 0 #ccc, 0 2px 0 #ccc, 0 2px 0 #ccc, 0 6px 0 transparent, 0 4px 0 transparent, 0 3px 0 transparent, 0 4px 0 transparent, 0 6px 6px rgba(#4c7479, 0.4);
            -webkit-text-stroke: 1px var(--clr-secondary);
            opacity: 0.85;
        }
    }
    &__fact {
        letter-spacing: -0.5px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        text-transform: lowercase;
        & > p  {
            color: var(--ff-color);
            font-size: var(--step-1);
            font-weight: var(--fw-base);
            text-align: left;
            margin: 0;
            padding: var(--padding-df);
            padding-left: 70px;
            position: relative;
            &::before {
                content: "";
                border-top: 3px solid var(--clr-fifth);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                left: 10px;
            }
        }
    }
}

.hero__fact .typing {
  padding: 0;
  font-weight: var(--fw-base-lg);
  background: var(--hero-fact);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
  color: var(--clr-primary);
}

@media (max-width: 1100px) {
  .hero {
    padding: 40px 0;
    &__fact {
      color: var(--ff-color);
      padding: 0;
      position: relative;
      z-index: 2;

      & span {
        text-align: center;
      }
    }
  }
}

@media (max-width: 640px) {
.hero {
    padding: 0;
    &__fact {
      & span  {
        text-align: left;
        padding: var(--padding-df);
      }
    }

    &__image {
      padding: 40px 0 0;
      margin-bottom: 40px;
      margin-left: 0;
      -webkit-transform: rotate(5deg);
      transform: rotate(5deg);
      grid-column: 3 / 5;
      grid-row: 1;
    }
  }
}

@media (max-width: 640px) {
    .hero__fact > p {
        padding-left: 40px;
        font-size: var(--step-0);
    }

    .hero__fact p::before {
        width: 30px;
        left: 0;
    }
    .hero__heading p {
        padding: 0;
        font-size: 3rem;
        &::before {
            width: 100%;
        }
    }
}

</style>
