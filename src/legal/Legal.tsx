import { Link } from "react-router-dom";
import { useTitle } from "../common/utils";
import { legalDocuments } from "./content";

function Legal() {
	useTitle("Legal");

	return (
		<div className="text-white min-h-screen">
			<div className="relative py-16 px-6 text-center overflow-hidden">
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"radial-gradient(ellipse 60% 50% at 50% 0%, rgba(117,228,255,0.07) 0%, transparent 70%)",
					}}
				/>
				<p className="text-xs font-semibold tracking-[0.3em] uppercase text-dark-primary mb-3">
					Legal
				</p>
				<h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
					Legal &amp; Privacy
				</h1>
				<p className="text-white/50 mt-4 text-sm max-w-md mx-auto">
					How CodeCoogs handles your data and our terms of service.
				</p>
			</div>

			<div className="max-w-3xl mx-auto px-4 pb-20 grid gap-4">
				{legalDocuments.map((doc) => (
					<Link
						key={doc.slug}
						to={`/legal/${doc.slug}`}
						className="block p-6 rounded-lg bg-dark-surface-variant ring-1 ring-inset ring-white/10 hover:ring-dark-primary/60 transition-all"
					>
						<h2 className="text-lg font-semibold text-white mb-1">
							{doc.title}
						</h2>
						<p className="text-white/50 text-sm">{doc.description}</p>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Legal;
