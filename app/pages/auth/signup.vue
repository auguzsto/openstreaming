<template>
    <div class="h-full flex justify-center items-center">
        <div class="border p-4">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Usuário" name="username">
                    <UInput v-model="state.username" />
                </UFormField>

                <UFormField label="Senha" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormField>

                <UFormField label="E-mail" name="email">
                    <UInput v-model="state.email" type="email" />
                </UFormField>

                <UButton type="submit">
                    Acessar
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

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
async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { status, error } = await useFetch("/api/public/auth/signup", {
        method: "POST",
        body: event.data
    })

    if (status.value == "error") {
        toast.add({ title: 'Falha', description: error.value?.data.message, color: 'error' })
        return;
    }
    
    toast.add({ title: 'Sucesso', description: "Sua conta foi registrada", color: 'success' })
}
</script>