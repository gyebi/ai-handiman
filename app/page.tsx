import Image from "next/image";
import { CarFront, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { brandAssets } from "@/lib/brand-assets";
import { serviceCategories } from "@/domain/service-categories";

const serviceCategoryLabels: Record<(typeof serviceCategories)[number], string> = {
  towing: "Towing",
  jump_start: "Jump start",
  flat_tire: "Flat tire help",
  vehicle_lockout: "Vehicle lockout",
  fuel_delivery: "Fuel delivery",
  mobile_mechanic_diagnostics: "Mobile mechanic diagnostics",
  minor_roadside_repair: "Minor roadside repair",
};

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

          <form className="request-form" aria-label="Create roadside assistance request">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field-label sm:col-span-2">
                Service type
                <select className="field-control" defaultValue="">
                  <option value="" disabled>
                    Choose roadside help
                  </option>
                  {serviceCategories.map((category) => (
                    <option key={category} value={category}>
                      {serviceCategoryLabels[category]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-label sm:col-span-2">
                Vehicle details
                <input
                  className="field-control"
                  name="vehicleDescription"
                  placeholder="Toyota Corolla, black, GR-1234-24"
                  type="text"
                />
              </label>

              <label className="field-label sm:col-span-2">
                Nearest area or landmark
                <input
                  className="field-control"
                  name="nearestArea"
                  placeholder="East Legon near the tunnel"
                  type="text"
                />
              </label>

              <label className="field-label sm:col-span-2">
                What happened?
                <textarea
                  className="field-control min-h-28 resize-y"
                  name="problemDescription"
                  placeholder="Describe what happened, what you hear or see, and whether the car can move."
                />
              </label>
            </div>

            <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              <MapPin aria-hidden="true" className="mr-2 inline h-4 w-4 text-service" />
              Precise GPS is optional at draft time. Share the nearest area first; exact location is shown only
              to the accepted specialist.
            </div>

            <button className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-road px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-ink sm:w-auto">
              <Wrench aria-hidden="true" className="h-5 w-5" />
              Create request draft
            </button>
          </form>
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
