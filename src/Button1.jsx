const Button1 = ({text, icon, onClick}) => {
    return (
        <>
            <button onClick={onClick} className="bg-[#9B5DE5] rounded-2xl p-2 text-white cursor-pointer px-2 py-1 hover:px-2.5 hover:py-1.5 hover:text-xl hover:bg-purple-600">  {icon}
            <span className="mt-1 text-sm">{text}</span></button>
        </>
    )
}

export default Button1;