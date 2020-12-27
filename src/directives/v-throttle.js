import Vue from "vue";

(function() {
    const throttle = function throttle(func, wait) {
        if (typeof func !== "function") throw new TypeError("func must be a function!");
        wait = +wait;
        if (isNaN(wait)) wait = 300;
        let timer = null,
            cd = true,
            result;
        return function proxy(...params) {
            if (!cd) return;
            const _this = this;
            result = func.apply(_this, params);
            cd = false;
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                cd = true;
            }, wait);
            return result;
        };
    };

    const debounce = function debounce(func, wait, immediate) {
        if (typeof func !== "function") throw new TypeError("func must be a function!");
        if (typeof wait === "undefined") {
            wait = 500;
            immediate = false;
        }
        if (typeof wait === "boolean") {
            immediate = wait;
            wait = 500;
        }
        if (typeof immediate === "undefined") {
            immediate = false;
        }
        if (typeof wait !== "number") throw new TypeError("wait must be a number!");
        if (typeof immediate !== "boolean") throw new TypeError("immediate must be a boolean!");
        let timer = null,
            result;
        return function proxy(...params) {
            let _this = this,
                callNow = !timer && immediate;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                if (!immediate) result = func.apply(_this, params);
            }, wait);
            if (callNow) result = func.apply(_this, params);
            return result;
        };
    };

    // 自定义指令
    const config = {
        bind(el, binding) {
            let val = binding.value,
                wait = 500,
                immediate = false,
                type = "click",
                params = [],
                func,
                handle = binding.name === "debounce" ? debounce : throttle;
            // 默认处理
            if (val == null) return;
            if (typeof val !== "object" && typeof val !== "function") return;
            if (binding.arg) wait = +binding.arg;
            // 添加修饰符，控制是否立即执行
            console.log(binding.modifiers);
            if (binding.modifiers && binding.modifiers.immediate) immediate = true;
            if (typeof val === "function") func = val;
            if (typeof val === "object") {
                func = val.func || function() {};
                type = val.type || "click";
                params = val.params || [];
            }
            el.$type = type;
            el.$handle = handle(
                function proxy(...args) {
                    return func.call(this, ...params.concat(args));
                },
                wait,
                immediate
            );
            el.addEventListener(el.$type, el.$handle);
        },
        unbind(el) {
            el.removeEventListener(el.$type, el.$handle);
        },
    };

    Vue.directive("debounce", config);
    Vue.directive("throttle", config);
})();
