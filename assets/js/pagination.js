export default {
  // 把外層 pagination 物件傳入，在內層用 pages 接收
  props: ["pages"],
  template: `<nav aria-label="DessertList Page navigation">
  <ul class="pagination">
  <!-- pagination(內層稱為 pages) 裡面有 has_pre 及 has_next 屬性，可以用來判斷是否要觸發 HTML disabled 屬性-->
    <li class="page-item" :class="{'disabled': !pages.has_pre}"><a class="page-link" href="#" @click="updatePage(pages.current_page - 1)">Previous</a></li>
    <!-- v-for 跑 pages.total_pages，用純數字跑 v-for -->
    <li class="page-item" v-for="(num, key) in pages.total_pages" :key="key" :class="{'active': num === pages.current_page}" @click="updatePage(num)"><a class="page-link" href="#" >{{ num }}</a></li>
    <li class="page-item" :class="{'disabled': !pages.has_next}"><a class="page-link" href="#"  @click="updatePage(pages.current_page + 1)">Next</a></li>
  </ul>
</nav>`,
  methods: {
    // updatePage 用來觸發外層方法 getProductData，點擊 previous 會把 (current_page - 1)作為參數傳遞到外層getProductData；點擊 next 會把 (current_page + 1)作為參數傳遞到外層 getProductData；點擊數字鈕會把該數值作為參數傳遞到外層 getProductData
    updatePage(page) {
      this.$emit("updatePage", page);
    },
  },
};
