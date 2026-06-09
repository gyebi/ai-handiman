import Image from "next/image";
import { ClipboardList, MapPinned, ShieldCheck } from "lucide-react";
import { brandAssets } from "@/lib/brand-assets";

const queueItems = [
  { label: "Matching", value: "Category and service area" },
  { label: "Location", value: "Coarse until accepted" },
  { label: "Access", value: "Approved profiles only" },
];

export default function SpecialistPage() {
  return (
    <main className="page-frame">
      <section className="py-6 md:py-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-md bg-service/15 text-service">
            <Image src={brandAssets.iconLarge} alt="" width={332} height={328} className="h-10 w-10 object-contain" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Specialist workspace</p>
            <h1 className="text-3xl font-semibold text-ink md:text-5xl">Specialist queue</h1>
          </div>
        </div>

        <p className="max-w-2xl text-base leading-7 text-slate-700">
          Approved specialists see open jobs that match their service area and categories.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {queueItems.map((item) => (
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={item.label}>
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-ink">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-service" />
              Approval required
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-ink">
              <MapPinned aria-hidden="true" className="h-4 w-4 text-service" />
              Precise location after acceptance
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-ink">
              <ClipboardList aria-hidden="true" className="h-4 w-4 text-service" />
              Handiman service queue
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
