import _Vue from 'vue';
import VueDropzone from './Dropzone.vue';

declare global {
    interface Window {
        Vue: typeof _Vue;
    }
}

const install = (Vue: typeof _Vue): void => {
    Vue.component('VueDropzone', VueDropzone);
};

export default install;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install);
}

export {
    VueDropzone,
};
