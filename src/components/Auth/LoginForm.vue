<template>
  <div class="login-form">
    <n-h3 class="login-form__title" prefix="bar" type="success">
      <n-gradient-text :size="36" type="success"> Авторизация </n-gradient-text>
    </n-h3>
    <n-form ref="formRef" class="login-form__form" :rules="rules" :model="formData">
      <n-form-item path="city" label="Логин">
        <n-input v-model:value="formData.email" type="text" placeholder="Введите логин" />
      </n-form-item>

      <n-form-item path="place" label="Пароль">
        <n-input
          v-model:value="formData.password"
          type="password"
          show-password-on="mousedown"
          placeholder="Введите пароль"
        />
      </n-form-item>

      <div class="login-form__form_submit">
        <n-button attr-type="submit" type="info" secondary @click="validateForm()">
          Отправить
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { NInput, NForm, NFormItem, NGradientText, NH3, NButton, FormInst } from 'naive-ui';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useNotify } from '../../composables/useNotify';
import { useRouter } from 'vue-router';

const store = useStore();
const { notifyError } = useNotify();
const router = useRouter();

const formRef = ref<FormInst | null>(null);
const formData = reactive({
  email: '',
  password: '',
});

const rules = {
  email: { required: true, message: 'Введите логин', trigger: 'input' },
  password: { required: true, message: 'Введите пароль', trigger: ['input'] },
};

async function handleLogin() {
  try {
    await store.dispatch('auth/login', formData);
    router.push('/');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      notifyError(error);
    }
  }
}

const validateForm = async () => {
  try {
    await formRef.value?.validate();
    handleLogin();
  } catch (err) {
    return false;
  }
};
</script>

<style>
.login-form {
  width: 400px;
}

.login-form__title {
  width: 100%;
}

.login-form__form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.login-form__form_submit {
  display: flex;
  margin-left: auto;
}
</style>
