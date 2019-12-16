<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import {applyPassive} from '@material/dom/events';
    import {DraggableFoundation} from '@dragndrop/draggable/foundation';
    import {Acceptor} from '@dragndrop/dropzone/acceptor';
    import {DropzoneFoundation} from '@dragndrop/dropzone/foundation';
    import {DropzoneAdapter} from '@dragndrop/dropzone/adapter';
    import '@dragndrop/dropzone/types';
    import '@dragndrop/draggable/utils/mouse-event.js';

    @Component
    export default class Dropzone extends Vue {
        private handleDragEnter_: any; // assigned in initialSyncWithDOM()
        private handleDragOver_: any; // assigned in initialSyncWithDOM()
        private handleDragLeave_: any; // assigned in initialSyncWithDOM()
        private handleDrop_: any; // assigned in initialSyncWithDOM()

        foundation_: DropzoneFoundation;
        root_: Element = null;

        @Prop({
            default: null,
        }) public acceptor: Acceptor | null;
        @Prop({
            default: false,
        }) public exact: boolean;
        @Prop({
            default: DropzoneFoundation.cssClasses.INVALID_CLASS,
        }) public invalidClass: string;
        @Prop({
            default: DropzoneFoundation.cssClasses.OVER_CLASS,
        }) public overClass: string;
        @Prop({
            default: false,
        }) public allowOnChild: boolean;

        @Watch('acceptor')
        onAcceptorChanged(acceptor) {
            this.foundation_.acceptor = acceptor;
        }

        @Watch('exact')
        onExactChanged(exact) {
            this.foundation_.exact = exact;
        }

        @Watch('overClass')
        onOverClassChanged(overClass) {
            this.foundation_.overClass = overClass;
        }

        @Watch('invalidClass')
        onInvalidClassChanged(invalidClass) {
            this.foundation_.invalidClass = invalidClass;
        }

        @Watch('allowOnChild')
        onAllowOnChildChanged(allowOnChild) {
            this.foundation_.allowOnChild = allowOnChild;
        }

        initAttributes() {
            this.foundation_.acceptor = this.acceptor;
            this.foundation_.exact = this.exact;
            this.foundation_.overClass = this.overClass;
            this.foundation_.invalidClass = this.invalidClass;
            this.foundation_.allowOnChild = this.allowOnChild;
        }

        mounted() {
            this.root_ = this.$el;
            this.$el.__dropzone__ = this;
            this.foundation_ = this.getDefaultFoundation();
            this.initAttributes();
            this.initialSyncWithDOM();
        }

        handleDragEnterEvent_(evt: Event) {
            this.foundation_.handleDragEnter(evt);
        }

        handleDragOverEvent_(evt: Event) {
            this.foundation_.handleDragOver(evt);

        }

        handleDragLeaveEvent_(evt: Event) {
            this.foundation_.handleDragLeave(evt);

        }

        handleDropEvent_(evt: Event) {
            this.foundation_.handleDrop(evt);
        }

        initialSyncWithDOM() {
            this.handleDragEnter_ = this.handleDragEnterEvent_.bind(this);
            this.handleDragOver_ = this.handleDragOverEvent_.bind(this);
            this.handleDragLeave_ = this.handleDragLeaveEvent_.bind(this);
            this.handleDrop_ = this.handleDropEvent_.bind(this);

            this.listen(DraggableFoundation.strings.CUSTOM_DRAG_ENTER, this.handleDragEnter_);
            this.listen(DraggableFoundation.strings.CUSTOM_DRAG_OVER, this.handleDragOver_);
            this.listen(DraggableFoundation.strings.CUSTOM_DRAG_LEAVE, this.handleDragLeave_);
            this.listen(DraggableFoundation.strings.CUSTOM_DROP, this.handleDrop_);
        }

        getDefaultFoundation() {
            const adapter: DropzoneAdapter = {
                hasClass: (className) => this.root_.classList.contains(className),
                addClass: (className) => this.root_.classList.add(className),
                removeClass: (className) => this.root_.classList.remove(className),
                notifyAction: (eventType: string, detail?: any) => this.emit(eventType, detail),
                deregisterDocumentInteractionHandler: (evtType: any, handler: any, passive?: boolean) =>
                    document.documentElement.removeEventListener(evtType, handler, passive ? passive : applyPassive()),
                registerDocumentInteractionHandler: (evtType: any, handler: any, passive?: boolean) =>
                    document.documentElement.addEventListener(evtType, handler, passive ? passive : applyPassive()),
                deregisterInteractionHandler: (evtType: any, handler: any) =>
                    this.unlisten(evtType, handler),
                registerInteractionHandler: (evtType: any, handler: any) =>
                    this.listen(evtType, handler),
                getRootElement: () => this.root_,
            };
            return new DropzoneFoundation(adapter);
        }

        render() {
            return (this.$slots !== undefined) ? this.$slots.default.length > 0 ? this.$slots.default[0] : null : null;
        }

        public listen(eventType: string, handler: any){
            this.$el.addEventListener(eventType, handler);
        }

        public unlisten(eventType: string, handler: any){
            this.$el.removeEventListener(eventType, handler);
        }

        public emit(eventType: string, detail: any) {
            this.$emit(eventType, detail);
        }

        beforeDestroy(): void {
            this.unlisten(DraggableFoundation.strings.CUSTOM_DRAG_ENTER, this.handleDragEnter_);
            this.unlisten(DraggableFoundation.strings.CUSTOM_DRAG_OVER, this.handleDragOver_);
            this.unlisten(DraggableFoundation.strings.CUSTOM_DRAG_LEAVE, this.handleDragLeave_);
            this.unlisten(DraggableFoundation.strings.CUSTOM_DROP, this.handleDrop_);
        }
    }
</script>