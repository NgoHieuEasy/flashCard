import { CONFIG } from "@/config-global";
import SessionView from "@/sections/session/session-view";

// ----------------------------------------------------------------------

const metadata = { title: `Blank - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <div>
        <title> {metadata.title}</title>
      </div>

      <div>
        <SessionView />
      </div>
    </>
  );
}
