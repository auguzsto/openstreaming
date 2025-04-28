<template>
    <div class="h-full flex justify-center items-center">
        <div class="border p-4">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="signUpStore.onSubmit">
                <UFormField label="Usuário" name="username">
                    <UInput v-model="state.username" />
                </UFormField>

                <UFormField label="Senha" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormField>

                <UFormField label="E-mail" name="email">
                    <UInput v-model="state.email" type="email" />
                </UFormField>

                <UButton type="submit" :loading="isLoading">
                    Criar conta
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import { useSignUpStore } from '~/store/signup'

const signUpStore = useSignUpStore()
const { status, isLoading, message } = storeToRefs(signUpStore)
const schema = z.object({
    username: z.string().nonempty("Obrigatório"),
    password: z.string().min(6, 'Deve conter 6 caracteres'),
    email: z.string().email("E-mail inválido")
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    username: undefined,
    password: undefined,
    email: undefined,
})

const toast = useToast()
watch(status, (status, _) => {
    if (status == "error") {
        toast.add({ title: 'Falha', description: `${message.value}`, color: status })
    }
    
    if (status == "success") {
        toast.add({ title: 'Sucesso', description: `${message.value}`, color: status })
        useResetState(signUpStore);
        navigateTo("/auth/signin")
    }
})
</script>