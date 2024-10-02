// mock/user.ts
import Mock from "mockjs";
export default [
  {
    url: "/mock/send/msg", // API 路径
    method: "post", // 请求方法
    response: () => {
      return {
        code: 200,
        data: {
          name: "John Doe",
          age: 30,
        },
      };
    },
  },
  {
    url: "/mock/chat/info-list", // API 路径
    method: "get", // 请求方法
    response: () => {
      return {
        code: 200,
        data: {
          name: "John Doe",
          age: 30,
        },
      };
    },
  },
  {
    url: "/mock/hot-topic", // API 路径
    method: "get", // 请求方法
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          "list|5": [
            {
              "title|1": [
                "英雄联盟S14",
                "大佬们帮我看看",
                "荒野乱斗",
                "永劫无间精选内容",
                "峡谷暖冬修炼日记，晒上分截图赢福利！",
              ],
              "num|1-100.1-2": 1,
              href: Mock.mock("@url"),
              "id|+1": 1,
            },
          ],
        }),
      };
    },
  },
  {
    url: "/mock/popular-anchor", // API 路径
    method: "get", // 请求方法
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          "list|6": [
            {
              href:Mock.mock('@url'),
              "name": Mock.mock('@first'),
              "avatar|1": [
                "https://apic.douyucdn.cn/upload/avatar_v3/201807/33a25e07da3e8ac9cc55ab08c41945d0_big.jpg",
                "https://apic.douyucdn.cn/upload/avatar_v3/201908/f2b54d0e48b649fd821574e5a72a09c0_big.jpg",
                "https://apic.douyucdn.cn/upload/avatar_v3/202008/3339795b4dca41779d6c63bfef5452ba_big.jpg",
                "https://apic.douyucdn.cn/upload/avatar_v3/201807/24d8e7a12f0c392b0ac317b70e12ff67_big.jpg",
                "https://apic.douyucdn.cn/upload/avatar_v3/202011/95af468d43534b6887f289f887df6172_big.jpg",
                "https://apic.douyucdn.cn/upload/avanew/face/201711/26/11/bb6ed7f8a401885a95025ef5240f1f32_big.jpg",
                "https://apic.douyucdn.cn/upload/avatar_v3/201901/91be229aaec14b80a4855225885f8ff6_big.jpg",
                "https://apic.douyucdn.cn/upload/avatar_v3/202402/a2b3882fc3f3499fbe4974632292c50c_big.jpg",
                "https://apic.douyucdn.cn/upload/avatar_v3/202006/c097f3595657460f9e9d08f1ef4f1b35_big.jpg",
              ],
              "id|+1": 1,
            },
          ],
        }),
      };
    },
  },
];
