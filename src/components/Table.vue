<template>
    <div>
        <h1>Список</h1>

        <table>
            <tr>
                <th>Значение 1</th>
                <th>Значение 2</th>
                <th>Действия</th>
            </tr>
            <tr v-for="(user, index) in users" :key="index">
                <td>
                    <div v-if="user.isActive">
                        <input :class="{ 'error': !user.firstName }" type="text" name="firstName" v-model="user.firstName">
                    </div>
                    <div v-else>
                        <span>{{ user.firstName }}</span>
                    </div>   
                </td>
                <td>
                    <div v-if="user.isActive">
                        <input :class="{ 'error': !user.secondName }" type="text" name="secondName" v-model="user.secondName">
                    </div>
                    <div v-else>
                        <span>{{ user.secondName }}</span>
                    </div>  
                </td>
                <td>
                    <div v-if="user.isActive">
                        <button class="btn btn-save" @click="save(index)" :disabled="isButtonDisabled(user)">Сохранить</button>
                    </div>
                    <div v-else>
                        <button class="btn" @click="edit(index)">Редактировать</button>
                    </div>  
                    <button class="btn btn-remove" @click="remove(index)">Удалить</button>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" name="firstName" placeholder="Введите значение" v-model="newUser.firstName">
                </td>
                <td>
                    <input type="text" name="secondName" placeholder="Введите значение" v-model="newUser.secondName">
                </td>
                <td>
                    <button class="btn" @click="add" :disabled="isButtonDisabled(newUser)">Добавить</button>
                </td>
            </tr>
            
        </table>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Table',

    data() {
        return {
            newUser: {
                firstName: null,
                secondName: null
            },
        };
    },

    computed: {
        ...mapGetters({
            users: 'getUsers'
        }),
    },

    mounted() {
        this.$store.dispatch('getUsers');
    },

    methods: {
        clear() {
           this.newUser.firstName = null;
           this.newUser.secondName = null;
        },

        add: function() {
            this.$store.dispatch('addUser', this.newUser)
            .then(() => {
                this.clear();
            })
        },

        edit: function (index) {
            this.users[index].isActive = true;
        },

        save: function(index) {
            let user = this.users[index];
            this.$store.dispatch('updateUser', user)
            .then(() => {
                this.users[index].isActive = false;
            })
        },

        remove: function(index) {
            let user = this.users[index];
            this.$store.dispatch('removeUser', user);
        },

        isButtonDisabled(user) {
            return !(user.firstName && user.secondName);
        }
    }
}
</script>

<style scoped>
    table {
        margin: auto;
        border-collapse: collapse;
        border: 2px solid grey;
    }
    th, td {
        padding: 20px;
        border: 1px solid grey;
        text-align: left;
        color: #2c3e50;
        font-size: 16px;
    }
    input {
        max-width: 100%;
        height: 30px;
        border: 1px solid #2c3e50;
        color: #2c3e50;
        font-size: 16px;
    }
    input.error {
        border: 1px solid #fa0f0f;
    }
    .btn {
        display: block;
        width: 100%;
        height: 30px;
        margin: 5px;
        padding: 5px;
        color: white;
        background-color: #2c3e50;
        border: 1px solid #2c3e50;
        cursor: pointer;
    }
    .btn:disabled {
        background-color: grey;
        border: 1px solid grey;
        cursor: none;
    }
    .btn-remove {
        background-color: #fa0f0f;
        border: 1px solid #fa0f0f;
    }
    .btn-save {
        background-color: #3705eb;
        border: 1px solid #3705eb;
    }
</style>
