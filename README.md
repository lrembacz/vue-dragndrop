# Drag and drop Components for VueJS 2+

Drag and drop components provides simple API to handle drag and drop functionality for VueJS applications.

Those components are implementing [@dragndrop](https://github.com/lrembacz/dragndrop) components.

Drag and drop components are written in Typescript and there are declarations available.

> NOTE: Drag and drop components are a work in progress. There are possible some breaking changes. So use them with caution.

## Important links

- [Demos](https://dragndrop.lukaszrembacz.pl/examples/)
- [All Components](packages/)
- [Changelog](./CHANGELOG.md)

## Quick start

### Using NPM

Install draggable node module to your project.

```
npm install @dragndrop/vue-dragndrop
```

## Usage

### Plugin registration

```javascript
import Vue from 'vue';
import VueDragAndDrop from '@dragndrop/vue-dragndrop';
Vue.use(VueDragAndDrop);
```

### Local registration

```javascript
import {Draggable, Dropzone} from '@dragndrop/vue-dragndrop';

Vue.component('Draggable', Draggable);
Vue.component('Dropzone', Dropzone);

```