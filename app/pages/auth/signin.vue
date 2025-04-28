<template>
    <div class="h-full flex justify-center items-center">
        <div class="border p-4">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="signInStore.onSubmit">
                <UFormField label="Usuário" name="username">
                    <UInput v-model="state.username" />
                </UFormField>

                <UFormField label="Senha" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormField>

                <UButton type="submit" :loading="isLoading">
                    Acessar
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import { useSignInStore } from '~/store/signin'

const toast = useToast()
const schema = z.object({
    username: z.string().nonempty("Obrigatório"),
    password: z.string().min(6, 'Deve conter 6 caracteres')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    username: undefined,
    password: undefined
})

const signInStore = useSignInStore()
const { isLoading, status, message } = storeToRefs(signInStore);

watch(status, (status, _) => {
    if (status == "error") {
        toast.add({ title: 'Falha', description: `${message.value}`, color: status })
    }

    if (status == "success") {
        navigateTo("/dashboard", {
            external: true
        })
    }

    useResetState(signInStore);
})
</script>