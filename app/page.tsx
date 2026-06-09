import Image from "next/image";
import { CarFront, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { brandAssets } from "@/lib/brand-assets";

const requestSteps = [
  "Choose service type",
  "Confirm nearest area",
  "Wait for an approved specialist",
];

export default function CustomerPage() {
  return (
    <main className="page-frame">
      <section className="grid gap-8 py-6 md:grid-cols-[1.1fr_0.9fr] md:items-start md:py-12">
        <div className="space-y-6">
          <div className="brand-logo-panel">
            <Image
              src={brandAssets.splashLogo}
              alt="Handiman Mechanics"
              width={1708}
              height={444}
              priority
              className="brand-logo-image"
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-service/30 bg-white px-3 py-1 text-sm font-medium text-road">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-service" />
            Verified roadside marketplace
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Roadside help, dispatched clearly
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
              Request tire, battery, towing, lockout, fuel, or mechanical help from approved specialists
              in your service area.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-road px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-ink">
              <Wrench aria-hidden="true" className="h-5 w-5" />
              Request assistance
            </button>
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 font-semibold text-ink transition hover:border-service">
              <MapPin aria-hidden="true" className="h-5 w-5 text-service" />
              Set service area
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-md bg-safety/30 text-road">
              <Image src={brandAssets.icon} alt="" width={166} height={164} className="h-10 w-10 object-contain" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Request status</p>
              <p className="text-lg font-semibold text-ink">Ready to create</p>
            </div>
          </div>

          <ol className="mt-5 space-y-4">
            {requestSteps.map((step, index) => (
              <li className="flex gap-3" key={step}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-service text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-0.5 font-medium text-ink">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-5 rounded-md bg-slate-100 p-3 text-sm leading-6 text-slate-700">
            <CarFront aria-hidden="true" className="mr-2 inline h-4 w-4 text-service" />
            Share the nearest area first. Precise location unlocks only for the accepted specialist.
          </p>
        </div>
      </section>
    </main>
  );
}
