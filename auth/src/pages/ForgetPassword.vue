<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import SignInImage from "/SignInImage_2.jpg";
// import { useFirebaseAuth } from "vuefire";
// import { sendPasswordResetEmail } from "firebase/auth";

// const auth = useFirebaseAuth()!;
const router = useRouter();
const $toast = useToast();
const emailRegex = /^[a-z0-9_\.]{1,32}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,}$/;

const inputRules: any = {
  emailRequired: (value: string) => !!value || "Email không được để trống",
  emailFormat: (value: string) => emailRegex.test(value) || "Định dạng email không hợp lệ"
};

const isLoading = ref(false);
const email = ref("");

const handleSendResetEmail = () => {
  isLoading.value = true;
  
  if (email.value !== "" && emailRegex.test(email.value)) {
    showToast("success", "Vui lòng kiểm tra email để tiếp tục quá trình đặt lại mật khẩu !");
    
    // sendPasswordResetEmail(auth, email.value)
    //   .then(() => {
    //
    //   })
    //   .catch((error) => {
    //     console.log(error.code);
    //   });
  }
  
  isLoading.value = false;
};

const showToast = (errorType: string, message = "") => {
  $toast.open({
    message: message,
    type: errorType,
    position: "bottom-right"
  });
};
</script>

<template>
<div class="flex h-screen">
    <div class="hidden lg:block w-2/5">
      <img :src="SignInImage" alt="WonderTripSignIn" class="object-cover w-full h-full">
    </div>

    <div class="w-full lg:w-3/5 flex flex-col items-center p-6">
      <div class="w-full flexbox-col my-10">
        <div class="flexbox-row">
          <p class="text-3xl mr-2 font-weight-bold">
            Quên mật khẩu của bạn ?
          </p>
          <v-icon icon="mdi-emoticon-cry" color="#FBD964" size="x-large"></v-icon>
        </div>
        <p class="text-md mt-2">
          Đừng lo ! Chúng tôi sẽ hướng dẫn các bạn đặt lại mật khẩu
        </p>
      </div>
      <div class="max-w-md w-full">
        <v-form @submit.prevent="handleSendResetEmail" class="mt-8">
          <v-text-field
            class="mb-4"
            type="email"
            :rules="[inputRules.emailRequired, inputRules.emailFormat]"
            label="Nhập địa chỉ Email đã đăng ký"
            v-model="email"
            variant="underlined">
          </v-text-field>
          
          <v-btn
            block
            rounded
            :loading="isLoading"
            size="large"
            class="mt-12 text-white"
            color="rgb(var(--primary-1))"
            type="submit">
            NHẬN THƯ QUA EMAIL
          </v-btn>
        </v-form>

        <v-btn
          rounded
          class="w-full mt-4"
          size="large"
          prepend-icon="mdi-arrow-left-thick"
          variant="outlined"
          color="rgb(var(--primary-1))"
          @click="router.push('/sign-in')">
          QUAY LẠI ĐĂNG NHẬP
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>