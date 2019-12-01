# Drag`n drop Vue

Dragndrop is main package for @dragndrop/dragndrop-vue. It wraps all of elements inside and gives them in one place.

## Examples

- [Demos](https://dragndrop.lukaszrembacz.pl/examples/)


## Installation

```
npm install @dragndrop/vue-dragndrop
```

## Usage

```javascript
import Vue from 'vue';
import VueDragAndDrop from '@dragndrop/vue-dragndrop';
Vue.use(VueDragAndDrop);
// OR
import {Draggable, Dropzone} from '@dragndrop/vue-dragndrop';

Vue.component('Draggable', Draggable);
Vue.component('Dropzone', Dropzone);

```

Check all components [here](https://github.com/lrembacz/dragndrop/tree/master/packages).