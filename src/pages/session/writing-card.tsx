import { CONFIG } from "@/config-global";
import WritingCardView from "@/sections/session/writing-card-view";

// ----------------------------------------------------------------------

const metadata = { title: `Blank - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <div>
        <title> {metadata.title}</title>
      </div>

      <div>
        <WritingCardView />
      </div>
    </>
  );
}
