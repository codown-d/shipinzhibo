import dayjs from 'dayjs';

export const formatTime = (time=0,format='YYYY年MM月DD日 HH:mm:ss') => {
    return dayjs(time).format(format)
};
export const useStorage = {
  // 获取数据
  get(key) {
      return localStorage.getItem(key);
  },

  // 设置或修改数据
  set(key, value) {
      localStorage.setItem(key, value);
  },

  // 删除数据
  remove(key) {
      localStorage.removeItem(key);
  },

  // 清空所有数据
  clear() {
      localStorage.clear();
  }
};
