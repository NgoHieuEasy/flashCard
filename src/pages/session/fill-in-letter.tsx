import { CONFIG } from "@/config-global";
import FillInLetterView from "@/sections/session/fill-in-letter-view";

// ----------------------------------------------------------------------

const metadata = { title: `Blank - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <div>
        <title> {metadata.title}</title>
      </div>

      <div>
        <FillInLetterView />
      </div>
    </>
  );
}
