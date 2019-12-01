import _Vue from 'vue';
import VueDraggable from './Draggable.vue';

declare global {
    interface Window {
        Vue: typeof _Vue;
    }
}

const install = (Vue: typeof _Vue): void => {
    Vue.component('VueDraggable', VueDraggable);
};

export default install;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install);
}

export {
    VueDraggable,
};
