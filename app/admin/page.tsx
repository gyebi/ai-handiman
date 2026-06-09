import Image from "next/image";
import { FileSearch, LockKeyhole } from "lucide-react";
import { brandAssets } from "@/lib/brand-assets";

const reviewAreas = ["Specialist approvals", "Safety complaints", "Request lifecycle audit"];

export default function AdminPage() {
  return (
    <main className="page-frame">
      <section className="py-6 md:py-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-md bg-alert/10 text-alert">
            <Image src={brandAssets.icon} alt="" width={166} height={164} className="h-10 w-10 object-contain" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Admin workspace</p>
            <h1 className="text-3xl font-semibold text-ink md:text-5xl">Operations console</h1>
          </div>
        </div>

        <p className="max-w-2xl text-base leading-7 text-slate-700">
          Review approvals, request status changes, safety complaints, and sensitive access logs.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <FileSearch aria-hidden="true" className="h-5 w-5 text-service" />
              <h2 className="text-lg font-semibold text-ink">Review areas</h2>
            </div>
            <ul className="space-y-3">
              {reviewAreas.map((area) => (
                <li className="rounded-md bg-slate-100 px-3 py-2 font-medium text-ink" key={area}>
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <LockKeyhole aria-hidden="true" className="h-5 w-5 text-alert" />
              <h2 className="text-lg font-semibold text-ink">Sensitive data policy</h2>
            </div>
            <p className="leading-7 text-slate-700">
              Verification documents, media, precise location, and admin actions stay private by default
              and require explicit role checks.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
