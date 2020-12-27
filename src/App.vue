<template>
    <div id="app">
        <section>
            <button
                v-throttle:1000="{
                    func: fn,
                    params: [10, 20],
                }"
            >
                节流测试
            </button>
            <button
                v-debounce:1000="{
                    func: fn,
                    params: [10, 20],
                }"
            >
                防抖测试
            </button>
            <button
                v-debounce:1000.immediate="{
                    func: fn,
                    params: [10, 20],
                }"
            >
                多次点击只执行第一次
            </button>
        </section>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},

    methods: {
        fn(...args) {
            console.log("ok", args);
        },
    },
};
</script>

<style></style>
