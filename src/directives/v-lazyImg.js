import Vue from "vue";
(function() {
    const ob_config = {
        threshold: [0.5],
    };
    // 使用新的方案，IntersectionObserver
    const ob = new IntersectionObserver(entries => {
        entries.forEach(item => {
            let { target, isIntersecting } = item;
            if (!isIntersecting) return;
            let imgBox = target.querySelector("img");
            if (!imgBox) return;
            imgBox.src = target.$src;
            imgBox.style.opacity = 1;
            ob.unobserve(target);
        });
    }, ob_config);

    Vue.directive("lazyImg", {
        inserted(el, binding) {
            let imgBox = el.querySelector("img");
            if (!imgBox) return;
            imgBox.src = "";
            imgBox.style.opacity = 0;
            imgBox.style.transition = "opacity .3s";
            el.$src = binding.value;
            ob.observe(el);
        },
    });
})();
