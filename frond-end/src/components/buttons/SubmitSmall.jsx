import Submit from "./Submit";

export const SubmitSmall = ({ onClick, text, isLoading }) => (
    <Submit 
        text={text} 
        onClick={onClick} 
        isLoading={isLoading}
        size="sm"
        className="w-auto"
    />
);

