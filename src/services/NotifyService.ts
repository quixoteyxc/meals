import { toast } from "react-toastify";

export class NotifyService {
  static success = (message: string) => {
    toast.success(message);
  };
}
