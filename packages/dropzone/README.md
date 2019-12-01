# Dropzone

Draggable component for VueJS 2+ which implements [@dragndrop/dropzone](https://github.com/lrembacz/dragndrop/tree/master/packages/dropzone) component. 

## Design & API Documentation

- [Demos](https://dragndrop.lukaszrembacz.pl/examples/)

## Installation

```
npm install @dragndrop/vue-dropzone
```

## Usage

Dropzone element can be used in common with Draggable element to create variety of drag and drop powered components for websites.

### Typescript support

Component has its declarations (*.d.ts) for Typescript available.

### Registration

```javascript
import {Dropzone} from '@dragndrop/vue-dropzone';

Vue.component('Dropzone', Dropzone);
```

### Registration as plugin

```javascript
import Vue from 'vue';
import VueDropzone from '@dragndrop/vue-dropzone';

Vue.use(VueDropzone);
```

### Simple example

```vue
<template>
    <Dropzone 
        :acceptor="acceptor"
        @onDrop="onDrop"
    >
        <div>Dropzone for draggable element</div>
    </Dropzone>
</template>
<script>
    export default {
        data() {
            return {
                acceptor: new DraggablesAcceptor(draggable),
            }
        },
        methods: {
            onDrop(event) {
                console.log(event.dragInfo.data); // 'example data'
            }
        }
    }
</script>
```

### CSS Classes (they can be changed)

CSS Class | Description
--- | ---
`dragging--over` | Sets this class to element when draggable element is draggedOver the dropzone
`dragging--invalid` | Sets this class to element when draggable element is not accepted by dropzone

### Events

Events | Type | Data | Description
--- | --- | --- | ---
`onDragEnter` | CustomEvent | {originalEvent, dragInfo, dropzoneElement} | Event dispatched when `Draggable` enters on `Dropzone`
`onDragLeave` | CustomEvent | {originalEvent, dragInfo, dropzoneElement} | Event dispatched when `Draggable` leaves on `Dropzone`
`onDragOver` | CustomEvent | {originalEvent, dragInfo, dropzoneElement} | Event dispatched when `Draggable` is over on `Dropzone`
`onDrop` | CustomEvent | {originalEvent, dragInfo, dropzoneElement} | Event dispatched when `Draggable` is dropped on `Dropzone`

### Props

Property | Value Type | Description
--- | --- | ---
`acceptor` | Acceptor | Data which is attached to draggable
`exact` | boolean | Events from Draggable are stopped with stopPropagation() when exact is true.
`overClass` | String | Class which is set on element when draggingOver (`dragging--over` default)
`invalidClass` | String | Class which is set on element when draggingOver not accepted element (`dragging--invalid` default)

Method Signature | Description
--- | ---
`destroy() => void` | Clean up method. Is called on beforeDestroy hook.

### `Acceptor`

Acceptor allows to provide instructions to dropzone which elements should be accepted and which should not.

When Element is not accepted it can`t be dropped on Dropzone.

```javascript
abstract accepts<D>(dragInfo: DragInfo<D>, dropzoneElement: Element, event: Event): boolean;
```

Acceptor is abstract class with accepts method which should be implemented.

Argument | Type | Description
--- | --- | ---
`dragInfo` | DragInfo<D> | Info from `Draggable` which is snapped when dragging
`dropzoneElement` | Element | Dropzone element on which element is dragged
`event` | CustomEvent | Custom Event dispatched `_customDragEnter`, `_customDragLeave`, `_customDragOver` and `_customDrop`

Default there is only `DraggablesAcceptor` implemented which is accepting given `Draggables`.

If you need you can write your own `Acceptor` for example QuerySelectorAcceptor to accept elements with given querySelectors.

Or DataTransferAcceptor which accepts elements with specific data attached to draggable.
