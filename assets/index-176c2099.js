import{a as s,S as e,b as d}from"./sweetalert2.all-52ec6000.js";import{createApp as n}from"https://unpkg.com/vue@3/dist/vue.esm-browser.js";const o="https://ec-course-api.hexschool.io/v2",l="michaelhsia";document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");const u={data(){return{productModal:null,innerProduct:{}}},props:["product","isNew"],template:`<div
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
                @click="innerCreateImages"
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
  </div>`,methods:{innerCreateImages(){this.$emit("createImages")},updateProduct(){this.isNew===!0?s.post(`${o}/api/${l}/admin/product`,{data:this.innerProduct}).then(t=>{e.fire({title:`${t.data.message}`,icon:"success",showConfirmButton:!1,timer:1500}),this.productModal.hide(),this.$emit("update")}).catch(t=>{e.fire({title:`${t.response.data.message}`,icon:"warning",showConfirmButton:!1,timer:1500})}):this.isNew===!1&&s.put(`${o}/api/${l}/admin/product/${this.innerProduct.id}`,{data:this.innerProduct}).then(t=>{console.log(t.data),e.fire({title:`${t.data.message}`,icon:"success",showConfirmButton:!1,timer:1500}),this.productModal.hide(),this.$emit("update")}).catch(t=>{e.fire({title:`${t.response.data.message}`,icon:"warning",showConfirmButton:!1,timer:1500})})}},updated(){this.innerProduct=this.product},mounted(){this.productModal=new d.Modal(this.$refs.productModal),this.$emit("productModalCreated",this.productModal)}},p="https://ec-course-api.hexschool.io/v2",m="michaelhsia";document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");const h={data(){return{delProductModal:null,innerDelProduct:{}}},props:["item"],template:`<!-- 刪除 modal template -->
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
    </div>`,methods:{delProduct(){s.delete(`${p}/api/${m}/admin/product/${this.item.id}`).then(t=>{e.fire({title:`${t.data.message}`,icon:"success",showConfirmButton:!1,timer:1500}),this.delProductModal.hide(),this.$emit("update"),this.innerDelProduct={imagesUrl:[]},this.$emit("clearOuterTempProduct",this.innerDelProduct)}).catch(t=>{e.fire({title:`${t.response.data.message}`,icon:"warning",showConfirmButton:!1,timer:1500})})}},updated(){this.innerDelProduct=this.item},mounted(){this.delProductModal=new d.Modal(this.$refs.delProductModal),this.$emit("delModalComponentCreated",this.delProductModal)}},b={props:["pages"],template:`<nav aria-label="DessertList Page navigation">
  <ul class="pagination">
  <!-- pagination(內層稱為 pages) 裡面有 has_pre 及 has_next 屬性，可以用來判斷是否要觸發 HTML disabled 屬性-->
    <li class="page-item" :class="{'disabled': !pages.has_pre}"><a class="page-link" href="#" @click="updatePage(pages.current_page - 1)">Previous</a></li>
    <!-- v-for 跑 pages.total_pages，用純數字跑 v-for -->
    <li class="page-item" v-for="(num, key) in pages.total_pages" :key="key" :class="{'active': num === pages.current_page}" @click="updatePage(num)"><a class="page-link" href="#" >{{ num }}</a></li>
    <li class="page-item" :class="{'disabled': !pages.has_next}"><a class="page-link" href="#"  @click="updatePage(pages.current_page + 1)">Next</a></li>
  </ul>
</nav>`,methods:{updatePage(t){this.$emit("updatePage",t)}}},i="https://ec-course-api.hexschool.io/v2",v="michaelhsia",g=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");s.defaults.headers.common.Authorization=g;const f=n({data(){return{productModal:null,delProductModal:null,products:[],isNew:!1,tempProduct:{imagesUrl:[]},pagination:{}}},components:{updateModal:u,delModal:h,pagination:b},methods:{backToLogin(){setTimeout(()=>location.href="login.html",1500)},getProductData(t=1){s.get(`${i}/api/${v}/admin/products?page=${t}`).then(a=>{const{products:r,pagination:c}=a.data;this.products=r,this.pagination=c}).catch(a=>alert(`發生錯誤： ${a.response} 請檢查錯誤`))},openModal(t,a){t==="new"?(this.tempProduct={imagesUrl:[]},this.isNew=!0,this.productModal.show()):t==="edit"?(this.tempProduct={...a},this.isNew=!1,this.productModal.show()):t==="delete"&&(this.tempProduct={...a},this.delProductModal.show())},getProductModal(t){this.productModal=t},getDelProductModal(t){this.delProductModal=t},clearTempProduct(t){this.tempProduct=t},createImages(){this.tempProduct.imagesUrl=[],this.tempProduct.imagesUrl.push("")}},mounted(){s.post(`${i}/api/user/check`).then(t=>this.getProductData()).catch(t=>{e.fire({title:"你好像還沒登入~",icon:"warning",showConfirmButton:!1,timer:1500}),this.backToLogin()})}});f.mount("#app");
