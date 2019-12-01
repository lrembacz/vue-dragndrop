<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import {DraggableFoundation} from '@dragndrop/draggable/foundation';
    import {DraggableAdapter} from '@dragndrop/draggable/adapter';
    import {applyPassive} from '@material/dom/events';
    import {DragInfo} from '@dragndrop/draggable/drag-info';
    import {Avatar} from '@dragndrop/draggable/avatar';
    import {Axis, CustomScroll, DraggableInterface} from '@dragndrop/draggable/types';

    let _currentVueDrag: DragInfo<any> | null;

    @Component
    export default class Draggable<D = any> extends Vue implements DraggableInterface {
        foundation_: DraggableFoundation<D>;
        root_: Element = null;
        _id: number = null;

        @Prop({
            default: null,
        }) public data: D | null;
        @Prop({
            default: true,
        }) public draggable: boolean;
        @Prop({
            default: null,
        }) public avatar: Avatar;
        @Prop({
            default: 'both',
        }) public axis: Axis;
        @Prop({
            default: null,
        }) public handle: string | null;
        @Prop({
            default: DraggableFoundation.strings.CANCEL_STRING,
        }) public cancel: string;
        @Prop({
            default: DraggableFoundation.cssClasses.DRAGGING_CLASS,
        }) public draggingClass: string;
        @Prop({
            default: DraggableFoundation.cssClasses.DRAGGING_BODY_CLASS,
        }) public draggingClassBody: string;
        @Prop({
            default: DraggableFoundation.numbers.MIN_DRAG_START_DISTANCE,
        }) public minDragStartDistance: number;
        @Prop({
            default: null,
        }) public touchAction: string | null;
        @Prop({
            default: true,
        }) public customScroll: CustomScroll;

        @Watch('data')
        onDataChanged(data) {
            this.foundation_.data = data;
        }

        @Watch('draggable')
        onDraggableChanged(draggable) {
            this.foundation_.draggable = draggable;
        }

        @Watch('axis')
        onAxisChanged(axis) {
            this.foundation_.axis = axis;
        }

        @Watch('handle')
        onHandleChanged(handle) {
            this.foundation_.handle = handle;
        }

        @Watch('cancel')
        onCancelChanged(cancel) {
            this.foundation_.cancel = cancel;
        }

        @Watch('minDragStartDistance')
        onMinDragStartDistanceChanged(minDragStartDistance) {
            this.foundation_.minDragStartDistance = minDragStartDistance;
        }

        @Watch('avatar')
        onAvatarChanged(avatar) {
            this.foundation_.avatar = avatar;
        }

        @Watch('draggingClass')
        onDraggingClassChanged(draggingClass) {
            this.foundation_.draggingClass = draggingClass;
        }

        @Watch('draggingClassBody')
        onDraggingClassBodyChanged(draggingClassBody) {
            this.foundation_.draggingClassBody = draggingClassBody;
        }

        @Watch('touchAction')
        onTouchActionChanged(touchAction) {
            this.foundation_.touchAction = touchAction;
        }

        @Watch('customScroll')
        onCustomScrollChanged(customScroll) {
            this.foundation_.customScroll = customScroll;
        }

        initAttributes() {
            this._id = this.foundation_.id;
            this.foundation_.data = this.data;
            this.foundation_.draggable = this.draggable;
            this.foundation_.axis = this.axis;
            this.foundation_.handle = this.handle;
            this.foundation_.cancel = this.cancel;
            this.foundation_.minDragStartDistance = this.minDragStartDistance;
            this.foundation_.avatar = this.avatar;
            this.foundation_.draggingClass = this.draggingClass;
            this.foundation_.draggingClassBody = this.draggingClassBody;
            this.foundation_.touchAction = this.touchAction;
            this.foundation_.customScroll = this.customScroll;
        }

        mounted() {
            this.root_ = this.$el;
            this.$el.__draggable__ = this;
            this.foundation_ = this.getDefaultFoundation();
            this.foundation_.init();
            this.initAttributes();
            this.initialSyncWithDOM();
        }

        initialSyncWithDOM() {
            this.foundation_.initEventManagers();
        }

        getDefaultFoundation() {
            const adapter: DraggableAdapter<D> = {
                hasClass: (className) => this.root_.classList.contains(className),
                addClass: (className) => this.root_.classList.add(className),
                removeClass: (className) => this.root_.classList.remove(className),
                addDocumentClass: (className) => document.documentElement.classList.add(className),
                removeDocumentClass: (className) => document.documentElement.classList.remove(className),
                notifyAction: (eventType: string, detail?: any) => this.emit(eventType, detail),
                notifyTarget: (eventTarget: EventTarget, eventName: string, data: any, options?: any) => {
                    const event = new MouseEvent(eventName, options);
                    (event as any).data = data;
                    if (eventTarget.hasOwnProperty('__dropzone__')) {
                        (eventTarget as any).__dropzone__.$emit(eventName, event);
                    }
                },
                scroll: (left: number, top: number, behavior: "auto" | "smooth") => window.scroll({left: left, top: top, behavior: 'smooth'}),
                deregisterDocumentInteractionHandler: (evtType: any, handler: any, passive?: boolean) =>
                    document.documentElement.removeEventListener(evtType, handler, passive !== undefined ? passive : applyPassive()),
                registerDocumentInteractionHandler: (evtType: any, handler: any, passive?: boolean) =>
                    document.documentElement.addEventListener(evtType, handler, passive !== undefined ? passive : applyPassive()),
                deregisterInteractionHandler: (evtType: any, handler: any, options?: AddEventListenerOptions|boolean) =>
                    this.unlisten(evtType, handler, options),
                registerInteractionHandler: (evtType: any, handler: any, options?: AddEventListenerOptions|boolean) =>
                    this.listen(evtType, handler, options),
                setStyle: (property: string, value: any) =>
                    (this.root_ as HTMLElement).style.setProperty(property, value),
                getCurrentDrag: () => _currentVueDrag,
                setCurrentDrag: (currentDrag: DragInfo<D> | null) => _currentVueDrag = currentDrag,
                getRootElement: () => this.root_
            };
            return new DraggableFoundation<D>(adapter);
        }

        public listen(eventType: string, handler: any, options?: any){
            this.root_.addEventListener(eventType, handler);
        }

        public unlisten(eventType: string, handler: any, options?: any){
            this.root_.removeEventListener(eventType, handler);
        }

        public emit(eventType: string, detail: any) {
            this.$emit(eventType, detail);
        }

        render() {
            return (this.$slots !== undefined) ? this.$slots.default[0] : null;
        }

        abort(): void {
            this.foundation_.abort();
        }

        beforeDestroy(): void {
            this.foundation_.destroy();
        }
    }
</script>