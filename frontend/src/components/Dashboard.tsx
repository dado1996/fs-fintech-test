"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DepositDialog } from "@/components/DepositDialog";
import { TransferDialog } from "@/components/TransferDialog";
import { WithdrawDialog } from "@/components/WithdrawDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { fetchDeposit } from "@/services/transactions";
import { useAccountStore } from "@/store/accountStore";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const router = useRouter();
  const { email, balance, setBalance } = useAccountStore();

  const handleDeposit = async (amount: number) => {
    try {
      const result = await fetchDeposit(email, amount);
      if (result.status !== 200) {
        toast({
          title: "Error",
          description: "There was an error with the transaction",
        });
        return;
      }
      setBalance(result.data.data?.balance!);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error has occured",
      });
    } finally {
      setIsDepositOpen(false);
    }
  };

  const handleTransfer = (amount: number) => {
    if (balance >= amount) {
      // setBalance(balance - amount);
      setIsTransferOpen(false);
    } else {
      alert("Insufficient funds");
    }
  };

  const handleWithdraw = (amount: number) => {
    if (balance >= amount) {
      // setBalance(balance - amount);
      setIsWithdrawOpen(false);
    } else {
      alert("Insufficient funds");
    }
  };

  const handleLogout = () => {
    // In a real application, you would clear the session here.
    // For this example, we'll just redirect to the dashboard, simulating a logout.
    router.push("/"); // Replace '/' with the actual login page route.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-semibold text-center">${balance}</div>
        </CardContent>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => setIsDepositOpen(true)}>Deposit</Button>
          <Button onClick={() => setIsTransferOpen(true)}>Transfer</Button>
          <Button onClick={() => setIsWithdrawOpen(true)}>Withdraw</Button>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>

      <DepositDialog
        open={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onDeposit={handleDeposit}
      />
      <TransferDialog
        open={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        onTransfer={handleTransfer}
      />
      <WithdrawDialog
        open={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
};

export default Dashboard;
