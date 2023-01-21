---
title: 'Creating an accordion slider in CSS and AlpineJS'
description: "In this article we're going to explore nesting, a new CSS module that is being introduced."
intro: "In this article we're going to explore nesting, a new CSS module that is being introduced. While this functionality has been around for a while when using preprocessors such as SASS and LESS."
date: Created
tags:
  - css
  - js
  - writing
layout: 'layouts/post.njk'
eleventyExcludeFromCollections: true
---

```html
<div class="h-full">
  <div
    class="min-h-[500px] flex flex-col gap-y-[16px] md:gap-0 md:flex-row h-full justify-between"
    x-data="{ active: 0 }"
  >
    <div
      @click="expanded = !expanded"
      :aria-expanded="expanded"
      x-data="{
        id: 0,
        get expanded() {
          if (window.innerWidth > 768) {
            return this.active === this.id
          } else {
            return this.active === 0
          }
        },
        set expanded(value) {
          if (window.innerWidth > 768) {
            this.active = value ? this.id : this.id
          }
        }
      }"
      role="region"
      class="relative bg-white rounded-br-[40px] md:rounded-br-[56px] transition-width duration-[0.3s] ease-default flex flex-col-reverse md:flex-row justify-end overflow-hidden group md:w-[739px]"
      :class="{
        'md:w-[739px]' : expanded,
        'md:w-[167px] cursor-pointer after:bg-white/[0.0] after:duration-[0.3s] after:ease-default hover:after:bg-white/[0.08] after:absolute after:inset-0 after:h-full' : !expanded
      }"
      aria-expanded="true"
    >
      <div
        x-transition:enter.duration.1000ms
        x-transition:leave.duration.0ms
        data-reveal
        class="flex flex-col text-black p-[24px] md:p-[45px] md:w-[358px] md:absolute h-full md:left-0 s--revealed">
        <h3 class="h3 reveal--in delay--2 !text-black">
          <strong>Baseline Rewards:</strong>
          <br>Connect your Car
        </h3>
        <div class="richtext mt-[16px] flex-auto">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div class="flex w-full items-center mb-0 mt-[36px]">
          <a
            href="https://dimo.test/about"
            class="w-full flex justify-between items-center transition-[color] duration-[0.3s] delay-[0s]"
          >
            Connect your car
          </a>
        </div>
      </div>
      <div class="group-hover:scale-[1.05] ease-default transition-all duration-[0.3s] will-change-transform">
        <picture class="h-full max-h-[245px] md:max-h-none w-full md:max-w-[358px] object-cover" data-iesrc="https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=100" data-alt="Rectangle 5423">
          <source srcset="https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=auto&amp;h=auto&amp;dpr=0.8 1x,https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=auto&amp;h=auto&amp;dpr=2 2x">

          <img src="https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=100" alt="Rectangle 5423" class="h-full max-h-[245px] md:max-h-none w-full md:max-w-[358px] object-cover" loading="lazy" width="716" height="1000" style="background-position: 50% 50%; object-position: 50% 50%">
      </picture>

    </div>
  </div>
  <div @click="expanded = !expanded" :aria-expanded="expanded" x-data="{
                  id: 1,
                        get expanded() {
                            if (window.innerWidth > 768) {
                                return this.active === this.id
                            } else {
                                return this.active === 1
                            }
                        },
                        set expanded(value) {
                            if (window.innerWidth > 768) {
                                this.active = value ? this.id : this.id
                            }
                        }
                    }" role="region" class="relative bg-white rounded-br-[40px] md:rounded-br-[56px] transition-width duration-[0.3s] ease-default flex flex-col-reverse md:flex-row justify-end overflow-hidden group md:w-[167px] cursor-pointer after:bg-white/[0.0] after:duration-[0.3s] after:ease-default hover:after:bg-white/[0.08] after:absolute after:inset-0 after:h-full" :class="{
                       'md:w-[739px]' : expanded,
                       'md:w-[167px] cursor-pointer after:bg-white/[0.0] after:duration-[0.3s] after:ease-default hover:after:bg-white/[0.08] after:absolute after:inset-0 after:h-full' : !expanded
                    }" aria-expanded="false">
                    <div x-transition:enter.duration.1000ms="" x-transition:leave.duration.0ms="" data-reveal="" class="flex flex-col text-black p-[24px] md:p-[45px] md:w-[358px] md:absolute h-full md:left-0 s--revealed">
                        <h3 class="h3 reveal--in delay--2 !text-black"><strong>Baseline Rewards: </strong><br>Connect your Car</h3>
                        <div class="richtext mt-[16px] flex-auto"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div>
                        <div class="flex w-full items-center mb-0 mt-[36px]">
                            <a href="https://dimo.test/about" class="w-full flex justify-between items-center transition-[color] duration-[0.3s] delay-[0s]">
                                Connect your car
                                <span>
                                    <svg class="fill-white rounded-full transition-all duration-[0.3s] delay-[0] ease-in-out group-hover:text-white group-hover:stroke-white group-hover:fill-purple group-hover:rotate-45 w-[48px] h-[48px] md:w-[72px] md:h-[72px]" width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="36" r="35.5" class="stroke-black group-hover:stroke-white"></circle>
    <path d="M46 26.6667C46 26.5834 45.9583 26.5 45.9167 26.4167C45.9167 26.375 45.875 26.375 45.875 26.3334C45.7917 26.2084 45.6667 26.0834 45.5 26.0417H45.4583C45.3333 26 45.25 26 45.1667 26H32.6667C32.2084 26 31.8334 26.375 31.8334 26.8333C31.8334 27.2916 32.2084 27.6666 32.6667 27.6666H43.1667L26.25 44.5833C25.9167 44.9166 25.9167 45.4166 26.25 45.75C26.4167 45.9167 26.625 46 26.8332 46C27.0415 46 27.25 45.9167 27.4165 45.75L44.3333 28.8333V39.3332C44.3333 39.7915 44.7083 40.1665 45.1665 40.1665C45.6248 40.1665 45.9998 39.7915 45.9998 39.3332L46 26.8333V26.6667L46 26.6667Z" fill="currentColor"></path>
</svg>

                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="group-hover:scale-[1.05] ease-default transition-all duration-[0.3s] will-change-transform">









  <picture class="h-full max-h-[245px] md:max-h-none w-full md:max-w-[358px] object-cover" data-iesrc="https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=100" data-alt="Rectangle 5423">

          <source srcset="
    https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=auto&amp;h=auto&amp;dpr=0.8 1x
  ,
    https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=auto&amp;h=auto&amp;dpr=2 2x
  ">

          <img src="https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=100" alt="Rectangle 5423" class="h-full max-h-[245px] md:max-h-none w-full md:max-w-[358px] object-cover" loading="lazy" width="716" height="1000" style="background-position: 50% 50%; object-position: 50% 50%">
      </picture>

                    </div>
                </div>
                            <div @click="expanded = !expanded" :aria-expanded="expanded" x-data="{
                        id: 2,
                        get expanded() {
                            if (window.innerWidth > 768) {
                                return this.active === this.id
                            } else {
                                return this.active === 2
                            }
                        },
                        set expanded(value) {
                            if (window.innerWidth > 768) {
                                this.active = value ? this.id : this.id
                            }
                        }
                    }" role="region" class="relative bg-white rounded-br-[40px] md:rounded-br-[56px] transition-width duration-[0.3s] ease-default flex flex-col-reverse md:flex-row justify-end overflow-hidden group md:w-[167px] cursor-pointer after:bg-white/[0.0] after:duration-[0.3s] after:ease-default hover:after:bg-white/[0.08] after:absolute after:inset-0 after:h-full" :class="{
                       'md:w-[739px]' : expanded,
                       'md:w-[167px] cursor-pointer after:bg-white/[0.0] after:duration-[0.3s] after:ease-default hover:after:bg-white/[0.08] after:absolute after:inset-0 after:h-full' : !expanded
                    }" aria-expanded="false">
                    <div x-transition:enter.duration.1000ms="" x-transition:leave.duration.0ms="" data-reveal="" class="flex flex-col text-black p-[24px] md:p-[45px] md:w-[358px] md:absolute h-full md:left-0 s--revealed">
                        <h3 class="h3 reveal--in delay--2 !text-black"><strong>Baseline Rewards: </strong><br>Connect your Car</h3>
                        <div class="richtext mt-[16px] flex-auto"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div>
                        <div class="flex w-full items-center mb-0 mt-[36px]">
                            <a href="https://dimo.test/about" class="w-full flex justify-between items-center transition-[color] duration-[0.3s] delay-[0s]">
                                Connect your car
                                <span>
                                    <svg class="fill-white rounded-full transition-all duration-[0.3s] delay-[0] ease-in-out group-hover:text-white group-hover:stroke-white group-hover:fill-purple group-hover:rotate-45 w-[48px] h-[48px] md:w-[72px] md:h-[72px]" width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="36" r="35.5" class="stroke-black group-hover:stroke-white"></circle>
    <path d="M46 26.6667C46 26.5834 45.9583 26.5 45.9167 26.4167C45.9167 26.375 45.875 26.375 45.875 26.3334C45.7917 26.2084 45.6667 26.0834 45.5 26.0417H45.4583C45.3333 26 45.25 26 45.1667 26H32.6667C32.2084 26 31.8334 26.375 31.8334 26.8333C31.8334 27.2916 32.2084 27.6666 32.6667 27.6666H43.1667L26.25 44.5833C25.9167 44.9166 25.9167 45.4166 26.25 45.75C26.4167 45.9167 26.625 46 26.8332 46C27.0415 46 27.25 45.9167 27.4165 45.75L44.3333 28.8333V39.3332C44.3333 39.7915 44.7083 40.1665 45.1665 40.1665C45.6248 40.1665 45.9998 39.7915 45.9998 39.3332L46 26.8333V26.6667L46 26.6667Z" fill="currentColor"></path>
</svg>

                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="group-hover:scale-[1.05] ease-default transition-all duration-[0.3s] will-change-transform">









  <picture class="h-full max-h-[245px] md:max-h-none w-full md:max-w-[358px] object-cover" data-iesrc="https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=100" data-alt="Rectangle 5423">

          <source srcset="
    https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=auto&amp;h=auto&amp;dpr=0.8 1x
  ,
    https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=auto&amp;h=auto&amp;dpr=2 2x
  ">

          <img src="https://dimo.imgix.net/dimo/Rectangle-5423_2022-12-07-115202_kmad.png?auto=compress,format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=0.5&amp;fp-y=0.5&amp;q=80&amp;w=100" alt="Rectangle 5423" class="h-full max-h-[245px] md:max-h-none w-full md:max-w-[358px] object-cover" loading="lazy" width="716" height="1000" style="background-position: 50% 50%; object-position: 50% 50%">
      </picture>

                    </div>
                </div>
                    </div>
    </div>
```