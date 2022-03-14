<template>
    <div class="comparison">
        <div>
            <slot name="compare-01">Fallback Title</slot>
        </div>
        <div>
            <slot name="compare-02">Fallback Content</slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .comparison {
        margin-block: var(--space-m);
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-s);
        & > div {
            padding: var(--space-xs);
            background-color: #fbdbc1;
            &:first-child {
                background-color: #e7f3f5;
            }
            & span {
                display: block;
                margin-bottom: var(--space-s);
            }
            & > span:first-child {
                font-family: var(--display);
            }
        }
    }
</style>