// Vue
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// 元件

// axios 套件 -> 預設匯入
import axios from "axios";

// sweetalert2 套件 -> 預設匯入
import Swal from "sweetalert2";

// API baseUrl
const url = "https://ec-course-api.hexschool.io/v2";

// API path
const path = "michaelhsia";

// 從 cookie 取得 token 資料
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);

// 新增或編輯商品時的 BS5 元物件實例
let productModal = null;

// 刪除商品時的 BS5 元物件實例
let delProductModal = null;

// 有些 request 需要夾帶 token 才能使用，所以在發送請求時夾帶 headers 資料，放在全域的話，每次發請求都會自動夾帶
axios.defaults.headers.common["Authorization"] = token;

// 新增、編輯 modal
const updateModal = {
  props: ["product", "isNew"],
  template: "#updateModal",
  methods: {
    // 更新商品
    updateProduct() {
      // 新增商品就發送 post 請求
      if (this.isNew === true) {
        axios
          .post(`${url}/api/${path}/admin/product`, { data: this.product })
          .then((res) => {
            // 新增商品成功通知
            Swal.fire({
              title: `${res.data.message}`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });

            // 關閉「新增商品」彈跳視窗
            productModal.hide();

            // 觸發外層 getProductData 重新渲染表格
            this.$emit("update");
          })
          .catch((err) => {
            Swal.fire({
              title: `${err.response.data.message}`,
              icon: "warning",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
      // 修改商品就發送 put 請求，要有商品 id
      else if (this.isNew === false) {
        axios
          .put(`${url}/api/${path}/admin/product/${this.product.id}`, {
            data: this.product,
          })
          .then((res) => {
            console.log(res.data);
            // 編輯商品成功通知
            Swal.fire({
              title: `${res.data.message}`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });

            // 關閉「編輯商品」彈跳視窗
            productModal.hide();

            // 觸發外層 getProductData 重新渲染表格
            this.$emit("update");
          })
          .catch((err) => {
            Swal.fire({
              title: `${err.response.data.message}`,
              icon: "warning",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },
  },
  mounted() {
    // 創造 BS5 modal 元件實例，一定要在 mounted 後，不然抓不到 DOM，在created 創造會出現 backdrop undefined 錯誤，另外需建立在 container 外，#app 內，才不會與其他物件發生衝突、也才能透過 vue 操作
    productModal = new bootstrap.Modal(this.$refs.productModal);
  },
};

// 刪除 modal
const delModal = {
  props: ["item"],
  template: "#delModal",
  methods: {
    // 刪除商品
    delProduct() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.item.id}`)
        .then((res) => {
          // 彈跳通知「刪除成功訊息」
          Swal.fire({
            title: `${res.data.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          // 把 BS5 彈跳視窗關閉
          delProductModal.hide();

          // 重新抓商品資料渲染表格
          this.$emit("update");

          // 商品刪除了，所以清空 tempProduct 才不會出現在商品細節中
          this.item = { imagesUrl: [] };
        })
        .catch((err) => {
          // 彈跳通知「刪除失敗訊息」
          Swal.fire({
            title: `${err.response.data.message}`,
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
  mounted() {
    delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
  },
};

const app = createApp({
  data() {
    return {
      // products 陣列存取外部回傳的產品資料 -> 會回傳物件
      products: [],
      // 決定發請求時，是新增(post)或是編輯(put)的變數
      isNew: false,
      // tempProduct 物件存取要渲染的產品細節
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  components: {
    updateModal,
    delModal,
  },
  methods: {
    // 未登入，會跳回登入頁面
    backToLogin() {
      setTimeout(() => (location.href = "login.html"), 1500);
    },

    // 發送請求抓取外部產品資料
    getProductData() {
      // 會回傳物件
      axios
        .get(`${url}/api/${path}/admin/products/all`)
        .then((res) => {
          this.products = res.data.products;
          //   console.log(this.products);
        })
        .catch((err) => alert(`發生錯誤： ${err.response} 請檢查錯誤`));
    },
    // 開啟彈跳視窗新增、編輯或刪除
    // 第一個參數用來判斷是否為新增，第二個參數為傳入要編輯的商品 item
    openModal(isNew, item) {
      // 如果是新增商品，會清空 tempProduct 中的資料
      if (isNew === "new") {
        this.tempProduct = { imagesUrl: [] };

        // 決定在 updateProduct() 為 post
        this.isNew = true;

        // 開啟新增商品的視窗
        productModal.show();
      }
      // 如果是編輯或刪除商品，會「淺拷貝」 item 並賦予給 tempProduct 這樣才不會在編輯時因為 v-model 而修改到畫面
      else if (isNew === "edit") {
        this.tempProduct = { ...item };

        // 決定在 updateProduct() 為 put
        this.isNew = false;

        // 開啟編輯商品的視窗
        productModal.show();
      } else if (isNew === "delete") {
        this.tempProduct = { ...item };

        // 開啟刪除商品的視窗
        delProductModal.show();
      }
    },
    // 新增商品小圖，除非 this.tempProduct 沒有陣列屬性才有機會用到
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
  // 這邊單純只要呈現「有幾項商品」，可以從 data 的 products 計算，但不用寫回 data，所以使用 computed
  computed: {
    total() {
      // 用 Object.keys 計算商品有多少屬性 -> 會回傳一組商品 id 陣列
      const productCount = Object.keys(this.products);
      //  console.log(productCount);
      return productCount.length;
    },
  },
  mounted() {
    // 在 mounted 時，驗證是否登入，如果沒通過驗證就跑 catch
    axios
      .post(`${url}/api/user/check`)
      // 有登入就抓取外部資料渲染畫面
      .then((res) => this.getProductData())
      .catch((err) => {
        // 未登入的提醒
        Swal.fire({
          title: "你好像還沒登入~",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });

        // 觸發 backToLogin
        this.backToLogin();
      });
  },
});

app.mount("#app");
