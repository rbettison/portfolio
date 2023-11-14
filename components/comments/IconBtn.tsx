

export function IconBtn({iconText, isActive = true, color = "", children, onClick, disabled = false} : 
    {iconText: string, isActive?: boolean, color?: string, 
        children?: React.ReactNode, onClick?: () => void,
        disabled?: boolean
    }){
    return (
        <button onClick={onClick} disabled={disabled}>
            <span className={color=="" ? "" : "text-red-500"}>
                {iconText}
            </span>
            {children}
        </button>
    )

}