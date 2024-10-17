import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
export const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetch("/api/expenses/total-spent")
      .then((res) => res.json())
      .then((data) => {
        setTotalSpent(data.totalSpent);
      });
  }, [])
  return <div>
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
