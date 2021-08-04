<template>
    <div class="user-wrapper">
        <div class="content-box">
            <notice-icon class="action"></notice-icon>
            <el-dropdown>
                <span class="action" id="domPersonal" style="height: 60px">
                    <!-- 头像 -->
                    <el-avatar
                        :src="avatar()"
                        class="avatar"
                        size="small"
                    ></el-avatar>
                    <span>{{ nickname() }}</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <router-link :to="{ name: 'center' }">
                            <span>
                                <i class="el-icon-user"></i>&nbsp;
                                <span>个人中心</span>
                            </span>
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span>
                            <i class="el-icon-set-up"></i>&nbsp;
                            <span>主题色</span>
                            <theme-picker
                                style="float: right;height: 26px;margin: 5px 8px 0 10px;"
                                @change="themeChange"
                            />
                        </span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link :to="{ name: 'center' }">
                            <span>
                                <i class="el-icon-setting"></i>&nbsp;
                                <span>账户设置</span>
                            </span>
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <!-- <a href="javascript:;" @click="handleLogout">
              <span>
                <i class="el-icon-switch-button"></i>
                <span>退出登录</span>
              </span>
            </a>-->
                        <el-button
                            icon="el-icon-switch-button"
                            @click="handleLogout"
                            type="text"
                            >退出登录</el-button
                        >
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <lang-select></lang-select>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import NoticeIcon from '@/components/NoticeIcon';
import ThemePicker from '@/components/ThemePicker/index';
import LangSelect from './LangSelect.vue';
export default {
    name: 'UserMenu',
    components: { NoticeIcon, LangSelect, ThemePicker },
    methods: {
        ...mapActions(['Logout']),
        ...mapGetters(['nickname', 'avatar']),

        handleLogout() {
            const that = this;

            this.$confirm('真的要注销登录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    return that.Logout({}).then(() => {
                        window.location.reload();
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        themeChange(val) {
            this.$store.dispatch('changeSetting', {
                key: 'theme',
                value: val,
            });
        },
    },
    mounted() {},
};
</script>
<style lang="less" scoped>
.user-wrapper {
    float: right;
    height: 100%;

    .content-box {
        float: right;

        .action {
            cursor: pointer;
            padding: 0 12px;
            display: inline-block;
            transition: all 0.3s;
            height: 100%;
            color: rgba(0, 0, 0, 0.65);

            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }

            .avatar {
                margin: 20px 8px 20px 0;
                color: #1890ff;
                background: hsla(0, 0%, 100%, 0.85);
                vertical-align: middle;
            }

            .icon {
                font-size: 16px;
                padding: 4px;
            }
        }
    }
}
</style>
