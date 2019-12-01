import _Vue from 'vue';
import {VueDraggable} from '@dragndrop/vue-draggable'
import {VueDropzone} from '@dragndrop/vue-dropzone'

declare global {
    interface Window {
        Vue: typeof _Vue;
    }
}

const install = (Vue: typeof _Vue): void => {
    Vue.component('VueDraggable', VueDraggable);
    Vue.component('VueDropzone', VueDropzone);
};

export default install;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install);
}

export {
    VueDraggable,
    VueDropzone,
};
