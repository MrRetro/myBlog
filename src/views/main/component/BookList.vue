<template>
  <ul
    class="book-ul"
    :class="[bookType]"
    :style="`
      top:${top}px;
      left:${left}px;
      width:${width}px;
      height:${height}px;
      `"
  >
    <li
      class="book"
      :style="`
        width:${bookWidth}px;
        height:${bookHeight}px;
        paddingTop:${bookTop}px;
        `"
      :key="i"
      v-for="(item,i) in data"
      @click="handleClick(item)"
    >
      <span class="name">{{item.name}}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  props: {
    top: Number,
    left: Number,
    width: Number,
    height: Number,
    bookWidth: Number,
    bookHeight: Number,
    bookTop: Number,
    bookType: String,
    data: Array
  }
})
export default class bookList extends Vue {
  handleClick (item:any) {
    this.$emit('event-change', item.id, item.name, item.href)
  }
}
</script>

<style scoped>
  .book-ul{
    list-style: none;
    position: absolute;
    font-size: 10px;
    color: #eec25e;
    overflow: hidden;
  }
  .book-ul .book{
    overflow: hidden;
    font-weight: bold;
    float: left;
    cursor: pointer;
    transition: margin-top .1s linear;
    background-repeat: no-repeat;
    position: relative;
    top:0px;
  }
  .book-ul .book .name{
    writing-mode: vertical-rl;
    letter-spacing:1px;
    margin-top: 1px;
    display: inline-block;
  }
  .book-ul .book:hover{
    margin-top: 6px;
  }
  .row1-column1 .book{
    margin-top: 9px;
    background-image: url("../../../assets/book_row1_column1.png");
  }
  .row1-column2 .book{
    color: white;
    line-height: 14px;
    margin-top: 9px;
    background-image: url("../../../assets/book_row1_column2.png");
  }
  .row2-column1 .book{
    padding: 8px 7px;
    text-align: center;
    color: #fbeb17;
    line-height: 14px;
    margin-top: 3px;
    background-image: url("../../../assets/book_row2_column1.png");
  }
  .row2-column1 .book:hover{
    margin-top: 0px;
  }
  .row2-column2 .book{
    text-align: center;
    color: #9a8566;
    margin-top: 3px;
    line-height: 14px;
    background-image: url("../../../assets/book_row2_column2.png");
  }
  .row2-column2 .book:hover{
    margin-top: 0px;
  }
  .row3-column1 .book{
    text-align: center;
    color: #8c4414;
    margin-top: 3px;
    line-height: 14px;
    background-image: url("../../../assets/book_row3_column1.png");
  }
  .row3-column1 .book:hover{
    margin-top: 0px;
  }
  .row3-column2 .book{
    text-align: center;
    color: #000;
    margin-top: 3px;
    line-height: 14px;
    background-image: url("../../../assets/book_row3_column2.png");
  }
  .row3-column2 .book:hover{
    margin-top: 0px;
  }
  .row4-column1 .book{
    text-align: center;
    color: #c99a85;
    margin-top: 3px;
    line-height: 12px;
    background-image: url("../../../assets/book_row4_column1.png");
  }
  .row4-column1 .book:hover{
    margin-top: 0px;
  }
  .row4-column2 .book{
    text-align: center;
    color: #c99a85;
    margin-top: 3px;
    line-height: 12px;
    background-image: url("../../../assets/book_row4_column1.png");
  }
  .row4-column2 .book:hover{
    margin-top: 0px;
  }
  .row5-column1 .book{
    text-align: center;
    color: #c99a85;
    margin-top: 3px;
    line-height: 12px;
    background-image: url("../../../assets/book_row5_column1.png");
  }
  .row5-column1 .book:hover{
    margin-top: 0px;
  }
  .row5-column2 .book{
    text-align: center;
    color: #c99a85;
    margin-top: 3px;
    line-height: 12px;
    background-image: url("../../../assets/book_row5_column1.png");
  }
  .row5-column2 .book:hover{
    margin-top: 0px;
  }
  .row6-column1 .book{
    text-align: center;
    color: #aa7763;
    margin-top: 3px;
    line-height: 12px;
    background-image: url("../../../assets/book_row6_column1.png");
  }
  .row6-column1 .book:hover{
    margin-top: 0px;
  }
  .row6-column2 .book{
    text-align: center;
    color: #aa7763;
    margin-top: 3px;
    line-height: 12px;
    background-image: url("../../../assets/book_row6_column1.png");
  }
  .row6-column2 .book:hover{
    margin-top: 0px;
  }
</style>
