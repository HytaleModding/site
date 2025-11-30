import { useParams } from "next/navigation";
import { getMessages, Messages } from "../locale";

export function useMessages(): Messages {
  const params = useParams();
  return getMessages(params?.lang?.toString());
}
