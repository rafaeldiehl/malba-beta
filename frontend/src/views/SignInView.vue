<template>
  <div id="sign-in">
    <header>
      <h1>Entrar</h1>
      <p>Autentique-se antes de acessar o sistema.</p>
    </header>
    <form @change="checkInputs" @submit.prevent="sendCredentials">
      <form-input
        type="email"
        label="e-mail"
        name="email"
        placeholder="Informe seu e-mail"
        v-model="credentials.email"
        required
      />
      <form-input
        type="password"
        label="senha"
        name="password"
        placeholder="Informe sua senha"
        v-model="credentials.password"
        required
      />
      <div class="error-message" v-if="axiosError">
        Credenciais inválidas. Redigite os campos e tente novamente!
      </div>
      <form-button :buttonDisabled="disabled">Entrar</form-button>
    </form>
    <div class="shortcuts">
      <p class="shortcut-link">
        Não tem uma conta? <router-link to="/register">Criar conta</router-link>
      </p>
      <p class="shortcut-link mt-1">
        <router-link to="/reset-password">Esqueci minha senha</router-link>
      </p>
    </div>
    <button class="return-button">
      <router-link to="/">
        <span class="material-symbols-outlined">
          arrow_back
        </span>
      </router-link>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import FormInput from '@/components/Form/FormInput.vue';
import FormButton from '@/components/Form/FormButton.vue';

import store from '@/store';

export default {
  name: 'SignInView',
  components: {
    FormInput,
    FormButton
  },
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      },
      disabled: true,
      axiosError: false
    }
  },
  methods: {
    sendCredentials() {
      const user = {
        email: this.credentials.email,
        password: this.credentials.password,
      }

      store
        .dispatch('login', user)
        .then(() => {
          this.$router.push({name: "dashboard"});
        })
        .catch((err) => {
          console.log(err);
          this.axiosError = true;
        });
    },
     checkInputs() {
      // Verifica se os inputs estão preenchidos
      let credentialsValues = Object.values(this.credentials);
      let isEmpty = false;
      
      credentialsValues.forEach(credential => {
        if(credential == '') {
          isEmpty = true;
        }
      })
      
      isEmpty ? this.disabled = true : this.disabled = false;
    }
  }
}
</script>

<style scoped lang="scss">
#sign-in {
  @apply flex flex-col items-center justify-center text-center min-h-screen p-14;
}

form {
  @apply my-2 flex flex-col w-[500px];

  @media (max-width: 550px) {
    @apply w-[90vw];
  }
}

header {
  h1 {
    @apply text-black text-[40px] font-medium;
  }
}

.return-button span {
  @apply absolute top-4 left-4 p-2 rounded transition text-black;

  &:hover {
    @apply bg-zinc-200;
  }
}

.shortcuts {
  @apply text-black;

  a {
    @apply text-sky-500 underline underline-offset-1;

    &:hover {
      @apply text-sky-600;
    }
  }
}

.error-message {
  @apply w-full text-red-500 text-center text-sm mt-2;
}
</style>
