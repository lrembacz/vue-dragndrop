# Draggable

Draggable component for VueJS 2+ which implements [@dragndrop/draggable](https://github.com/lrembacz/dragndrop/tree/master/packages/draggable) component. 

## Design & API Documentation

- [Demos](https://dragndrop.lukaszrembacz.pl/examples/)

## Installation

```
npm install @dragndrop/vue-draggable
```

## Usage

Draggable element can be used for different functionalities - from moving elements around to make sortable list or draggable grid elements.

### Typescript support

Component has its declarations (*.d.ts) for Typescript available.

### Registration

```javascript
import {Draggable} from '@dragndrop/vue-draggable';

Vue.component('Draggable', Draggable);
```

### Registration as plugin

```javascript
import Vue from 'vue';
import VueDraggable from '@dragndrop/vue-draggable';

Vue.use(VueDraggable);
```

### Simple example

```vue
<template>
    <VueDraggable 
        :data="dataTransfer"
        :avatar="avatar"
        @onDrag="onDrag"
    >
        <div>Example element</div>
    </VueDraggable>
</template>
<script>
    export default {
        data() {
            return {
                dataTransfer: 'example data',
                avatar: new Avatar.clone(),
            }
        },
        methods: {
            onDrag(event) {
                console.log(event.dragInfo.data); // 'example data'
            }
        }
    }
</script>
```

### CSS Classes (they can be changed)

CSS Class | Description
--- | ---
`draggable--dragging` | Sets this class to element when dragging
`draggable--occurring` | Sets this class to body element when dragging

### Shadow DOM

If you want to use dragndrop in Shadow DOM you need to add `draggable--retarget` attribute to your host element so events will be bubble through Shoadow DOM and recursive `elementFromPoint()` calls will work correctly. 


### Events

Events | Type | Data | Description
--- | --- | --- | ---
`onDragStart` | CustomEvent | {originalEvent, dragInfo, dropzoneElement} | Event dispatched when dragging starts
`onDrag` | CustomEvent | {originalEvent, dragInfo, dropzoneElement} | Event dispatched when dragging
`onDragEnd` | CustomEvent | {originalEvent, dragInfo, dropzoneElement} | Event dispatched when dragging ends

### DragInfo
            
DragInfo | Type | Description
--- | --- | ---
`draggableId` | Number | Id of draggable element
`element` | Element | Draggable element 
`data` | Type Generic | Data attached to draggable with data property
`startPosition` | Point | Start position
`avatar` | Avatar | Avatar attached to draggable with avatar property
`axis` | Axis | Axis which dragging is handled 'horizontal', 'vertical' and 'both'
`position` | Point | Current position of cursor
`shift` | Point | Distance from start position to elements top-left corner

### Props

Property | Value Type | Description
--- | --- | ---
`data` | Generic Type | Data which is attached to draggable
`draggable` | Boolean | Turn on / off draggable functionality
`avatar` | Avatar | Element which is rendered when element is dragging
`axis` | Axis ('both', 'horizontal', 'vertical') | Axis the dragging is available for
`handle` | String | Selector on which dragging is available (children of element are included)
`cancel` | String | Selectors on which draggins is not available (children of element are included)
`draggingClass` | String | Class which is set on element when dragging (`draggable--dragging` default)
`draggingClassBody` | String | Class which is set on body element when dragging (`draggable--occurring` default)
`minDragStartDistance` | number | Min distance to start dragStart state (`4` default)
`touchAction` | String or null | Makes `touch-action` property set on element when drag is started (`undefined` default)
`customScroll` | ((startPosition: Point, currentPosition: Point) => void) or boolean | Allows to specify customScroll behavior with function or when set with `false` prevents from custom scroll which is set by default 

### Methods

Method Signature | Description
--- | ---
`abort() => void` | Aborts current dragging
`destroy() => void` | Clean up method. Is used on beforeDestroy hook.

