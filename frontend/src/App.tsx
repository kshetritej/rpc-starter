import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
export const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);
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
