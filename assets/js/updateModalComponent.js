import { productModal } from "./index";

export default {
  props: ["product", "isNew"],
  methods: {
    // 更新商品
    updateProduct() {
      // 新增商品就發送 post 請求
      if (this.isNew === true) {
        axios
          .post(`${url}/api/${path}/admin/product`, { data: this.tempProduct })
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

            // 重新渲染表格
            this.getProductData();
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
          .put(`${url}/api/${path}/admin/product/${this.tempProduct.id}`, {
            data: this.tempProduct,
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

            // 重新渲染表格
            this.getProductData();
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
  template: `<div
  class="modal fade"
  id="productModal"
  ref="productModal"
  tabindex="-1"
  aria-labelledby="productModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-success">
        <h3 class="modal-title text-white" id="ProductModalLabel">
          <span v-if="isNew">新增商品</span>
          <span v-else>編輯商品</span>
        </h3>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <!-- modal 左側內容寬度 -->
          <div class="col-sm-8">
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label for="productTitle" class="form-label"
                    >標題</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="productTitle"
                    placeholder="請輸入商品標題"
                    v-model="product.title"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="productCategory" class="form-label"
                    >分類</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="productCategory"
                    placeholder="請輸入商品分類"
                    v-model="product.category"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mb-3">
                  <label for="productOriginPrice" class="form-label"
                    >原價</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="productOriginPrice"
                    min="10"
                    placeholder="請輸入商品原價"
                    v-model.number="product.origin_price"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="productPrice" class="form-label"
                    >售價</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="productPrice"
                    min="10"
                    placeholder="請輸入商品售價"
                    v-model.number="product.price"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="productUnit" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="productUnit"
                    placeholder="請輸入商品單位"
                    v-model="product.unit"
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="productDescription" class="form-label"
                >商品描述</label
              >
              <input
                type="text"
                class="form-control"
                id="productDescription"
                placeholder="請輸入商品描述"
                v-model="product.description"
              />
            </div>
            <div class="mb-3">
              <label for="productContent" class="form-label"
                >商品內容</label
              >
              <input
                type="text"
                class="form-control"
                id="productContent"
                placeholder="請輸入商品內容"
                v-model="product.content"
              />
            </div>
            <div class="mb-3">
              <input
                type="checkbox"
                class="form-checkbox-input me-1"
                id="productIsEnabled"
                v-model="product.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label for="productIsEnabled" class="form-label"
                >是否啟用</label
              >
            </div>
          </div>
          <!-- modal 右側內容寬度 -->
          <div class="col-sm-4">
            <div class="mb-3">
              <label for="productMainImage" class="form-label"
                >主圖網址</label
              >
              <input
                type="text"
                class="form-control mb-3"
                id="productMainImage"
                placeholder="請輸入主圖網址"
                v-model="product.imageUrl"
              />
              <img
                class="img-fluid"
                :src="product.imageUrl"
                :alt="product.title"
              />
            </div>
            <h5>多圖新增</h5>
            <!-- 使用 Array.isArray 驗證傳入的值是否為陣列，如果是就回傳 true -->
            <div v-if="Array.isArray(product.imagesUrl)">
              <!-- 用 v-for 跑 product.imagesUrl，label 的 for 跟 input 的 id 用 key 來綁定 -->
              <!-- 陣列裡有空字串有會渲染，不過因為 input value 為空所以不會顯示任何東西 -->
              <div
                class="mb-1"
                v-for="(image, key) in product.imagesUrl"
                :key="key"
              >
                <div class="mb-3">
                  <label :for="image" class="form-label"
                    >圖片網址</label
                  >
                  <!-- v-model 使用索引值(key)綁定對應的圖片 url -> product.imagesUrl[key] -->
                  <input
                    :id="image"
                    v-model="product.imagesUrl[key]"
                    type="url"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <!-- v-bind 綁定imagesUrl 的所有圖片網址，即時渲染圖片 -->
                <img class="img-fluid" :src="image" />
              </div>
              <!-- 如果 imagesUrl 長度為 0(第一次點開新增商品前，product.imagesUrl = []，所以 !false = true，因此會顯示 v-if 內容)，或目前最後一個照片網址有填寫時(input 內有值true 時)。
              當第一次點開新增圖片後，雖然 push 一個空字串到 imagesUrl 陣列，length 有值了，但是若是用陣列取值去讀取，仍會取得假值，空字串視為 false，所以 false || false 會顯示刪除圖片按鈕 -->
              <!-- 簡言之就是當 imagesUrl 為空陣列，或是有填寫網址時會呈現新增圖片按鈕 -->
              <div
                v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]"
              >
                <!-- 長度為 0 或是上一個 input 填滿了，會推一個空字串進去，重新跑 v-for，並且渲染出一個新的空 input 讓人填寫下一個網址 -->
                <button
                  class="btn btn-outline-success btn-sm d-block w-100"
                  @click="product.imagesUrl.push('')"
                >
                  新增圖片
                </button>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="product.imagesUrl.pop()"
                >
                  刪除圖片
                </button>
              </div>
            </div>
            <!-- 如果 product 沒有 imagesUrl 陣列，就顯示「新增圖片」按鈕，並在按下按鈕後，執行 createImages methods 來推進一個空陣列，進而讓上方 v-if 等於 true，且在輸入網址後可以開始用 v-for 渲染多圖照片 -->
            <!-- 好像非必要，除非把所有會為 data 新增 product.imagesUrl 的程式碼移除，才會出現該按鈕 -->
            <div v-else>
              <button
                class="btn btn-outline-primary btn-sm d-block w-100"
                @click="createImages"
              >
                新增圖片
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          <span v-if="isNew">取消新增</span>
          <span v-else>取消編輯</span>
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="updateProduct"
        >
          <span v-if="isNew">確定新增</span>
          <span v-else>確定編輯</span>
        </button>
      </div>
    </div>
  </div>
</div>`,
  mounted() {
    productModal = new bootstrap.Modal(this.$refs.productModal);
  },
};
