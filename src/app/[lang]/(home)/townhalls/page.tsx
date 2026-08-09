import TownHallsArchive from "@/components/TownHallsArchive";
import { townHalls } from "@/lib/townhalls";

export default function Page() {
  return <TownHallsArchive townHalls={townHalls} />;
}
