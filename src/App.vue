<template>
  <div id="app">
    <div class="container">
      <Item
        v-for="(item, index) in items"
        :key="index"
        :data="{id: item.id}"
        @onDrop="(e) => onDrop(item.id, e)"
        :avatar="avatar"
      >
        <div class="sortable">{{item.name}}</div>
      </Item>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Item from './Item.vue';
import Dropzone from '../packages/dropzone/src/Dropzone.vue';
import {Avatar} from '@dragndrop/draggable/avatar';

@Component({
  components: {
      Item,
      Dropzone,
  },
})
export default class App extends Vue {
    avatar: Avatar = Avatar.clone();

    items = [
      {
        id: 1,
        name: 'test',
      },
      {
        id: 2,
        name: 'test2',
      },
      {
        id: 3,
        name: 'test3',
      },
    ];

  onDrop(id, e) {
    const droppedId = id;
    const sourceId = e.dragInfo.data.id;
    const items = [...this.items];
    const droppedIndex = items.findIndex(item => item.id === droppedId);
    const sourceIndex = items.findIndex(item => item.id === sourceId);
    const b = items[sourceIndex];
    items[sourceIndex] = items[droppedIndex];
    items[droppedIndex] = b;
    this.items = [...items];
  }

}
</script>

<style>
html,
body {
  height: 100%;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.428571429;
  color: #333;
  background-color: #fff;
  margin: 0;
}

.container {
  max-width: 400px;
  padding: 15px 15px 0 15px;
}

.sortable {
  margin-top: 15px;
  width: 240px;
  height: 120px;
  background: #cddc39;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  cursor: grab;
  cursor: -webkit-grab;
}

.sortable p {
  text-align: center;
  padding-top: 30px;
  margin: 0;
  font-weight: bold;
}

.draggable--dragging {
  opacity: 0.5;
}

.draggable--dragging,
.draggable--occurring {
  cursor: default;
  cursor: grabbing;
  cursor: -webkit-grabbing;
}

.dragging--invalid {
  cursor: no-drop !important;
  border-width: medium;
  border-color: #ff0000;
  border-style: solid;
}

.dragging--over {
  border-width: medium;
  border-color: #cddc39;
  border-style: dashed;
  background-color: white;
  opacity: 1;
}

.dragging--over * {
  display: none;
}
</style>
