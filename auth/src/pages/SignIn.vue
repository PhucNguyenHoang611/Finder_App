<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import { RouterLink, useRouter } from "vue-router";
import SignInImage from "/SignInImage_2.jpg";
import { useFirebaseAuth, useCollection } from "vuefire";
import {
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { googleAuthProvider, usersRef } from "@/config/firebase";

const auth = useFirebaseAuth()!;
const router = useRouter();
const $toast = useToast();
const emailRegex = /^[a-z0-9_\.]{1,32}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,}$/;

const inputRules: any = {
  emailRequired: (value: string) => !!value || "Email is required",
  emailFormat: (value: string) => emailRegex.test(value) || "Invalid email format",
  passwordRequired: (value: string) => !!value || "Password is required"
};

const isLoading = ref(false);
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const errorMessage = ref("");

const usersCollection = useCollection(usersRef);

const handleSignIn = () => {
  isLoading.value = true;
  errorMessage.value = "";
  
  if (email.value !== "" && emailRegex.test(email.value) && password.value !== "") {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        if (userCredential.user.emailVerified) {
          console.log("Signed in user", userCredential);

          showToast("success", "Sign in successfully !");
          router.push("/");
        } else {
          console.log("Email isn't verified !");
          await sendEmailVerification(userCredential.user)
            .then(() => {
              showToast("error", "Please verify your email to continue. We have sent an email with a confirmation link to your email address !");
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        errorMessage.value = "Invalid credentials !";
      });
  }
  
  isLoading.value = false;
};

const handleSignInWithGoogle = () => {
  errorMessage.value = "";

  signInWithPopup(auth, googleAuthProvider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log("Token: ", token);

      try {
        if (!checkEmailIfExists(result.user.email)) {
          const docRef = await addDoc(usersRef, {
            id: result.user.uid,
            firstName: result.user.displayName,
            lastName: "",
            email: result.user.email,
            country: "Vietnam",
            provider: "Google"
          });
          
          console.log("User written with ID: ", docRef.id);
        }

        console.log("Signed in user: ", result.user);
        showToast("success", "Sign in successfully !");
        router.push("/");
      } catch (e) {
        console.error("Error adding user: ", e)
      }
    })
    .catch((error) => {
      console.log(error.message);
      // const email = error.customData.email;
      // console.log("Email: ", email);
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log("Credential: ", credential);
    });
};

const checkEmailIfExists = (email: string | null) => {
  const user = usersCollection.value.find((user: any) => user.email === email);

  if (user)
    return true;
  return false;
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

    <div class="w-full lg:w-3/5 flexbox-col p-6">
      <div class="w-full flexbox-col mb-10">
        <div class="flexbox-row">
          <p class="text-3xl mr-2 font-weight-bold">
            Welcome back, Travelers
          </p>
          <v-icon icon="mdi-hand-wave" color="#FBD964" size="x-large"></v-icon>
        </div>
        <p class="text-md mt-2">
          Enter login details or continue with Google
        </p>
      </div>
      <div class="max-w-md w-full">
        <v-form @submit.prevent="handleSignIn" class="mt-8">
          <v-text-field
            class="mb-4"
            type="email"
            :rules="[inputRules.emailRequired, inputRules.emailFormat]"
            label="Email Address"
            v-model="email"
            variant="underlined">
          </v-text-field>

          <v-text-field
            :rules="[inputRules.passwordRequired]"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            label="Password"
            variant="underlined">
          </v-text-field>

          <p class="font-weight-medium text-red-700 mb-2">
            {{ errorMessage }}
          </p>
          
          <div class="flex justify-between items-center">
            <div class="flexbox-row">
              <v-checkbox-btn
                color="rgb(var(--primary-1))"
                v-model="rememberMe">
              </v-checkbox-btn>
              <p class="text-sm">Remember me</p>
            </div>
            <RouterLink to="/forget-password">
              <div class="text-decoration-underline text-primary-1 text-sm font-bold">
                Forget your password ?
              </div>
            </RouterLink>
          </div>
          
          <v-btn
            block
            rounded
            :loading="isLoading"
            size="large"
            class="mt-12 text-white"
            color="rgb(var(--primary-1))"
            type="submit">
            SIGN IN
          </v-btn>
        </v-form>

        <div class="flexbox-row mt-2">
          <p class="mr-2 text-sm">
            Don't have an account yet ?
          </p>
          <RouterLink to="/sign-up">
            <p class="font-weight-bold text-primary-1 text-sm">
              Sign up now
            </p>
          </RouterLink>
        </div>

        <div class="flexbox-row my-10">
          <v-divider :thickness="2" class="border-opacity-75"></v-divider>
          <p class="mx-2 text-gray-400">or</p>
          <v-divider :thickness="2" class="border-opacity-75"></v-divider>
        </div>

        <div class="flexbox-row">
          <v-btn
            rounded
            class="text-none w-full"
            size="large"
            prepend-icon="mdi-google"
            variant="outlined"
            @click="handleSignInWithGoogle">
            Continue with Google
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>