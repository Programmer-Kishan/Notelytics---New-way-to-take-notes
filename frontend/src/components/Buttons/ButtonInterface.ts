export default interface ButtonProps {
    text: string,
    bgColor: string,
    textColor?: string,
    hoverColor?: string,
    type?: "submit" | "reset" | "button"
}