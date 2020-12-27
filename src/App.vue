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

        <section class="lazyImg">
            <h2>图片懒加载</h2>
            <div v-lazyImg="url">
                <img src="" />
            </div>

            <h3>多张图片</h3>
            <div class="imgs">
                <div class="img" v-for="img of imgs" :key="img.id" v-lazyImg="img.url">
                    <img src="" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {
            url: require("./assets/1.png"),
            imgs: [
                {
                    id: 1,
                    url: require("./assets/1.png"),
                },
                {
                    id: 2,
                    url: require("./assets/1.png"),
                },
                {
                    id: 3,
                    url: require("./assets/1.png"),
                },
                {
                    id: 4,
                    url: require("./assets/1.png"),
                },
                {
                    id: 5,
                    url: require("./assets/1.png"),
                },
                {
                    id: 6,
                    url: require("./assets/1.png"),
                },
            ],
        };
    },

    methods: {
        fn(...args) {
            console.log("ok", args);
        },
    },
};
</script>

<style>
.lazyImg {
    padding-top: 1000px;
}
img {
    width: 400px;
    height: 250px;
}
.imgs {
    height: 600px;
    width: 810px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
}
</style>
