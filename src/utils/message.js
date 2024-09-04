import { ElMessage } from "element-plus";

const message = (message, params) => {
  if (!params) {
    return ElMessage({
      message,
      customClass: "pure-message",
    });
  } else {
    const {
      icon,
      type = "info",
      dangerouslyUseHTMLString = false,
      customClass = "antd",
      duration = 2000,
      showClose = false,
      center = false,
      offset = 20,
      appendTo = document.body,
      grouping = false,
      onClose,
    } = params;

    return ElMessage({
      message,
      type,
      icon,
      dangerouslyUseHTMLString,
      duration,
      showClose,
      center,
      offset,
      appendTo,
      grouping,
      customClass: customClass === "antd" ? "pure-message" : "",
      onClose: () => (typeof onClose == 'function' ? onClose() : null),
    });
  }
};

const closeAllMessage = () => ElMessage.closeAll();

export { message, closeAllMessage };
