import Submit from "./Submit";

export const SubmitOutline = ({ onClick, text, isLoading }) => (
    <Submit 
        text={text} 
        onClick={onClick} 
        isLoading={isLoading}
        variant="outline"
    />
);