export interface SubmitProps {
    submitProcess: boolean;
    setSubmitProcess: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StripeURL {
    stripeUrl: string;
    setStripeUrl: React.Dispatch<React.SetStateAction<string>>;
}