import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, Transactiontype, TransactionTypeButton } from "./styles";
import { X, ArrowCircleUp,ArrowCircleDown } from 'phosphor-react'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

const NewTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type newTransactionFormInput = z.infer<typeof NewTransactionFormSchema>;

export function NewTransactionModal(){
    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<newTransactionFormInput>({
        resolver: zodResolver(NewTransactionFormSchema),
        defaultValues: {
            type: 'income',
        }
    })

    async function handleCreateNewTransactions(data: newTransactionFormInput){
        await new Promise(resolver => setTimeout(resolver, 2000))
    }
    return (
    <Dialog.Portal>
        <Overlay />
        <Content>
            <Dialog.Title>Nova transação</Dialog.Title>
            <CloseButton>
                <X size={24} />
            </CloseButton>
            <form action="" onSubmit={handleSubmit(handleCreateNewTransactions)}>
                <input 
                    type="text"
                    placeholder="Descrição"
                    required
                    {...register('description')}
                />
                <input 
                    type="number"
                     placeholder="Preço"
                    required
                    {...register('price', { valueAsNumber: true })}
                />
                <input 
                    type="text"
                    placeholder="Categoria"
                    required
                    {...register('category')}
                />

                <Controller 
                    control={control}   
                    name="type"
                    render={({field})=> {
                        return(
                            <Transactiontype 
                                onValueChange={field.onChange} 
                                value={field.value}
                            >
                                <TransactionTypeButton variant="income" value="income">
                                    <ArrowCircleUp size={24} />
                                    Entrada
                                </TransactionTypeButton>
                                <TransactionTypeButton variant="outcome" value="outcome" >
                                    <ArrowCircleDown size={24} />
                                    Saida
                                </TransactionTypeButton>
                            </Transactiontype>
                        );
                    }}
                />

                <button type="submit" disabled={isSubmitting}>
                    Cadastrar
                </button>
            </form>
        </Content>
    </Dialog.Portal>
    );
}