// Vue
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// import "bootstrap/dist/js/bootstrap.min.js";
// 元件
import updateModal from "./updateModalComponent";
import delModal from "./delModalComponent";

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

// 有些 request 需要夾帶 token 才能使用，所以在發送請求時夾帶 headers 資料，放在全域的話，每次發請求都會自動夾帶
axios.defaults.headers.common["Authorization"] = token;

const app = createApp({
  data() {
    return {
      // 接收內層元件建立的 bs5 productModal 實體
      productModal: null,
      // 接收內層元件建立的 bs5 delProductModal 實體
      delProductModal: null,
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
        this.productModal.show();
      }
      // 如果是編輯或刪除商品，會「淺拷貝」 item 並賦予給 tempProduct 這樣才不會在編輯時因為 v-model 而修改到畫面
      else if (isNew === "edit") {
        this.tempProduct = { ...item };

        // 決定在 updateProduct() 為 put
        this.isNew = false;

        // 開啟編輯商品的視窗
        this.productModal.show();
      } else if (isNew === "delete") {
        this.tempProduct = { ...item };

        // 開啟刪除商品的視窗
        this.delProductModal.show();
      }
    },
    // 用來接收 updateModalComponent 元件傳遞出來的參數(BS5 productModal 實體)而建立的方法
    getProductModal(productModal) {
      this.productModal = productModal;
    },
    // 用來接收 delModalComponent 元件傳遞出來的參數(BS5 delProductModal 實體)而建立的方法
    getDelProductModal(delProductModal) {
      this.delProductModal = delProductModal;
    },
    // 用來接收 delModalComponent 元件修改外層元件後傳遞出來的參數(innerDelProduct)而建立的方法
    clearTempProduct(delProduct) {
      this.tempProduct = delProduct;
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
