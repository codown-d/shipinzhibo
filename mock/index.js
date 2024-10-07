// mock/user.ts
import Mock from "mockjs";
var Random = Mock.Random;
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
              href: Mock.mock("@url"),
              name: Mock.mock("@first"),
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
  {
    url: "/mock/mention", // API 路径
    method: "get", // 请求方法
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          "list|5-20": [
            {
              label: Random.word(),
              value: Random.word(),
            },
          ],
        }),
      };
    },
  },
  {
    url: "/mock/anchor-news", // API 路径
    method: "get", // 请求方法
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          "list|5-20": [
            {
              group: {
                group_id: 2493219,
                group_name: "一条小团团OvO",
              },
              publisher: {
                uid: 126221509,
                hash_id: "qy70JRJZRdXG",
                nickname: "一条小团团OvO",
                avatar:
                  "https://apic.douyucdn.cn/upload/avatar_v3/202212/d4f61c2ee2c1493186c1c47bdc10377e_middle.jpg",
                room_id: 4615502,
              },
              ctime: Random.date() + " " + Random.time(),
              "follow_status|1": [1, 2],
              liked: Random.boolean(),
              comment_count: Random.natural(60, 100),
              like_count: Random.natural(60, 100),
              relay_count: Random.natural(60, 100),
              text: Random.paragraph(),
            },
          ],
        }),
      };
    },
  },
  {
    url: "/mock/reply-anchor-news", // API 路径
    method: "get", // 请求方法
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          list: [
            {
              comment_id: "2459538685080823619",
              created_ts: 1706369587,
              content:
                "在此我做为团团家属的身份来感谢万千猪崽对团团的关心丶愛护丶思念！并代团团祝大家春节快乐！万分感谢！[比心][比心][比心]",
              locality: "湖南",
              uid: 273384266,
              nick_name: "深更半夜来听歌",
              avatar:
                "https://apic.douyucdn.cn/upload/avatar_v3/202110/c5639bf6427a4519805b383720459763_middle.jpg",
              likes: 879,
              is_liked: false,
              comment_replies: 0,
              sub_replies: [],
            },
            {
              comment_id: "2459468936682596246",
              created_ts: 1706361467,
              content: "大王，我们会一直陪着你，一直等你",
              locality: "重庆",
              uid: 191864928,
              nick_name: "昔恩小姐姐",
              avatar:
                "https://apic.douyucdn.cn/upload/avatar_v3/202303/54d7c9db95524bf48a86d0f425c6a93f_middle.jpg",
              likes: 511,
              is_liked: false,
              comment_replies: 9,
              sub_replies: [
                {
                  comment_id: "2459468936682596246",
                  comment_reply_id: "2459580229125305046",
                  created_ts: 1706374424,
                  content: "顶顶顶",
                  locality: "河南",
                  uid: 177580834,
                  nick_name: "自o由o人",
                  avatar:
                    "https://apic.douyucdn.cn/upload/avanew/face/201705/05/16/a1f9dc1c964a644d258d92a4f50ee7e5_middle.jpg",
                  likes: 34,
                  is_liked: false,
                },
              ],
            },
            {
              comment_id: "2459343480192952283",
              created_ts: 1706346862,
              content:
                "五年了 我儿子从幼儿园到现在小学了 他是你的小粉丝  他问我团子姐姐为什么这么久没来了 我说你正在忙 他现在放寒假了 英语考的不好 在补习 但他一有空就会来问你今天播不播 我依旧回他你很忙 孩子的眼神不会撒谎 他渴望着你的出现 渴望听到你的声音 他也像我一样在想你 他还跟你说过话 不知道你有没有看到他发给你的微信 泪已止不住 没想到今年你不能陪我们跨年了 但能看到你发鱼吧我还是很开心的 你终于有消息了 我已经发给你小粉丝看了 我跟他说你的团子姐姐要年后回来了 是的 他只是单纯的喜欢你 我问过原因 他说不知道 但是看到你就会很开心 思绪混乱 今表涕零不知所言",
              locality: "上海",
              uid: 108944289,
              nick_name: "七团八团的跟乐私奔",
              avatar:
                "https://apic.douyucdn.cn/upload/avatar_v3/202303/952c33ec326b42b4bb0dcacc8c5ca3c4_middle.jpg",
              likes: 410,
              is_liked: false,
              comment_replies: 5,
              sub_replies: [
                {
                  comment_id: "2459343480192952283",
                  comment_reply_id: "2459347266701652527",
                  created_ts: 1706347303,
                  content: "祝你儿子跟团哥都快乐成长",
                  locality: "山西",
                  uid: 138758575,
                  nick_name: "自o由o人",
                  avatar:
                    "https://apic.douyucdn.cn/upload/avanew/face/201705/05/16/a1f9dc1c964a644d258d92a4f50ee7e5_middle.jpg",
                  likes: 87,
                  is_liked: false,
                },
              ],
            },
            {
              comment_id: "2459343480192952283",
              created_ts: 1706346862,
              content:
                "五年了 我儿子从幼儿园到现在小学了 他是你的小粉丝  他问我团子姐姐为什么这么久没来了 我说你正在忙 他现在放寒假了 英语考的不好 在补习 但他一有空就会来问你今天播不播 我依旧回他你很忙 孩子的眼神不会撒谎 他渴望着你的出现 渴望听到你的声音 他也像我一样在想你 他还跟你说过话 不知道你有没有看到他发给你的微信 泪已止不住 没想到今年你不能陪我们跨年了 但能看到你发鱼吧我还是很开心的 你终于有消息了 我已经发给你小粉丝看了 我跟他说你的团子姐姐要年后回来了 是的 他只是单纯的喜欢你 我问过原因 他说不知道 但是看到你就会很开心 思绪混乱 今表涕零不知所言",
              locality: "上海",
              uid: 108944289,
              nick_name: "七团八团的跟乐私奔",
              avatar:
                "https://apic.douyucdn.cn/upload/avatar_v3/202303/952c33ec326b42b4bb0dcacc8c5ca3c4_middle.jpg",
              likes: 410,
              is_liked: false,
              comment_replies: 5,
              sub_replies: [
                {
                  comment_id: "2459343480192952283",
                  comment_reply_id: "2459347266701652527",
                  created_ts: 1706347303,
                  content: "祝你儿子跟团哥都快乐成长",
                  locality: "山西",
                  uid: 138758575,
                  nick_name: "自o由o人",
                  avatar:
                    "https://apic.douyucdn.cn/upload/avanew/face/201705/05/16/a1f9dc1c964a644d258d92a4f50ee7e5_middle.jpg",
                  likes: 87,
                  is_liked: false,
                },
              ],
            },
            {
              comment_id: "2459343480192952283",
              created_ts: 1706346862,
              content:
                "五年了 我儿子从幼儿园到现在小学了 他是你的小粉丝  他问我团子姐姐为什么这么久没来了 我说你正在忙 他现在放寒假了 英语考的不好 在补习 但他一有空就会来问你今天播不播 我依旧回他你很忙 孩子的眼神不会撒谎 他渴望着你的出现 渴望听到你的声音 他也像我一样在想你 他还跟你说过话 不知道你有没有看到他发给你的微信 泪已止不住 没想到今年你不能陪我们跨年了 但能看到你发鱼吧我还是很开心的 你终于有消息了 我已经发给你小粉丝看了 我跟他说你的团子姐姐要年后回来了 是的 他只是单纯的喜欢你 我问过原因 他说不知道 但是看到你就会很开心 思绪混乱 今表涕零不知所言",
              locality: "上海",
              uid: 108944289,
              nick_name: "七团八团的跟乐私奔",
              avatar:
                "https://apic.douyucdn.cn/upload/avatar_v3/202303/952c33ec326b42b4bb0dcacc8c5ca3c4_middle.jpg",
              likes: 410,
              is_liked: false,
              comment_replies: 5,
              sub_replies: [
                {
                  comment_id: "2459343480192952283",
                  comment_reply_id: "2459347266701652527",
                  created_ts: 1706347303,
                  content: "祝你儿子跟团哥都快乐成长",
                  locality: "山西",
                  uid: 138758575,
                  nick_name: "自o由o人",
                  avatar:
                    "https://apic.douyucdn.cn/upload/avanew/face/201705/05/16/a1f9dc1c964a644d258d92a4f50ee7e5_middle.jpg",
                  likes: 87,
                  is_liked: false,
                },
              ],
            },
          ],
          count: 738
        }),
      };
    },
  },
];
