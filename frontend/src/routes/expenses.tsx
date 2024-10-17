import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api';
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/expenses')({
  component: Expenses
})

async function getAllExpenses() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await res.json();
  return data;
}
function Expenses() {
  const { isPending, data, error } = useQuery({ queryKey: ["expenses"], queryFn: getAllExpenses })

  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <>
      <Table className='max-w-3xl m-auto'>
        <TableCaption>Your list of expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Expense Name</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell ><Skeleton className="w-full h-4 " /></TableCell>
                  <TableCell ><Skeleton className="w-full h-4 " /></TableCell>
                  <TableCell ><Skeleton className="w-full h-4 " /></TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            data && data.expenses.map((expense: any) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell>${expense.amount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}