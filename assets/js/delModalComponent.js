// 檔案中要使用 bootstrap 方法必須先import bootstrap
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

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

export default {
  data() {
    return {
      // 內層元件用來儲存 BS5 delProductModal 實體的資料狀態
      delProductModal: null,
      // 內層元件用來避免單向數據流以修改外層 props: tempProduct -> item 所定義的資料狀態
      // template 內還是可以用 props 的 item 渲染畫面，只因為要修改外層資料所以才定義了一個 innderDelProduct
      innerDelProduct: {},
    };
  },
  props: ["item"],
  template: `<!-- 刪除 modal template -->
      <div
      id="delProductModal"
      ref="delProductModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="delProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="text-center">
              是否刪除
              <strong class="text-danger">{{ item.title }}</strong>？
            </p>
            <p class="text-center">商品刪除後將無法恢復！</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>`,
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
          this.delProductModal.hide();

          // 重新抓商品資料渲染表格
          this.$emit("update");

          // 商品刪除了，所以清空 tempProduct(內層元件使用 item接收)，才不會出現在商品細節中
          this.innerDelProduct = { imagesUrl: [] };
          // 又因為單向數據流，不能直接改 item，所以要用 emit 方法傳參數出去
          this.$emit("clearOuterTempProduct", this.innerDelProduct);
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
  // mounted 階段 props item 沒東西，只有變更畫面(updated)時才有東西。所以在 updated 時，把外層 props 傳入的 item，賦予給內層元件定義的資料 innerDelProduct，才能修改後用 emit 作為參數傳遞出去
  updated() {
    this.innerDelProduct = this.item;
  },
  mounted() {
    // 刪除商品時的 BS5 元物件實例
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
    this.$emit("delModalComponentCreated", this.delProductModal);
  },
};
