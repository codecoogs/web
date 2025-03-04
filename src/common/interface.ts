export interface SubmitProps {
	submitProcess: boolean;
	setSubmitProcess: (value: boolean) => void;
}

export interface StripeURL {
	stripeUrl: string;
	setStripeUrl: (value: string) => void;
}
