export const Input =({name, type, placeholder,label,error, ...props})=>{
    return (
    <div className="flex flex-col ">
        <label htmlFor={name} className="text-red-300 text-sm font-bold  mb-2 md:text-base">{label}</label>
        <input 
        className="p-3 text-red-300 border border-gray-700 rounded-xl focus:border-2"
        name={name} 
        id={name} 
        type={type} 
        placeholder={placeholder}
        {...props}
        />
        <span className="p-2 text-sm text-red-700">{error}</span>
    </div>
    )
}