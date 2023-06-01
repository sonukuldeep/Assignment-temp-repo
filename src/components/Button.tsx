
const Button = ({ click, children, btn }: { click: () => void, children: React.ReactNode, btn?: string }) => {
    const btnType: Map<string, string> = new Map();
    // defining seperate style for each btn type. btn type is optional and if not provided primiary style i used
    btnType.set('primary', 'bg-blue-400 rounded text-gray-300 my-2 px-4 py-2 hover:bg-gray-300 hover:text-blue-400 transition-all')
    btnType.set('secondary', 'bg-green-500 rounded border border-transparent hover:border-gray-100 text-gray-300 my-2 px-2 py-1 hover:bg-gray-300 hover:text-green-400 transition-all')
    btnType.set('danger', 'bg-red-400 rounded border border-transparent hover:border-gray-100 text-gray-300 my-2 px-2 py-1 hover:bg-gray-300 hover:text-red-400 transition-all')
    return (
        <button onClick={click} className={!btn ? btnType.get('primary') : btnType.get(btn)}>{children}</button>
    )
}

export default Button