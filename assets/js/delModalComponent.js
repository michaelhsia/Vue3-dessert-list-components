import { delProductModal } from "./index";

export default {
  // 刪除 modal
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
};
