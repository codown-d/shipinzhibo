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
          "list":[
            {
              userDynamic: {
                dynamicMsgId: 106,
                subjectId: 17,
                uid: 19313,
                comtent: "132456",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1728391860000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 105,
                uid: 19313,
                comtent: "123",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1728391816000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 104,
                uid: 19313,
                comtent: "123",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 103,
                commentNum: 0,
                likeNum: 0,
                createTime: 1728391375000,
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 103,
                subjectId: 17,
                uid: 19198,
                comtent: "123",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 1,
                likeNum: 0,
                createTime: 1728378750000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 103,
                subjectId: 17,
                uid: 19198,
                comtent: "123",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 1,
                likeNum: 0,
                createTime: 1728378750000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 102,
                uid: 19198,
                comtent: "测试一下发布",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1728378563000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 101,
                uid: 19198,
                comtent: "111",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 99,
                commentNum: 1,
                likeNum: 0,
                createTime: 1727332615000,
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 99,
                uid: 16973,
                comtent: "丢～#冰美式",
                dynamicType: 1,
                attachmentType: 1,
                attachmentUrl:
                  '["https://oss.tbh-mall.com/avatar%2F240830%2F0i70BcSRjyv99tsO-bhBY#AAAAzQMqzQQ4rEFORzkyM1dBX04lTQ=="]',
                forward: false,
                commentNum: 0,
                likeNum: 1,
                createTime: 1724997079000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 100,
                subjectId: 16,
                uid: 19158,
                comtent: "丢",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 99,
                commentNum: 5,
                likeNum: 2,
                createTime: 1724997109000,
                subjectName: "00后年入百万的我",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/FtEk9ykJ3VQ0qrRzRG7DZdDHaiLh?imageslim",
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 99,
                uid: 16973,
                comtent: "丢～#冰美式",
                dynamicType: 1,
                attachmentType: 1,
                attachmentUrl:
                  '["https://oss.tbh-mall.com/avatar%2F240830%2F0i70BcSRjyv99tsO-bhBY#AAAAzQMqzQQ4rEFORzkyM1dBX04lTQ=="]',
                forward: false,
                commentNum: 0,
                likeNum: 1,
                createTime: 1724997079000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 99,
                uid: 16973,
                comtent: "丢～#冰美式",
                dynamicType: 1,
                attachmentType: 1,
                attachmentUrl:
                  '["https://oss.tbh-mall.com/avatar%2F240830%2F0i70BcSRjyv99tsO-bhBY#AAAAzQMqzQQ4rEFORzkyM1dBX04lTQ=="]',
                forward: false,
                commentNum: 0,
                likeNum: 1,
                createTime: 1724997079000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 98,
                subjectId: 17,
                uid: 19158,
                comtent: "hi",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 83,
                commentNum: 0,
                likeNum: 0,
                createTime: 1724996998000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 83,
                uid: 17012,
                comtent: "#发财",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1720071921000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 97,
                uid: 17025,
                comtent: "。",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1724826456000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 96,
                subjectId: 17,
                uid: 19140,
                comtent: "。。。。",
                dynamicType: 1,
                attachmentType: 3,
                attachmentUrl:
                  '{"dur":2913,"width":1920,"height":1080,"cover":"https://oss.tbh-mall.com/avatar%2F240806%2Fv0aJuvbIJrxL6kNppjfO3","url":"https://oss.tbh-mall.com/avatar%2F240806%2FvQ-TmJW6FgBeakiRk88mQ"}',
                forward: false,
                commentNum: 2,
                likeNum: 3,
                createTime: 1722925517000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 95,
                subjectId: 17,
                uid: 19140,
                comtent: "444",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1722925469000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 94,
                uid: 16967,
                comtent: "111",
                dynamicType: 1,
                attachmentType: 3,
                attachmentUrl:
                  '{"dur":4288,"width":1920,"height":1080,"cover":"https://oss.tbh-mall.com/post/240723/Gc6CrJBWSVeJnXXAzWefjQ","url":"https://oss.tbh-mall.com/post/240723/P6BNM4ybS3CfaDSs4GMf0Q"}',
                forward: false,
                commentNum: 2,
                likeNum: 1,
                createTime: 1721715788000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 93,
                subjectId: 3,
                uid: 16976,
                comtent: "😘",
                dynamicType: 1,
                attachmentType: 3,
                attachmentUrl:
                  '{"dur":734000,"cover":"https://oss.tbh-mall.com/post/240719/N1H5F4G1R9mDIzWBSjOyDg","url":"https://oss.tbh-mall.com/post/240719/buuuhNrGR9OsZwjorJgeSQ"}',
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1721384628000,
                subjectName: "新人报道",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fj1pyTHTcb-U7HGRWhJK4CfBW0ua?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 92,
                uid: 16976,
                comtent: "3422813",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 1,
                createTime: 1721129524000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 91,
                subjectId: 15,
                uid: 17068,
                comtent: "17068",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 1,
                likeNum: 1,
                createTime: 1720694550000,
                subjectName: "那些年你磕成功的cp",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/FsX1_lNTqDPwYn3Kabh33BglcBFe?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 86,
                subjectId: 17,
                uid: 16991,
                comtent: "64979",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 2,
                likeNum: 2,
                createTime: 1720678841000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 85,
                uid: 17035,
                comtent: "30",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 76,
                commentNum: 0,
                likeNum: 0,
                createTime: 1720166531000,
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 76,
                uid: 17021,
                comtent: "⚽️点赞",
                dynamicType: 1,
                attachmentType: 1,
                attachmentUrl:
                  '["http://oss.tbh-mall.com/post/240605/Vh5hzSzaQuSfxMaAs5yU0w#AAAAzQv8zQgArEFMQ2klSDAwLT1JVA=="]',
                forward: false,
                commentNum: 8,
                likeNum: 6,
                createTime: 1717557318000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 84,
                uid: 17035,
                comtent: "@651",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 4,
                likeNum: 1,
                createTime: 1720159626000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 83,
                uid: 17012,
                comtent: "#发财",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1720071921000,
                hasLike: false,
              },
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
              userDynamic: {
                dynamicMsgId: 106,
                subjectId: 17,
                uid: 19313,
                comtent: "132456",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1728391860000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 105,
                uid: 19313,
                comtent: "123",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1728391816000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 104,
                uid: 19313,
                comtent: "123",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 103,
                commentNum: 0,
                likeNum: 0,
                createTime: 1728391375000,
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 103,
                subjectId: 17,
                uid: 19198,
                comtent: "123",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 1,
                likeNum: 0,
                createTime: 1728378750000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 103,
                subjectId: 17,
                uid: 19198,
                comtent: "123",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 1,
                likeNum: 0,
                createTime: 1728378750000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 102,
                uid: 19198,
                comtent: "测试一下发布",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1728378563000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 101,
                uid: 19198,
                comtent: "111",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 99,
                commentNum: 1,
                likeNum: 0,
                createTime: 1727332615000,
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 99,
                uid: 16973,
                comtent: "丢～#冰美式",
                dynamicType: 1,
                attachmentType: 1,
                attachmentUrl:
                  '["https://oss.tbh-mall.com/avatar%2F240830%2F0i70BcSRjyv99tsO-bhBY#AAAAzQMqzQQ4rEFORzkyM1dBX04lTQ=="]',
                forward: false,
                commentNum: 0,
                likeNum: 1,
                createTime: 1724997079000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 100,
                subjectId: 16,
                uid: 19158,
                comtent: "丢",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 99,
                commentNum: 5,
                likeNum: 2,
                createTime: 1724997109000,
                subjectName: "00后年入百万的我",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/FtEk9ykJ3VQ0qrRzRG7DZdDHaiLh?imageslim",
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 99,
                uid: 16973,
                comtent: "丢～#冰美式",
                dynamicType: 1,
                attachmentType: 1,
                attachmentUrl:
                  '["https://oss.tbh-mall.com/avatar%2F240830%2F0i70BcSRjyv99tsO-bhBY#AAAAzQMqzQQ4rEFORzkyM1dBX04lTQ=="]',
                forward: false,
                commentNum: 0,
                likeNum: 1,
                createTime: 1724997079000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 99,
                uid: 16973,
                comtent: "丢～#冰美式",
                dynamicType: 1,
                attachmentType: 1,
                attachmentUrl:
                  '["https://oss.tbh-mall.com/avatar%2F240830%2F0i70BcSRjyv99tsO-bhBY#AAAAzQMqzQQ4rEFORzkyM1dBX04lTQ=="]',
                forward: false,
                commentNum: 0,
                likeNum: 1,
                createTime: 1724997079000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 98,
                subjectId: 17,
                uid: 19158,
                comtent: "hi",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 83,
                commentNum: 0,
                likeNum: 0,
                createTime: 1724996998000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 83,
                uid: 17012,
                comtent: "#发财",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1720071921000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 97,
                uid: 17025,
                comtent: "。",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1724826456000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 96,
                subjectId: 17,
                uid: 19140,
                comtent: "。。。。",
                dynamicType: 1,
                attachmentType: 3,
                attachmentUrl:
                  '{"dur":2913,"width":1920,"height":1080,"cover":"https://oss.tbh-mall.com/avatar%2F240806%2Fv0aJuvbIJrxL6kNppjfO3","url":"https://oss.tbh-mall.com/avatar%2F240806%2FvQ-TmJW6FgBeakiRk88mQ"}',
                forward: false,
                commentNum: 2,
                likeNum: 3,
                createTime: 1722925517000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 95,
                subjectId: 17,
                uid: 19140,
                comtent: "444",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1722925469000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 94,
                uid: 16967,
                comtent: "111",
                dynamicType: 1,
                attachmentType: 3,
                attachmentUrl:
                  '{"dur":4288,"width":1920,"height":1080,"cover":"https://oss.tbh-mall.com/post/240723/Gc6CrJBWSVeJnXXAzWefjQ","url":"https://oss.tbh-mall.com/post/240723/P6BNM4ybS3CfaDSs4GMf0Q"}',
                forward: false,
                commentNum: 2,
                likeNum: 1,
                createTime: 1721715788000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 93,
                subjectId: 3,
                uid: 16976,
                comtent: "😘",
                dynamicType: 1,
                attachmentType: 3,
                attachmentUrl:
                  '{"dur":734000,"cover":"https://oss.tbh-mall.com/post/240719/N1H5F4G1R9mDIzWBSjOyDg","url":"https://oss.tbh-mall.com/post/240719/buuuhNrGR9OsZwjorJgeSQ"}',
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1721384628000,
                subjectName: "新人报道",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fj1pyTHTcb-U7HGRWhJK4CfBW0ua?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 92,
                uid: 16976,
                comtent: "3422813",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 1,
                createTime: 1721129524000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 91,
                subjectId: 15,
                uid: 17068,
                comtent: "17068",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 1,
                likeNum: 1,
                createTime: 1720694550000,
                subjectName: "那些年你磕成功的cp",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/FsX1_lNTqDPwYn3Kabh33BglcBFe?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 86,
                subjectId: 17,
                uid: 16991,
                comtent: "64979",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 2,
                likeNum: 2,
                createTime: 1720678841000,
                subjectName: "春节你都干了啥？",
                coverImgUrl:
                  "http://cdn.jifeng2022.cn/Fq-eiyNYoOFkhEk6LCO5mD7oE5TC?imageslim",
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 85,
                uid: 17035,
                comtent: "30",
                dynamicType: 1,
                attachmentType: 0,
                forward: true,
                forwardDynamicId: 76,
                commentNum: 0,
                likeNum: 0,
                createTime: 1720166531000,
                hasLike: false,
              },
              forwardDynamic: {
                dynamicMsgId: 76,
                uid: 17021,
                comtent: "⚽️点赞",
                dynamicType: 1,
                attachmentType: 1,
                attachmentUrl:
                  '["http://oss.tbh-mall.com/post/240605/Vh5hzSzaQuSfxMaAs5yU0w#AAAAzQv8zQgArEFMQ2klSDAwLT1JVA=="]',
                forward: false,
                commentNum: 8,
                likeNum: 6,
                createTime: 1717557318000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 84,
                uid: 17035,
                comtent: "@651",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 4,
                likeNum: 1,
                createTime: 1720159626000,
                hasLike: false,
              },
            },
            {
              userDynamic: {
                dynamicMsgId: 83,
                uid: 17012,
                comtent: "#发财",
                dynamicType: 1,
                attachmentType: 0,
                forward: false,
                commentNum: 0,
                likeNum: 0,
                createTime: 1720071921000,
                hasLike: false,
              },
            },
          ],
          count: 738
        }),
      };
    },
  },
];
