import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})


function CreateExpense() {

  const form = useForm({
    defaultValues: {
      name: '',
      amount: 0
    },
    onSubmit: async (values) => {
      console.log(values)
    }
  })
  return (
    <div className='p-8'>
      <h1>Create Expense</h1>
      <div className='max-w-3xl m-auto  flex items-center justify-center'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="flex flex-col w-full max-w-md gap-2">
          <form.Field name='name'
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Expense Name:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )} />

          <form.Field name='amount'
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Amount </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.isTouched &&  <div>{field.state.value}</div>}
              </>
            )} />
          <Button type="submit">Add Expense</Button>
        </form.Provider>
      </div>
    </div>
  );
}
