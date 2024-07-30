<template>
    <a-table :data="currentTableData" :pagination="false" :bordered="{ cell: true }" style="height: 100%" :scroll="{ x: 2000 }">
        <template #columns>
            <a-table-column title="评论体" data-index="cb_title" fixed="left" width="250"></a-table-column>
            <a-table-column title="用户昵称" data-index="nickname" width="150"></a-table-column>
            <a-table-column title="点赞" data-index="thumbs_up" width="80"></a-table-column>
            <a-table-column title="创建时间" data-index="created_at" width="240"></a-table-column>
            <a-table-column title="内容" data-index="text" width="10000"></a-table-column>
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
            <a-table-column title="状态" width="120" data-index="is_enabled" fixed="right">
                <template #cell="{ record }">
                    <a-button v-if="record.is_enabled === 0" status="success" size="mini" type="outline">正常</a-button>
                    <a-button v-if="record.is_enabled !== 0" status="danger" size="mini" type="outline">删除</a-button>
                </template>
            </a-table-column>
        </template>
    </a-table>
    <div class="search-bar">
        <a-pagination :total="total" :page-size="pageSize" :current="currentPage" show-total show-jumper show-page-size @change="handlePageChange" @page-size-change="handlePageSizeChange" />
        <a-input v-model="searchQuery" placeholder="搜索评论" style="width: 200px" @input="handleSearch" />
    </div>
</template>

<script>
import comment from '../../api/comment';

export default {
    name: 'CommentGl',
    data() {
        return {
            tabledata: [],
            searchQuery: '',
            filteredData: [],
            visibleEdit: false,
            visibleImg: false,
            fileList: [],
            currentPage: 1,
            pageSize: 10
        };
    },
    computed: {
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
        async fetchData() {
            const response = await comment.getComment();
            this.tabledata = response;
            this.filteredData = response;
            this.pagination.total = response.length;
            console.log('表格数据:', this.tabledata);
        },
        handleSearch() {
            if (this.searchQuery) {
                this.filteredData = this.tabledata.filter((item) => item.cb_title.includes(this.searchQuery));
            } else {
                this.filteredData = this.tabledata;
            }
            this.pagination.total = this.filteredData.length;
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        handlePageSizeChange(pageSize) {
            this.pageSize = pageSize;
        },
        beforeUpload(file) {
            this.fileList = [file];
            return false;
        },
        removeFile() {
            this.fileList = [];
        },
        async deleteComment(record) {
            try {
                await comment.deleteComment({ comtSubjectId: record.comt_subject_id, commentId: record.comment_id });
                this.fetchData();
            } catch (error) {
                this.$message.error('删除失败');
                console.error('删除失败:', error);
            }
        },
        async recoverComment(record) {
            try {
                await comment.recoverComment({ comtSubjectId: record.comt_subject_id, commentId: record.comment_id });
                this.fetchData();
            } catch (error) {
                this.$message.error('恢复失败');
                console.error('恢复失败:', error);
            }
        }
    }
};
</script>

<style scoped>
.search-bar {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
}
</style>
