// ESM 載入 Vue3
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// axios 套件
import axios from "axios";

// sweetalert2 套件 -> 預設匯入
import Swal from "sweetalert2";

// API baseUrl
const url = "https://ec-course-api.hexschool.io/v2";

const app = createApp({
  data() {
    return {
      // 名稱必須跟六角 API 相同才能成功請求
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    loginPost() {
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => {
          // 把回傳的 token 及 expired timestamp 用解構賦值方式存成同名變數
          const { token, expired } = res.data;

          // 把 token 及 expired 存到 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

          // 登入成功通知
          Swal.fire({
            title: "登入成功",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });

          // 把資料存到 cookie 後，頁面導到商品頁
          // 用 setTimeout 等通知跑完再跳商品頁
          setTimeout(() => (location.href = "index.html"), 1500);
        })
        .catch((err) => {
          // 加入登入失敗的通知
          Swal.fire({
            title: `${err.response.data.message}`,
            text: "請重新輸入帳號、密碼",
            icon: "warning",
            showConfirmButton: false,
            timer: 1000,
          });

          // 登入失敗時清空欄位重新填寫
          this.user.username = "";
          this.user.password = "";
        });
    },
  },
});

app.mount("#app");
