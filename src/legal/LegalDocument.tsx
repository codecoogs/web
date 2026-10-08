import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useTitle } from "../common/utils";
import { legalDocuments } from "./content";

function LegalDocument() {
	const { slug } = useParams<{ slug: string }>();
	const doc = legalDocuments.find((d) => d.slug === slug);

	useTitle(doc ? doc.title : "Legal");

	if (!doc) {
		return (
			<div className="text-white min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
				<h1 className="text-2xl font-bold">Document not found</h1>
				<p className="text-white/50">
					The legal document you&apos;re looking for doesn&apos;t exist.
				</p>
				<Link to="/legal" className="text-sm text-dark-primary hover:underline">
					Back to Legal
				</Link>
			</div>
		);
	}

	return (
		<div className="text-white min-h-screen">
			<div className="max-w-3xl mx-auto px-4 py-16">
				<Link
					to="/legal"
					className="inline-flex items-center text-sm text-dark-primary hover:underline mb-8"
				>
					&larr; Back to Legal
				</Link>

				<article className="prose-legal">
					<ReactMarkdown
						components={{
							h1: (props) => (
								<h1 className="text-3xl font-bold text-white mb-4" {...props} />
							),
							h2: (props) => (
								<h2
									className="text-xl font-bold text-white mt-8 mb-3"
									{...props}
								/>
							),
							h3: (props) => (
								<h3
									className="text-lg font-semibold text-white/90 mt-6 mb-2"
									{...props}
								/>
							),
							p: (props) => (
								<p className="text-white/70 mb-4 leading-relaxed" {...props} />
							),
							ul: (props) => (
								<ul
									className="list-disc list-inside text-white/70 mb-4 space-y-1"
									{...props}
								/>
							),
							ol: (props) => (
								<ol
									className="list-decimal list-inside text-white/70 mb-4 space-y-1"
									{...props}
								/>
							),
							li: (props) => <li className="text-white/70" {...props} />,
							a: (props) => (
								<a className="text-dark-primary hover:underline" {...props} />
							),
							strong: (props) => (
								<strong className="text-white font-semibold" {...props} />
							),
							blockquote: (props) => (
								<blockquote
									className="border-l-2 border-white/20 pl-4 italic text-white/60 my-4"
									{...props}
								/>
							),
							code: (props) => (
								<code
									className="bg-dark-surface-variant px-1.5 py-0.5 rounded text-sm font-custom text-white/90"
									{...props}
								/>
							),
							hr: () => <hr className="border-white/10 my-8" />,
						}}
					>
						{doc.content}
					</ReactMarkdown>
				</article>

				<div className="mt-12 pt-8 border-t border-white/10 text-sm text-white/50">
					Questions? Contact us at{" "}
					<a
						href="mailto:main@codecoogs.com"
						className="text-dark-primary hover:underline"
					>
						main@codecoogs.com
					</a>
				</div>
			</div>
		</div>
	);
}

export default LegalDocument;
