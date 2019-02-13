<template>
  <div class="book-box">
    <div class="book-desk">
      <!--第一行第一列-->
      <book-list
        :top="44"
        :left="33"
        :width="288"
        :height="80"
        :bookWidth="18"
        :bookHeight="46"
        :bookTop="25"
        :data="data.row1column1"
        bookType="row1-column1"
        @event-change="onChange"
      />
      <!--第一行第二列-->
      <book-list
        :top="48"
        :left="500"
        :width="288"
        :height="80"
        :bookWidth="14"
        :bookHeight="52"
        :bookTop="15"
        :data="data.row1column2"
        bookType="row1-column2"
        @event-change="onChange"
      />
      <!--第二行第一列-->
      <book-list
        :top="142.5"
        :left="33"
        :width="288"
        :height="87"
        :bookWidth="14"
        :bookHeight="84"
        :bookTop="21"
        :data="data.row2column1"
        bookType="row2-column1"
        @event-change="onChange"
      />
      <!--第二行第二列-->
      <book-list
        :top="142.5"
        :left="500"
        :width="218"
        :height="85.5"
        :bookWidth="23"
        :bookHeight="83"
        :data="data.row2column2"
        :bookTop="21"
        bookType="row2-column2"
        @event-change="onChange"
      />
      <!--第三行第一列-->
      <book-list
        :top="242.5"
        :left="33"
        :width="288"
        :height="89"
        :bookWidth="23"
        :bookHeight="86"
        :data="data.row3column1"
        :bookTop="21"
        bookType="row3-column1"
        @event-change="onChange"
      />
      <!--第三行第二列-->
      <book-list
        :top="242.5"
        :left="500"
        :width="288"
        :height="89"
        :bookWidth="15"
        :bookHeight="86"
        :data="data.row3column2"
        :bookTop="21"
        bookType="row3-column2"
        @event-change="onChange"
      />
      <!--第四行第一列-->
      <book-list
        :top="368"
        :left="33"
        :width="288"
        :height="68"
        :bookWidth="23"
        :bookHeight="65"
        :data="data.row4column1"
        :bookTop="24"
        bookType="row4-column1"
        @event-change="onChange"
      />
      <!--第四行第二列-->
      <book-list
        :top="368"
        :left="500"
        :width="288"
        :height="68"
        :bookWidth="23"
        :bookHeight="65"
        :data="data.row4column2"
        :bookTop="24"
        bookType="row4-column2"
        @event-change="onChange"
      />
      <!--第五行第一列-->
      <book-list
        :top="455.5"
        :left="144"
        :width="172"
        :height="87"
        :bookWidth="19"
        :bookHeight="84"
        :data="data.row5column1"
        :bookTop="32"
        bookType="row5-column1"
        @event-change="onChange"
      />
      <!--第五行第二列-->
      <book-list
        :top="455.5"
        :left="500"
        :width="288"
        :height="85.5"
        :bookWidth="19"
        :bookHeight="84"
        :data="data.row5column2"
        :bookTop="32"
        bookType="row5-column2"
        @event-change="onChange"
      />
      <!--第六行第一列-->
      <book-list
        :top="554"
        :left="33"
        :width="288"
        :height="87"
        :bookWidth="19"
        :bookHeight="84"
        :data="data.row6column1"
        :bookTop="32"
        bookType="row6-column1"
        @event-change="onChange"
      />
      <!--第六行第二列-->
      <book-list
        :top="554"
        :left="500"
        :width="288"
        :height="87"
        :bookWidth="19"
        :bookHeight="84"
        :data="data.row6column2"
        :bookTop="32"
        bookType="row6-column2"
        @event-change="onChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import BookList from './BookList.vue'
@Component({
  components: { BookList },
  props: {
    data: {
      type: Object,
      default: {
        row1column1: [],
        row1column2: [],
        row2column1: [],
        row2column2: [],
        row3column1: [],
        row3column2: [],
        row4column1: [],
        row4column2: [],
        row5column1: [],
        row5column2: [],
        row6column1: [],
        row6column2: []
      }
    }
  }
})
export default class bookcase extends Vue {
  onChange (id: String, name: String, href: String) {
    this.$emit('event-change', id, name, href)
  }
}
</script>

<style scoped>
.book-box{
  float: left;
}
.book-desk{
  position: relative;
  margin-left: 23.5px;
  width: 819px;
  height: 682px;
  margin-top: 50px;
  background: url("../../../assets/book_desk.png");
}
</style>
