import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface TransferDialogProps {
  open: boolean;
  onClose: () => void;
  onTransfer: (recipient: string, amount: number) => void;
}

export const TransferDialog: React.FC<TransferDialogProps> = ({
  open,
  onClose,
  onTransfer,
}) => {
  const [transferAmount, setTransferAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleConfirmTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (!isNaN(amount) && amount > 0 && recipient) {
      // In a real application, you would validate the recipient and initiate the transfer.
      onTransfer(recipient, amount);
      setTransferAmount("");
      setRecipient("");
    } else {
      alert("Please enter a valid amount and recipient.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Transfer Funds</AlertDialogTitle>
        <AlertDialogDescription>
          Enter the recipient's email/phone number and the amount to transfer.
        </AlertDialogDescription>
        <Input
          type="text"
          placeholder="Recipient Email/Phone"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-4"
        />
        <Input
          type="number"
          placeholder="Amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          className="mt-4"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmTransfer}>
            Transfer
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
