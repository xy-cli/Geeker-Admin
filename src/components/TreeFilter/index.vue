<template>
  <div class="card filter">
    <div class="flex-top">
      <h4 v-if="title" class="title sle">
        {{ title }}
      </h4>
      <slot name="top" />
    </div>
    <div class="search">
      <el-input v-model="filterText" clearable placeholder="输入关键字进行过滤" />
      <el-dropdown trigger="click">
        <el-icon size="20">
          <More />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toggleTreeNodes(true)">展开全部</el-dropdown-item>
            <el-dropdown-item @click="toggleTreeNodes(false)">折叠全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
      <el-tree
        ref="treeRef"
        :check-on-click-node="multiple"
        :check-strictly="false"
        :draggable="draggable"
        :current-node-key="!multiple ? selected : ''"
        :data="multiple ? treeData : treeAllData"
        :default-checked-keys="multiple ? selected : []"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :highlight-current="!multiple"
        :node-key="id"
        :props="defaultProps"
        :show-checkbox="multiple"
        default-expand-all
        @check="handleCheckChange"
        @node-click="handleNodeClick"
        @node-drop="nodeCrop"
      >
        <template #default="scope">
          <div class="flex">
            <span class="el-tree-node__label">
              <slot :row="scope">
                {{ scope.node.label }}
              </slot>
            </span>
            <slot name="right" v-bind="scope" />
          </div>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeMount, nextTick, toRaw } from "vue";
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
  requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
  data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
  title?: string; // treeFilter 标题 ==> 非必传
  id?: string; // 选择的id ==> 非必传，默认为 “id”
  label?: string; // 显示的label ==> 非必传，默认为 “label”
  children?: string; // 子级名称
  multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
  defaultValue?: any; // 默认选中的值 ==> 非必传
  disabled?: boolean; // 是否禁用 ==> 非必传，默认为 false
  draggable?: boolean; // 是否可拖拽 ==> 非必传，默认为 false
}

const props = withDefaults(defineProps<TreeFilterProps>(), {
  id: "id",
  label: "label",
  children: "children",
  multiple: false,
  disabled: true
});

const defaultProps = {
  children: props.children,
  label: props.label
};

const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref();
const setSelected = () => {
  if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
  else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(async () => {
  setSelected();
  if (props.requestApi) {
    const { data } = await props.requestApi!();
    treeData.value = data;
    treeAllData.value = setDisabled([...data]);
  }
});
// 递归为treeAllData添加disabled状态
const setDisabled = (data: { [key: string]: any }[]) => {
  return data.map(item => {
    if (item.subMenuList) item.subMenuList = setDisabled(item.subMenuList);
    item.disabled = props.disabled;
    return item;
  });
};

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
  () => props.defaultValue,
  () => nextTick(() => setSelected()),
  { deep: true, immediate: true }
);

watch(
  () => props.data,
  () => {
    const data = props.data ?? [];
    treeData.value = data;
    treeAllData.value = [...data];
  },
  { deep: true, immediate: true }
);

const filterText = ref("");
watch(filterText, val => {
  treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
  if (!value) return true;
  let parentNode = node.parent,
    labels = [node.label],
    level = 1;
  while (level < node.level) {
    labels = [...labels, parentNode.label];
    parentNode = parentNode.parent;
    level++;
  }
  return labels.some(label => label.indexOf(value) !== -1);
};

// 切换树节点的展开或折叠状态
const toggleTreeNodes = (isExpand: boolean) => {
  let nodes = treeRef.value?.store.nodesMap;
  if (!nodes) return;
  for (const node in nodes) {
    if (nodes.hasOwnProperty(node)) {
      nodes[node].expanded = isExpand;
    }
  }
};

// emit
const emit = defineEmits<{
  change: [value: any];
  nodeCrop: [value: any];
}>();

const getFlatMenuList = (menuList: any) => {
  let newMenuList: Menu.MenuAll[] = structuredClone(toRaw(menuList));
  return newMenuList.flatMap(item => [item, ...(item.subMenuList ? getFlatMenuList(item.subMenuList) : [])]);
};

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
  if (props.multiple) return;
  emit("change", data[props.id]);
};

// 多选
const handleCheckChange = () => {
  const checkedKeys = structuredClone(treeRef.value?.getCheckedKeys());
  const treeFlatted = getFlatMenuList(treeAllData.value)
    .filter((item: any) => !item.subMenuList)
    .map((item: any) => item.id);
  emit(
    "change",
    checkedKeys?.filter(item => treeFlatted.includes(item))
  );
};

const nodeCrop = () => {
  emit("nodeCrop", treeAllData.value);
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef });
</script>

<style lang="scss" scoped>
@import "./index";
</style>
