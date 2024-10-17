import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {api} from "@/lib/api";
export const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalExpense() {
      const res = await api.expenses["total-spent"].$get(); 
      const data = await res.json();
      setTotalSpent(data.totalSpent);
    }
    fetchTotalExpense();
  }, [])
  return <div className="max-w-3xl m-auto p-8">
    <Card>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription> Your total expenses. </CardDescription>
      </CardHeader>
      <CardContent>
        ${totalSpent}
      </CardContent>
    </Card>
  </div>;
};
