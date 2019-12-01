<template>
    <Draggable :data="data" :avatar="avatar">
        <Dropzone  @onDrop="$emit('onDrop', $event)">
            <slot></slot>
        </Dropzone>
    </Draggable>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Draggable from '../packages/draggable/src/Draggable.vue';
    import Dropzone from '../packages/dropzone/src/Dropzone.vue';

    @Component({
        components: {
            Draggable,
            Dropzone,
        },
    })
    export default class Item extends Vue {
        @Prop() avatar;
        @Prop() data;
    }
</script>