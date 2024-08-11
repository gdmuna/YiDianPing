<template>
    <div class="flex flex-col h-full">
        <a-table :data="currentTableData" :pagination="false" :bordered="{ cell: true }" class="h-full" :scroll="{ x: 2000 }">
            <template #columns>
                <!-- 表头 -->
                <a-table-column title="评论体" data-index="cb_title" fixed="left" width="250"></a-table-column>
                <a-table-column title="用户昵称" data-index="nickname" width="150"></a-table-column>
                <a-table-column title="点赞" data-index="thumbs_up" width="80"></a-table-column>
                <a-table-column title="创建时间" data-index="created_at" width="240"></a-table-column>
                <a-table-column title="内容" data-index="text" width="10000"></a-table-column>
                <!-- 操作弹窗 -->
                <a-table-column title="操作" width="100" fixed="right">
                    <template #cell="{ record }">
                        <a-popconfirm content="是否要暂时删除?" ok-text="是" cancel-text="否" @ok="deleteComment(record)">
                            <a-button v-if="record.is_enabled === 0" size="mini" status="danger" type="text">删除</a-button>
                        </a-popconfirm>
                        <a-popconfirm content="是否要恢复此评论?" ok-text="是" cancel-text="否" @ok="recoverComment(record)">
                            <a-button v-if="record.is_enabled === 1" size="mini" status="success" type="text">恢复</a-button>
                        </a-popconfirm>
                    </template>
                </a-table-column>
                <!-- 状态弹窗 -->
                <a-table-column title="状态" width="120" data-index="is_enabled" fixed="right">
                    <template #cell="{ record }">
                        <a-button v-if="record.is_enabled === 0" status="success" size="mini" type="outline">正常</a-button>
                        <a-button v-if="record.is_enabled !== 0" status="danger" size="mini" type="outline">删除</a-button>
                    </template>
                </a-table-column>
            </template>
        </a-table>
        <!--使用Tailwind CSS  -->
        <div class="flex justify-between items-center mb-2 p-2">
            <!-- 分页条 -->
            <a-pagination :total="total" :page-size="pageSize" :current="currentPage" show-total show-jumper show-page-size @change="handlePageChange" @page-size-change="handlePageSizeChange" />
            <!-- 搜索框 -->
            <a-input v-model="searchQuery" placeholder="搜索评论" class="ml-auto" style="width: 200px" @input="handleSearch" />
        </div>
    </div>
</template>

<script>
//api
import comment from '@/api/comment';

export default {
    name: 'CommentGl',
    data() {
        return {
            tabledata: [],
            searchQuery: '',
            filteredData: [],
            currentPage: 1,
            pageSize: 10
        };
    },
    computed: {
        //帮助实现数据的分页和显示
        total() {
            return this.filteredData.length;
        },
        currentTableData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredData.slice(start, end);
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        //表格信息获取
        async fetchData() {
            const response = await comment.getComment();
            this.tabledata = response;
            this.filteredData = response;
            console.log('表格数据:', this.tabledata);
        },
        //表格搜索
        handleSearch() {
            if (this.searchQuery) {
                this.filteredData = this.tabledata.filter((item) => item.cb_title.includes(this.searchQuery));
            } else {
                this.filteredData = this.tabledata;
            }
        },
        //分页功能
        handlePageChange(page) {
            this.currentPage = page;
        },
        handlePageSizeChange(pageSize) {
            this.pageSize = pageSize;
        },
        //删除功能
        async deleteComment(record) {
            await comment.deleteComment({ comtSubjectId: record.comt_subject_id, commentId: record.comment_id });
            //重新获取数据
            this.fetchData();
        },
        //恢复功能
        async recoverComment(record) {
            await comment.recoverComment({ comtSubjectId: record.comt_subject_id, commentId: record.comment_id });
            this.fetchData();
        }
    }
};
</script>

<style scoped>
/* Tailwind CSS 已经处理了大多数样式，不需要自定义 CSS */
</style>
