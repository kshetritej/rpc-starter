import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api";

export const Route = createFileRoute('/')({
  component: Index,
})

async function fetchTotalExpense() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await res.json();
  return data;
}
function Index() {

  const { data, isPending, error } = useQuery({ queryKey: ["total-spent"], queryFn: fetchTotalExpense })
  if (error) { return <div>Error: {error.message}</div> }

  return <div className="max-w-3xl m-auto p-8">
    <Card>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription> Your total expenses. </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? <Skeleton className="w-full h-4" /> : '$' + data.totalSpent}
      </CardContent>
    </Card>
  </div>;
};
