import { CONFIG } from "@/config-global";
import UnitView from "@/sections/unit/unit-view";

// ----------------------------------------------------------------------

const metadata = { title: `Blank - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <div>
        <title> {metadata.title}</title>
      </div>

      <div>
        <UnitView />
      </div>
    </>
  );
}
