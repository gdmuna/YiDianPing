<template>
    <a-table :data="currentTableData" :pagination="false" :bordered="{ cell: true }" style="height: 100%" :scroll="{ x: 2000 }">
        <template #columns>
            <a-table-column title="评论体" data-index="cb_title" fixed="left" width="300"></a-table-column>
            <a-table-column title="评分" data-index="score" width="80"></a-table-column>
            <a-table-column title="配图" width="100">
                <template #cell="{ record }">
                    <a-button size="mini" status="warning" type="text" @click="imgComment(record)">查看</a-button>
                </template>
            </a-table-column>
            <a-table-column title="创建时间" data-index="created_at" width="240"></a-table-column>
            <a-table-column title="内容" data-index="cb_text" width="10000"></a-table-column>
            <a-table-column title="操作" width="130" fixed="right">
                <template #cell="{ record }">
                    <a-popconfirm content="是否要暂时删除?" ok-text="是" cancel-text="否" @ok="deleteComment(record)">
                        <a-button v-if="record.is_enabled === 0" size="mini" status="danger" type="text">删除</a-button>
                    </a-popconfirm>
                    <a-popconfirm content="是否要恢复此评论体?" ok-text="是" cancel-text="否" @ok="recoverComment(record)">
                        <a-button v-if="record.is_enabled === 1" size="mini" status="success" type="text">恢复</a-button>
                    </a-popconfirm>
                    <a-button size="mini" status="danger" type="text" @click="editComment(record)">修改</a-button>
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
    <!-- 查看配图模态框 -->
    <a-modal v-model:visible="visibleImg" title="查看配图" @cancel="handleCancelImg">
        <div v-if="imgUrl">
            <img :src="imgUrl" alt="评论配图" style="width: 100%; height: auto" />
        </div>
        <div v-else>
            <p>暂无配图</p>
        </div>
    </a-modal>
    <!-- 修改评论体模态框 -->
    <a-modal v-model:visible="visibleEdit" title="修改评论体" @cancel="handleCancelEdit" @ok="handleOk">
        <a-form ref="form" :model="form">
            <a-form-item field="cb_title" label="评论体">
                <a-input v-model="form.cbTitle" />
            </a-form-item>
            <a-form-item label="内容" field="cb_text">
                <a-textarea v-model="form.cbText" placeholder="请输入内容" allow-clear />
            </a-form-item>
            <a-form-item label="配图" field="cb_img">
                <a-upload v-model:file-list="fileList" :before-upload="beforeUpload" :on-remove="removeFile">
                    <a-button>上传图片</a-button>
                </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>

    <div class="search-bar">
        <a-pagination :total="total" :page-size="pageSize" :current="currentPage" show-total show-jumper show-page-size @change="handlePageChange" @page-size-change="handlePageSizeChange" />
        <a-input v-model="searchQuery" placeholder="搜索评论体" style="width: 200px" @input="handleSearch" />
    </div>
</template>

<script>
import commentSubject from '../../api/commentSubject';

export default {
    name: 'CommentSubject',
    data() {
        return {
            tabledata: [],
            searchQuery: '',
            filteredData: [],
            visibleEdit: false,
            visibleImg: false,
            imgUrl: '',
            form: {
                comtSubjectId: '',
                userId: '',
                cbTitle: '',
                cbText: '',
                cbImg: ''
            },
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
            const response = await commentSubject.getCommentSubject();
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
        editComment(record) {
            this.form = {
                comtSubjectId: record.comt_subject_id,
                userId: record.user_id,
                cbTitle: record.cb_title,
                cbText: record.cb_text,
                cbImg: record.cb_img || ''
            };
            this.fileList = this.form.cbImg ? [{ url: this.form.cbImg }] : [];
            this.visibleEdit = true;
        },
        imgComment(record) {
            this.imgUrl = record.cb_img || '';
            this.visibleImg = true;
        },
        async handleOk() {
            if (!this.form.comtSubjectId || !this.form.userId) {
                this.$message.error('comt_subject_id和user_id不能为空');
                return;
            }

            if (this.fileList.length > 0) {
                const file = this.fileList[0];
                if (file.originFileObj) {
                    const formData = new FormData();
                    formData.append('file', file.originFileObj);
                    const response = await commentSubject.uploadImage(formData);
                    this.form.cbImg = response.url;
                }
            }

            try {
                await commentSubject.modifyCommentSubject(this.form);
                this.fetchData();
                this.visibleEdit = false;
            } catch (error) {
                this.$message.error('修改失败');
                console.error('修改失败:', error);
            }
        },
        handleCancelEdit() {
            this.visibleEdit = false;
        },
        handleCancelImg() {
            this.visibleImg = false;
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
                await commentSubject.deleteCommentSubject({ comtSubjectId: record.comt_subject_id });
                this.fetchData();
            } catch (error) {
                this.$message.error('删除失败');
                console.error('删除失败:', error);
            }
        },
        async recoverComment(record) {
            try {
                await commentSubject.recoverCommentSubject({ comtSubjectId: record.comt_subject_id });
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
