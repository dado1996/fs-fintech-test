
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"

interface WithdrawDialogProps {
  open: boolean;
  onClose: () => void;
  onWithdraw: (amount: number) => void;
}

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({ open, onClose, onWithdraw }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  const handleConfirmWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0 && bankAccount) {
      // In a real application, you would validate the bank account and initiate the withdrawal.
      onWithdraw(amount);
      setWithdrawAmount('');
      setBankAccount('');
    } else {
      alert('Please enter a valid amount and bank account number.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Withdraw Funds</AlertDialogTitle>
        <AlertDialogDescription>
          Enter the amount to withdraw and your bank account number.
        </AlertDialogDescription>
        <Input
          type="number"
          placeholder="Amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="mt-4"
        />
        <Input
          type="text"
          placeholder="Bank Account Number"
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          className="mt-4"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmWithdraw}>Withdraw</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
