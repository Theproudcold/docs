## 使用 `$attrs` 可以获取当前组件未被使用的属性。v-bind 绑定即可

```html
<template>
  <div class="my-input">
    <el-input
      ref="elInp"
      v-bind="$attrs">
      <template
        v-for="(_,name) in $slots"
        #[name]="scopedData">
        <slot
          :name="name"
          v-bind="scopedData"></slot>
      </template>
    </el-input>
  </div>
</template>
```

## 获取列表内某个元素某个属性

```javascript
 getProductItem(id, name) {
    let filter = this.productList.filter((item) => {
      return id === item.id;
    });
    let { [name]: res } = filter[0]; // 假设 filter 不为空，取第一个元素进行解构
    return res;
},
```
