import { CONFIG } from "@/config-global";
import FlashCardView from "@/sections/session/flash-card-view";

// ----------------------------------------------------------------------

const metadata = { title: `Blank - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <div>
        <title> {metadata.title}</title>
      </div>

      <div>
        <FlashCardView />
      </div>
    </>
  );
}
