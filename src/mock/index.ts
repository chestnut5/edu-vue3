/*
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-02-16 00:01:07
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-08 14:10:12
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/src/mock/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Mock from "mockjs";

Mock.mock("/list", () => {
  const list = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      id: Mock.mock("@id"),
      name: Mock.mock("@cname"),
      age: Mock.mock("@integer(20,30)"),
      city: Mock.mock("@city(true)"),
      picture: Mock.mock("@image"),
    });
  }
  return {
    message: "获取数据成功",
    result: list,
  };
});

// import Mock from "mockjs";

// const { item } = Mock.mock({
//   "item|6": [
//     {
//       id: "@id",
//       label: "@csentence(1,2)",
//       value: "@sentence(1)",
//       "status|1": ["published", "draft", "deleted"],
//       time: "@datetime",
//       pageNum: "@integer(0,100)",
//       "active|1": [true, false],
//     },
//   ],
// });
// src/mock/index.ts

// 获取mock的响应数据
// const getResponse = (
//   url: string,
//   type: string,
//   data: {}[],
//   condition: boolean
// ) => {
//   return {
//     url,
//     type: type || "get",
//     response: (config: any) => {
//       // console.log(config, type);

//       return condition
//         ? {
//             code: 200,
//             success: true,
//             message: "请求数据成功",
//             content: {
//               total: data.length,
//               data,
//             },
//           }
//         : {
//             code: 500,
//             success: false,
//             message: "请求数据失败",
//           };
//     },
//   };
// };

// const mocks = [
//   getResponse("/api/list", "get", item, true),
//   getResponse("/api/productList", "post", item, true),
// ];

// export const mockXHR = () => {
//   for (const i of mocks) {
//     Mock.mock(new RegExp(i.url), i.type || "get", i.response);
//   }
// };
