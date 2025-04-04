const Button1 = ({text,onClick}) => {
    return (
        <>
            <button onClick={onClick} className="bg-[#9B5DE5] rounded-2xl p-2 text-white cursor-pointer px-6 py-2 hover:px-6.5 hover:py-2.5 hover:text-xl hover:bg-purple-600 w-fit">{text}</button>
        </>
    )
}

export default Button1;