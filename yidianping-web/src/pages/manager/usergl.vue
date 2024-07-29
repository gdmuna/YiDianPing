<template>
    <a-table :data="currentTableData" :pagination="false" :bordered="{ cell: true }" style="height: 100%" :scroll="{ x: 2000 }" size="large">
        <template #columns>
            <a-table-column title="账号" data-index="account" fixed="left" width="150"></a-table-column>
            <a-table-column title="昵称" data-index="nickname" width="150"></a-table-column>
            <a-table-column title="头像" width="50">
                <template #cell="{ record }">
                    <a-button size="mini" status="warning" type="text" @click="imgUser(record)">查看</a-button>
                </template>
            </a-table-column>
            <a-table-column title="创建时间" data-index="created_at" width="400"></a-table-column>
            <a-table-column title="操作" width="100" fixed="right">
                <template #cell="{ record }">
                    <a-popconfirm content="是否要暂时删除?" ok-text="是" cancel-text="否" @ok="banUser(record)">
                        <a-button v-if="record.is_forbidden === 0" size="mini" status="danger" type="text">封禁</a-button>
                    </a-popconfirm>
                    <a-popconfirm content="是否要恢复此用户?" ok-text="是" cancel-text="否" @ok="unbanUser(record)">
                        <a-button v-if="record.is_forbidden === 1" size="mini" status="success" type="text">恢复</a-button>
                    </a-popconfirm>
                    <a-button size="mini" status="danger" type="text" @click="editUser(record)">修改</a-button>
                    <a-button size="mini" status="warning" type="text" @click="setUp(record)">设置</a-button>
                </template>
            </a-table-column>
            <a-table-column title="状态" width="50" data-index="is_forbidden" fixed="right">
                <template #cell="{ record }">
                    <a-button v-if="record.is_forbidden === 0" status="success" size="mini" type="outline">正常</a-button>
                    <a-button v-if="record.is_forbidden !== 0" status="danger" size="mini" type="outline">封禁</a-button>
                </template>
            </a-table-column>
        </template>
    </a-table>
    <!-- 查看配图模态框 -->
    <a-modal v-model:visible="visibleImg" title="查看配图" @cancel="handleCancelImg">
        <div v-if="imgUrl">
            <img :src="imgUrl" alt="用户头像" style="width: 100%; height: auto" />
        </div>
        <div v-else>
            <p>暂无配图</p>
        </div>
    </a-modal>
    <!-- 设置管理员 -->
    <a-modal v-model:visible="visibleSetUp" title="设置管理员" @cancel="handleCancelSetUp" @ok="handleOkSetUp">
        <a-select v-model="adminStatus" :style="{ width: '400px' }" placeholder="选择" allow-clear>
            <a-option value="普通用户">普通用户</a-option>
            <a-option value="用户信息管理员">用户信息管理员</a-option>
            <a-option value="评论体信息管理员">评论体信息管理员</a-option>
            <a-option value="评论与提问信息管理员">评论与提问信息管理员</a-option>
        </a-select>
    </a-modal>
    <!-- 修改用户信息模态框 -->
    <a-modal v-model:visible="visibleEdit" title="修改用户信息" @cancel="handleCancelEdit" @ok="handleOk">
        <a-form ref="form" :model="form">
            <a-form-item label="昵称" field="nickname">
                <a-input v-model="form.nickname" />
            </a-form-item>
            <a-form-item label="密码" field="password">
                <a-input v-model="form.password" type="password" />
            </a-form-item>
            <a-form-item label="手机号" field="phone">
                <a-input v-model="form.phone" type="phone" />
            </a-form-item>
            <a-form-item label="邮箱" field="email">
                <a-input v-model="form.email" type="email" />
            </a-form-item>
            <a-form-item label="学号" field="stuId">
                <a-input v-model="form.stuId" type="stuId" />
            </a-form-item>
            <a-form-item label="头像" field="avatar">
                <a-upload v-model:file-list="fileList" :before-upload="beforeUpload" :on-remove="removeFile">
                    <a-button>上传图片</a-button>
                </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>

    <div class="search-bar">
        <a-pagination :total="total" :page-size="pageSize" :current="currentPage" show-total show-jumper show-page-size @change="handlePageChange" @page-size-change="handlePageSizeChange" />
        <a-input v-model="searchQuery" placeholder="搜索用户" style="width: 200px" @input="handleSearch" />
    </div>
</template>

<script>
import user from '../../api/user';

export default {
    name: 'USER',
    data() {
        return {
            tabledata: [],
            searchQuery: '',
            filteredData: [],
            visibleEdit: false,
            visibleImg: false,
            visibleSetUp: false,
            imgUrl: '',
            form: {
                userId: '',
                account: '',
                avatar: '',
                nickname: '',
                password: '',
                stuId: '',
                email: '',
                phone: ''
            },
            fileList: [],
            currentPage: 1,
            pageSize: 10,
            adminStatus: '普通用户'
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
            const response = await user.getUserInfo();
            this.tabledata = response;
            this.filteredData = response;
            console.log('表格数据:', this.tabledata);
        },
        handleSearch() {
            if (this.searchQuery) {
                this.filteredData = this.tabledata.filter((item) => item.nickname.includes(this.searchQuery));
            } else {
                this.filteredData = this.tabledata;
            }
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        handlePageSizeChange(pageSize) {
            this.pageSize = pageSize;
        },
        editUser(record) {
            this.form = {
                userId: record.user_id,
                account: record.account,
                avatar: record.avatar,
                nickname: record.nickname,
                password: record.password,
                stuId: record.stu_id,
                email: record.email,
                phone: record.phone
            };
            this.fileList = this.form.avatar ? [{ url: this.form.avatar }] : [];
            this.visibleEdit = true;
        },
        imgUser(record) {
            this.imgUrl = record.avatar || '';
            this.visibleImg = true;
        },
        setUp(record) {
            this.adminStatus = '普通用户'; // 默认值
            this.visibleSetUp = true;
        },
        async handleOkSetUp() {
            if (!this.adminStatus) {
                this.$message.error('管理员状态不能为空');
                return;
            }

            try {
                await user.updateAdminStatus({ userId: this.form.userId, adminStatus: this.adminStatus });
                this.fetchData();
                this.visibleSetUp = false;
            } catch (error) {
                this.$message.error('设置失败');
                console.error('设置失败:', error);
            }
        },
        handleCancelSetUp() {
            this.visibleSetUp = false;
        },
        async handleOk() {
            if (!this.form.userId) {
                this.$message.error('userId不能为空');
                return;
            }

            if (this.fileList.length > 0) {
                const file = this.fileList[0];
                if (file.originFileObj) {
                    const formData = new FormData();
                    formData.append('file', file.originFileObj);
                    const response = await user.uploadImage(formData);
                    this.form.avatar = response.url;
                }
            }

            try {
                await user.updateUser(this.form);
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
        async banUser(record) {
            try {
                await user.banUser({ userId: record.user_id });
                this.fetchData();
            } catch (error) {
                this.$message.error('封禁失败');
                console.error('封禁失败:', error);
            }
        },
        async unbanUser(record) {
            try {
                await user.unbanUser({ userId: record.user_id });
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
    padding: 10px;
    justify-content: space-between;
}
</style>
