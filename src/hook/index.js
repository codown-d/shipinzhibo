import { ref, onMounted, onBeforeUnmount, watch } from "vue";

export function useResizeObserver(targetElement) {
  const width = ref(0);
  const height = ref(0);
  let resizeObserver = null;
  console.log(targetElement);
  const updateSize = (entries) => {
    for (let entry of entries) {
      width.value = entry.contentRect.width;
      height.value = entry.contentRect.height;
    }
  };

  onMounted(() => {
    watch(
      targetElement,
      (newElement) => {
        console.log(targetElement);
        if (newElement) {
          resizeObserver = new ResizeObserver(updateSize);
          resizeObserver.observe(newElement);
        }
      },
      { immediate: true }
    );
  });
  onBeforeUnmount(() => {
    if (resizeObserver && targetElement.value) {
      resizeObserver.unobserve(targetElement.value);
    }
  });

  return { width, height };
}
